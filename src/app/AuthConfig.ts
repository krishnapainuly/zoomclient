import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://zoom.us/oauth',
    clientId: 's9B3oDV1RIGlqxRSwiP4g',
    redirectUri: encodeURIComponent(
      'https://4105-98-156-4-29.ngrok-free.app/zoom'
    ),
    responseType: 'code',
    showDebugInformation: true, // Set to false in production
};
