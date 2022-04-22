package com.cameravisionapp;
import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

import java.util.Collections;
import java.util.List;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;


public class QRCodeFrameProcessorPluginPackage implements ReactPackage {
    @NonNull
    @org.jetbrains.annotations.NotNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull @org.jetbrains.annotations.NotNull ReactApplicationContext reactContext) {
        FrameProcessorPlugin.register(new QRCodeFrameProcessorPlugin());
        return Collections.emptyList();
    }

    @NonNull
    @org.jetbrains.annotations.NotNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull @org.jetbrains.annotations.NotNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}