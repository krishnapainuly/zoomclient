import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  constructor(private route: ActivatedRoute, private service: AuthService) {
    this.route.queryParams.subscribe(
      (queryParams) => {
        const authorizationCode = queryParams['code'];
        if (authorizationCode != null && authorizationCode != undefined) {
          console.log(authorizationCode);
          //this.handleZoomCallback(window.location.href);
        } else {
          console.log('no authorization code');
        }
      }
    );
  }

  ngOnInit(): void {
    console.log('init');
    this.service.configZoomSDK();
  }

  authorize() {
    let redirect_uri = 'https://4105-98-156-4-29.ngrok-free.app/zoom';
    let clientId = 's9B3oDV1RIGlqxRSwiP4g';
    let authorizationUrl = 'https://zoom.us/oauth/authorize';
    const encodeURI = encodeURIComponent(redirect_uri);
    const params = `response_type=code&client_id=${clientId}&redirect_uri=${encodeURI}`;
    const isZoomClient = this.isRequestFromZoomClient();
    if (isZoomClient) {
        return this.openZoomlogin(params);
    } else {
        const authorizationUrl1 = `${authorizationUrl}?${params}`;
        window.open(authorizationUrl1, '_blank');
        return Promise.resolve(true); // Assume success for web browsers
    }
  }

  private isRequestFromZoomClient(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('zoom');  // TODO: may not be reliable 
  }

  private openZoomlogin( params: string) {
    this.service.openZoomWindow(params);
  }
  // private openAuthorizationInZoomClient(params: string): Promise<boolean> {
  //   // const deepLink = `zoomus://zoom.us/oauth/authorize?${params}`;
  //   // const iframe = document.createElement('iframe');
  //   // iframe.src = deepLink;
  //   // iframe.style.display = 'none';
  //   // document.body.appendChild(iframe);
  //   // return this.waitForDeepLink();
  // }

  // private waitForDeepLink(): Promise<boolean> {
  //   return new Promise<boolean>((resolve) => {
  //       const timeout = setTimeout(() => {
  //           window.removeEventListener('pagehide', onPageHide);
  //           resolve(false);
  //       }, 5000);

  //       const onPageHide = () => {
  //           clearTimeout(timeout);
  //           window.removeEventListener('pagehide', onPageHide);
  //           resolve(true); // Deep link handled
  //       };
  //       window.addEventListener('pagehide', onPageHide);
  //   });
  // }
}
