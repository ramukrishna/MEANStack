import { Injectable } from '@angular/core';
import { Geolocation } from '../interfaces/userinterface';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  getCurrentLocation(): Promise<Geolocation> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: undefined
            });
          },
          (error) => {
            let errorMsg = '';
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMsg = 'User denied the request for Geolocation.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMsg = 'Location information is unavailable.';
                break;
              case error.TIMEOUT:
                errorMsg = 'The request to get user location timed out.';
                break;
              default:
                errorMsg = 'An unknown error occurred.';
                break;
            }
            reject({
              latitude: undefined,
              longitude: undefined,
              error: errorMsg
            });
          }
        );
      } else {
        reject({
          latitude: undefined,
          longitude: undefined,
          error: 'Geolocation is not supported by this browser.'
        });
      }
    });
  }

}
