export const LINK_ICON_EXTERNAL = 'http://34.101.85.12:8080/uploads/icon/';
export const LINK_ICON_POLDA = 'http://34.101.85.12:8080/uploads/polda/logo/';
export const LINK_ICON_STAKEHOLDER =
  'http://34.101.85.12:8080/uploads/stakeholder/';
export const Haversine = ({lat1, lon1, lat2, lon2}) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = (R * c) / 1000; // in metres
  return d;
};
