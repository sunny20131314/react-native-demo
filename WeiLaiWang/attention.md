## 项目开发需要改的文件


### 地图

#### ios
/XX/ios/XX/Info.plist

你需要在Info.plist中增加 NSLocationWhenInUseUsageDescription 字段来启用定位功能。如果你使用react-native init创建项目，定位会被默认启用。
 `<key>NSLocationWhenInUseUsageDescription</key>`

#### AndroidManifest
/XX/android/app/src/main/AndroidManifest.xml

```
  <!--请求网络信息-->
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <!--用于进行网络定位-->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
  <!--用于访问GPS定位-->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <!--获取运营商信息，用于支持提供运营商信息相关的接口-->
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
  <!--用于访问wifi网络信息，wifi信息会用于进行网络定位-->
  <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
  <!--这个权限用于获取wifi的获取权限，wifi信息会用来进行网络定位-->
  <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
  <!--用于访问网络，网络定位需要上网-->
  <uses-permission android:name="android.permission.INTERNET"/>
  <!--用于读取手机当前的状态-->
  <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
  <!--写入扩展存储，向扩展卡写入数据，用于写入缓存定位数据-->
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

<!--貌似是关于地图的-->
    <!--<application-->
    <!--android:allowBackup="true"-->
    <!--android:label="@string/app_name"-->
    <!--android:icon="@mipmap/ic_launcher"-->
    <!--android:theme="@style/AppTheme">-->
    <!--<service android:name="com.amap.api.location.APSService"></service>-->
    <!--<meta-data-->
    <!--android:name="com.amap.api.v2.apikey"-->
    <!--android:value="Your api key here"/>-->

<!-- 输入框的选择: 在下面的位置加入: android:windowSoftInputMode="adjustPan" 输入框-->
    <activity
      android:name=".MainActivity"
      android:label="@string/app_name"
      android:windowSoftInputMode="adjustPan"
      android:configChanges="keyboard|keyboardHidden|orientation|screenSize">
      <intent-filter>
          <action android:name="android.intent.action.MAIN" />
          <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>

```

### 版本发布(具体看官网的生成已签名的APK和修改配置文件!)


