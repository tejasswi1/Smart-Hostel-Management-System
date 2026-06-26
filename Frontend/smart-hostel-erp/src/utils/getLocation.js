// export const getLocation = () => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) return reject("Geolocation not supported");

//     navigator.geolocation.getCurrentPosition(
//       (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
//       (err) => reject(err?.message || "Permission denied"),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   });
// };
