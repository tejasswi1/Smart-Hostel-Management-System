 import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./index.css";
// //import "leaflet/dist/leaflet.css";

// // Fix Leaflet marker icons
// import L from "leaflet";
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: new URL(
//     "leaflet/dist/images/marker-icon-2x.png",
//     import.meta.url
//   ).href,
//   iconUrl: new URL(
//     "leaflet/dist/images/marker-icon.png",
//     import.meta.url
//   ).href,
//   shadowUrl: new URL(
//     "leaflet/dist/images/marker-shadow.png",
//     import.meta.url
//   ).href,
// });

 createRoot(document.getElementById("root")).render(
  <StrictMode>
   
   <BrowserRouter>
   <AuthProvider>
   <App/>
   </AuthProvider>
  
   </BrowserRouter>
  </StrictMode>
);