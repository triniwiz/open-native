import RCTDeviceEventEmitter from './core/EventEmitter/RCTDeviceEventEmitter';
export { default as NativeEventEmitter } from './core/EventEmitter/NativeEventEmitter';
export {
  Platform,
  PlatformSelect,
  PlatformSelectOSType,
} from './core/Utilities/Platform';
export { NativeModules } from './src/ios/nativemodules';
export { Linking } from './core/Libraries/Linking/Linking';

export const DeviceEventEmitter = RCTDeviceEventEmitter;