import { JSModules } from './src/ios/js-modules';
import { JSModules as JSModulesAndroid } from './src/android/js-modules';
import RCTDeviceEventEmitter from './Libraries/EventEmitter/RCTDeviceEventEmitter';
export type {
  Platform,
  PlatformSelect,
  PlatformSelectOSType,
} from './Libraries/Utilities/Platform';
import type { Linking } from './Libraries/Linking/Linking';

declare global {
  // eslint-disable-next-line no-var
  var reactNativeBridgeIOS: RCTBridge;
  // eslint-disable-next-line no-var
  var reactNativeBridgeAndroid: com.bridge.Bridge;
  // eslint-disable-next-line no-var
  var jsModulesIOS: JSModules;
  // eslint-disable-next-line no-var
  var jsModulesAndroid: JSModulesAndroid;
}

export const NativeModules: { [name: string]: any };
export const DeviceEventEmitter: RCTDeviceEventEmitter;
export const Linking: Linking;
