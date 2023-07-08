
export interface ViewManagers {
  "ModuleTestView":{
      color: string

  viewEventNames: ""
  }
"RNCWebView":{
      source: any
newSource: any
injectedJavaScript: string
injectedJavaScriptBeforeContentLoaded: string
injectedJavaScriptForMainFrameOnly: boolean
injectedJavaScriptBeforeContentLoadedForMainFrameOnly: boolean
javaScriptEnabled: boolean
javaScriptCanOpenWindowsAutomatically: boolean
allowFileAccessFromFileURLs: boolean
allowUniversalAccessFromFileURLs: boolean
allowsInlineMediaPlayback: boolean
webviewDebuggingEnabled: boolean
allowsAirPlayForMediaPlayback: boolean
mediaPlaybackRequiresUserAction: boolean
dataDetectorTypes: any
contentInset: any
automaticallyAdjustContentInsets: boolean
autoManageStatusBarEnabled: boolean
hideKeyboardAccessoryView: boolean
allowsBackForwardNavigationGestures: boolean
incognito: boolean
pagingEnabled: boolean
applicationNameForUserAgent: string
cacheEnabled: boolean
allowsLinkPreview: boolean
allowingReadAccessToURL: string
basicAuthCredential: any
contentInsetAdjustmentBehavior: any
automaticallyAdjustsScrollIndicatorInsets: boolean
contentMode: any
limitsNavigationsToAppBoundDomains: boolean
textInteractionEnabled: boolean
mediaCapturePermissionGrantType: any
messagingEnabled: boolean
enableApplePay: boolean
menuItems: any[]
hasOnFileDownload: boolean
pullToRefreshEnabled: boolean
bounces: boolean
useSharedProcessPool: boolean
userAgent: string
scrollEnabled: boolean
sharedCookiesEnabled: boolean
decelerationRate: number
directionalLockEnabled: boolean
showsHorizontalScrollIndicator: boolean
showsVerticalScrollIndicator: boolean
keyboardDisplayRequiresUserAction: boolean

  viewEventNames: "fileDownload" | "loadingStart" | "loadingFinish" | "loadingError" | "loadingProgress" | "httpError" | "shouldStartLoadWithRequest" | "contentProcessDidTerminate" | "message" | "scroll" | "customMenuSelection"
  }
}