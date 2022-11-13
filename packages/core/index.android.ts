import RCTDeviceEventEmitter from './Libraries/EventEmitter/RCTDeviceEventEmitter';
import { getCurrentBridge } from './src/android/bridge';
export { default as NativeEventEmitter } from './Libraries/EventEmitter/NativeEventEmitter';
export { Platform } from './Libraries/Utilities/Platform';
import * as _TurboModuleRegistry from './Libraries/TurboModule/TurboModuleRegistry';
export type { TurboModule } from './Libraries/TurboModule/RCTExport';
export { NativeModules } from './src/android/nativemodules';
export { AppRegistry } from './Libraries/ReactNative/AppRegistry';
export { Linking } from './Libraries/Linking/Linking';
export const DeviceEventEmitter = RCTDeviceEventEmitter;
/**
 * Loads all modules eagerly in a specific ReactPackage.
 *
 * @platform android
 */
export const loadModulesForPackage = (name: string) => {
  getCurrentBridge()?.loadModulesForPackage(name);
};
export const TurboModuleRegistry = _TurboModuleRegistry;
