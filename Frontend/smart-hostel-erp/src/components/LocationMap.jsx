// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix default icon issue in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
// });

// export default function LocationMap({ lat, long }) {
//   const latNum = Number(lat);
//   const longNum = Number(long);
//   if (!latNum || !longNum) return null;

//   return (
//     <MapContainer
//       center={[latNum, longNum]}
//       zoom={15}
//       style={{ height: "300px", width: "100%", borderRadius: "12px", marginTop: "8px" }}
//       scrollWheelZoom={false}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={[latNum, longNum]}>
//         <Popup>Student Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// }

