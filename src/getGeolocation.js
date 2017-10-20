// Function returns nil if geolocation services not available in user's
// browser. Else returns a coords object.

function getGeolocation() {
  if (!navigator.geolocation) {
    return nil;
  }
  function success(pos) {
    const coords = {
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude
    };
    return coords;
  }
  function error() {
    return nil;
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

export { getGeolocation };
// Use by import { getGeolocation } from 'getGeolocation.js'