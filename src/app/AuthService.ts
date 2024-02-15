import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './AuthConfig';
import { HttpClient } from '@angular/common/http';
import zoomSdk from "@zoom/appssdk"

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  async configZoomSDK():Promise<any> {
    try {
      console.log('configuring zoom sdk')
      const configResponse = zoomSdk.config({
        popoutSize: {width: 480, height: 360},
        capabilities: [
          "shareApp", "authorize", "onAuthorized", "promptAuthorize",
          "getRunningContext", "getAppContext", 
          "launchAppInMeeting", "getMeetingJoinUrl",
          "getMeetingUUID", "getUserContext", "sendAppInvitation", "expandApp"],

      });
      console.debug('Zoom JS SDK Configuration', configResponse);

      zoomSdk.addEventListener("onAuthorized", function (event){
        console.log("authorized: " + event)

      });
      return configResponse;
    } catch (error) {
      console.error(error);
    }
  }

  openZoomWindow(params: string) {
    zoomSdk.callZoomApi("authorize").then((ret) => {
      console.log(ret)
    })
    .catch((e) => {
      console.error(e);
    })
  }
}
