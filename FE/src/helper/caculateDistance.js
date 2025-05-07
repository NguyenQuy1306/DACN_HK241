function calculateDistance(userCoords, lat, lon) {
  const userLat = userCoords.latitude;
  const userLng = userCoords.longitude;
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Bán kính Trái Đất theo km
  const dLat = toRad(lat - userLat);
  const dLon = toRad(lon - userLng);

  const lat1 = toRad(userLat);
  const lat2 = toRad(lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2); // km
}

module.exports = { calculateDistance };
