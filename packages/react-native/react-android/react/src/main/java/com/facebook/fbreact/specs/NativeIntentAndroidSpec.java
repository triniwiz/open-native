package com.facebook.fbreact.specs;

import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactModuleWithSpec;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

public abstract class NativeIntentAndroidSpec extends ReactContextBaseJavaModule implements ReactModuleWithSpec, TurboModule {
    public NativeIntentAndroidSpec(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    @DoNotStrip
    public abstract void getInitialURL(Promise promise);

    @ReactMethod
    @DoNotStrip
    public abstract void canOpenURL(String url, Promise promise);

    @ReactMethod
    @DoNotStrip
    public abstract void openURL(String url, Promise promise);

    @ReactMethod
    @DoNotStrip
    public abstract void openSettings(Promise promise);

    @ReactMethod
    @DoNotStrip
    public abstract void sendIntent(String action, ReadableArray extras, Promise promise);
}
