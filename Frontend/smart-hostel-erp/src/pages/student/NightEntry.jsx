//  import { useState } from "react";
//  import axios from "../../api/axios";
// import { postNightEntry } from "../../api/night.api";
// import { getLocation } from "../../utils/getLocation.js";
// import { requestCameraPermission } from "../../utils/useCamera.js";

 //export default function NightEntry() {
 // const [reason, setReason] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [location, setLocation] = useState(null);

//   const handleGetLocation = async () => {
//     try {
//       const loc = await getLocation();
//       setLocation(loc);
//       alert("Location fetched!");
//     } catch (err) {
//       alert("Error fetching location: " + err);
//     }
//   };

//   const handlePhotoPermission = async () => {
//     const allowed = await requestCameraPermission();
//     if (!allowed) alert("Camera permission denied");
//   };

//   const handleSubmit = async () => {
//     if (!reason || !photo || !location) return alert("All fields are required");

//     const fd = new FormData();
//     fd.append("reason", reason);
//     fd.append("photo", photo);
//     fd.append("lat", location.lat);
//     fd.append("lng", location.lng);

//     await postNightEntry(fd);
//     alert("Night entry submitted");
//     setReason(""); setPhoto(null); setLocation(null);
//   };

//   return (
//     <div className="p-6 space-y-4 max-w-md bg-white rounded shadow">
//       <h2 className="text-xl font-bold">🌙 Night Entry</h2>

//       <input
//         type="text"
//         placeholder="Reason"
//         className="w-full border p-2 rounded"
//         value={reason}
//         onChange={e => setReason(e.target.value)}
//       />

//       <input
//         type="file"
//         accept="image/*"
//         capture="environment"
//         onChange={e => setPhoto(e.target.files[0])}
//       />

//       <button
//         onClick={handleGetLocation}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Get Location
//       </button>

//       <button
//         onClick={handleSubmit}
//         className="bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Submit
//       </button>
//     </div>
//  );
// }
import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";



export default function NightEntry() {
  const [reason, setReason] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
const canvasRef = useRef(null);

 const submitNightEntry = async (e) => {
  e.preventDefault();
if (!photo) {
  alert("Please capture a selfie");
  return;
}

if (!lat || !long) {
  alert("Location not fetched");
  return;
}
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("reason", reason);
    formData.append("lat", lat);
    formData.append("long", long);

    if (photo) {
      formData.append("photo", photo);
    }

    const res = await api.post(
      "/night/submit",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);
    alert("Night entry submitted successfully");
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
  } catch (err) {
    alert("Camera access denied");
    console.error(err);
  }
};
const capturePhoto = () => {
  const canvas = canvasRef.current;
  const video = videoRef.current;
  

  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);

  canvas.toBlob((blob) => {
    const file = new File(
      [blob],
      "night-entry-selfie.jpg",
      { type: "image/jpeg" }
    );

    setPhoto(file);
    const stream = video.srcObject;
    

if (stream) {
  stream.getTracks().forEach(track => track.stop());
}
    alert("Photo captured");
  }, "image/jpeg");
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    },
    (error) => {
      console.error(error);
      alert("Location permission required");
    }
  );
};
useEffect(() => {
  getLocation();
}, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Night Entry</h2>

      <form onSubmit={submitNightEntry}>
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
<p>Latitude: {lat || "Fetching..."}</p>
<p>Longitude: {long || "Fetching..."}</p>
        

        
<button
  type="button"
  onClick={startCamera}
>
  Open Camera
</button>

<br /><br />

<video
  ref={videoRef}
  autoPlay
  playsInline
  width="300"
/>

<br /><br />

<button
  type="button"
  onClick={capturePhoto}
>
  Capture Selfie
</button>

<canvas
  ref={canvasRef}
  style={{ display: "none" }}
/>
{photo && (
  <p style={{ color: "green" }}>
    ✅ Selfie Captured Successfully
  </p>
)}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}