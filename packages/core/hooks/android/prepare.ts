/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE-react-native-community-cli file in the root of this package.
 */
import * as path from 'path';
import { readFile } from './common';
import { getPackageAutolinkInfo } from './getters/autolink-info';
import { writeSettingsGradleFile } from './writers/settings-gradle';
import { writeModulesJsonFile } from './writers/modules-json';
import { writePackagesJavaFile } from './writers/packages-java';
import { writeIncludeGradleFile } from './writers/include-gradle';
import { writeModuleMapFile } from './writers/modulemap';
import { writeViewManagerTypes } from './writers/write-view-manager-types';
import { writeNamespaceGradleFile } from './writers/write-namespace-gradle';
export type AutolinkAndroidParams = {
  packageDir: string;
  dependencies: string[];
  projectDir: string;
  outputModulesJsonPath: string;
  outputModuleMapPath: string;
  outputPackagesJavaPath: string;
  outputIncludeGradlePath: string;
  outputViewManagerTypesPath: string;
};

/**
 * Given a list of dependencies, autolinks any podspecs found within them, using
 * the React Native Community CLI search rules.
 * @param {object} args
 * @param args.dependencies The names of the npm dependencies to examine for
 *   autolinking.
 * @param args.projectDir The project directory (relative to which the package
 *   should be resolved).
 * @param args.outputModulesJsonPath An absolute path to output the modules.json
 *   to.
 * @param args.outputModuleMapPath An absolute path to output the modulemap.json
 *   to.
 * @param args.outputPackagesJavaPath An absolute path to output the
 *   Packages.java to.
 * @returns a list of package names in which podspecs were found and autolinked.
 */
export async function autolinkAndroid({
  packageDir,
  dependencies,
  projectDir,
  outputModulesJsonPath,
  outputModuleMapPath,
  outputPackagesJavaPath,
  outputIncludeGradlePath,
  outputViewManagerTypesPath,
}: AutolinkAndroidParams) {
  const packageJson = JSON.parse(
    await readFile(path.join(packageDir, '/package.json'), {
      encoding: 'utf8',
    })
  );
  const autolinkingInfo = (
    await Promise.all(
      dependencies.map((npmPackageName) =>
        getPackageAutolinkInfo({
          npmPackageName,
          projectDir,
          ownPackageName: packageJson.name,
        })
      )
    )
  )
    .filter((p) => !!p)
    .flat(1)
    .map(
      ({
        androidProjectName,
        modules,
        npmPackageName,
        packageImportPath,
        packageInstance,
        sourceDir,
        hasNamespace,
        buildGradlePath,
        androidPackageName
      }) => ({
        absolutePath: sourceDir,
        androidProjectName,
        modules,
        packageImportPath,
        packageInstance,
        packageName: npmPackageName,
        hasNamespace,
        buildGradlePath,
        androidPackageName
      })
    );

  await Promise.all([
    await writeSettingsGradleFile(projectDir),
    await writeModulesJsonFile({
      modules: autolinkingInfo.map(
        ({ packageName, absolutePath, androidProjectName }) => ({
          packageName,
          absolutePath,
          androidProjectName,
        })
      ),
      outputModulesJsonPath,
    }),

    await writePackagesJavaFile({
      packages: autolinkingInfo,
      outputPackagesJavaPath,
    }),
    await writeViewManagerTypes({
      modules: autolinkingInfo.reduce((acc, { modules }) => {
        modules.forEach(
          ({
            exportedMethods,
            exportedModuleName,
            exportsConstants,
            moduleImportNameJs,
            isReactViewManager,
          }) => {
            acc[exportedModuleName] = {
              e: exportsConstants,
              j: moduleImportNameJs,
              v: isReactViewManager,
              m: exportedMethods.reduce(
                (
                  innerAcc,
                  {
                    exportedMethodName,
                    isBlockingSynchronousMethod,
                    methodNameJs,
                    methodTypesParsed,
                    prop,
                    nativeDefinition,
                  }
                ) => {
                  innerAcc[exportedMethodName] = {
                    b: isBlockingSynchronousMethod,
                    j: methodNameJs,
                    t: methodTypesParsed,
                    p: prop,
                    nd: nativeDefinition,
                  };
                  return innerAcc;
                },
                {}
              ),
            };
          }
        );

        return acc;
      }, {}),
      outputViewManagerTypesPath: outputViewManagerTypesPath,
    }),
    await writeIncludeGradleFile({
      projectNames: autolinkingInfo.map(
        ({ androidProjectName }) => androidProjectName
      ),
      outputIncludeGradlePath,
    }),
    //     await writeModuleMapFile({
    //       // The autolinking info is essentially an array where each member
    //       // describes a package. Each package can have several modules, so we
    //       // reduce all the modules across all the packages into a single module
    //       // map.
    //       moduleMap: autolinkingInfo.reduce((acc, { modules }) => {
    //         modules.forEach(
    //           ({
    //             exportedMethods,
    //             exportedModuleName,
    //             exportsConstants,
    //             moduleImportNameJs,
    //             isReactViewManager,
    //           }) => {
    //             acc[exportedModuleName] = {
    //               e: exportsConstants,
    //               j: moduleImportNameJs,
    //               v: isReactViewManager,
    //               m: exportedMethods.reduce(
    //                 (
    //                   innerAcc,
    //                   {
    //                     exportedMethodName,
    //                     isBlockingSynchronousMethod,
    //                     methodNameJs,
    //                     methodTypesParsed,
    //                     prop,
    //                     defaultValue
    //                   }
    //                 ) => {
    //                   innerAcc[exportedMethodName] = {
    //                     b: isBlockingSynchronousMethod,
    //                     j: methodNameJs,
    //                     t: methodTypesParsed,
    //                     p: prop,
    //                     d: defaultValue
    //                   };
    //                   return innerAcc;
    //                 },
    //                 {}
    //               ),
    //             };
    //           }
    //         );
    //         return acc;
    //       }, {}),
    //       outputModuleMapPath,
    //     }),

    await Promise.all(
      autolinkingInfo.map(
        ({ buildGradlePath, androidPackageName, hasNamespace }) => {
          if (!hasNamespace) {
            return writeNamespaceGradleFile(
              buildGradlePath,
              androidPackageName
            );
          }
          return Promise.resolve();
        }
      )
    ),
  ]);

  return autolinkingInfo.map(({ packageName }) => packageName);
}
