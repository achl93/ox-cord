// Function returns nil if geolocation services not available in user's
// browser. Else returns a coords object.

function setLocation(pos) {
  this.props.getGeo({
    longitude: pos.coords.longitude,
    latitude: pos.coords.latitude
  });
  console.log(pos);
}

function getGeolocation() {
  if (!navigator.geolocation) {
    return null;
  } else {
    navigator.geolocation.getCurrentPosition(this.setLocation.bind(this));
  }
}

export { getGeolocation };
// Use by import { getGeolocation } from 'getGeolocation.js'