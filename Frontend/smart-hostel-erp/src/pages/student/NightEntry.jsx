import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";

import {
  Moon,
  MapPin,
  Camera,
  CheckCircle,
  Send,
  Navigation,
  RefreshCw,
} from "lucide-react";

import "./NightEntry.css";

export default function NightEntry() {
  const [reason, setReason] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // ================= LOCATION =================

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("LOCATION:", position.coords);

        setLat(position.coords.latitude);
        setLong(position.coords.longitude);

        setLocationLoading(false);
      },
      (error) => {
        console.error("LOCATION ERROR:", error);

        setLocationLoading(false);

        if (error.code === 1) {
          alert(
            "Location permission denied. Please allow location access."
          );
        } else if (error.code === 2) {
          alert("Unable to determine your location.");
        } else if (error.code === 3) {
          alert("Location request timed out.");
        } else {
          alert("Unable to fetch location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // ================= CAMERA =================

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        alert("Camera is not supported by this browser.");
        return;
      }

      // Stop previous stream if any
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();
      }
    } catch (err) {
      console.error("CAMERA ERROR:", err);

      if (err.name === "NotAllowedError") {
        alert(
          "Camera permission denied. Please allow camera access."
        );
      } else if (err.name === "NotFoundError") {
        alert("No camera found on this device.");
      } else if (err.name === "NotReadableError") {
        alert(
          "Camera is already being used by another application."
        );
      } else if (err.name === "SecurityError") {
        alert(
          "Camera access is blocked. Use HTTPS or localhost."
        );
      } else {
        alert("Unable to access camera.");
      }
    }
  };

  // ================= CAPTURE PHOTO =================

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video) {
      alert("Camera is not available.");
      return;
    }

    if (!video.srcObject || !video.videoWidth) {
      alert("Please open the camera first and wait for the preview.");
      return;
    }

    if (!canvas) {
      alert("Camera capture failed.");
      return;
    }

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          alert("Failed to capture photo.");
          return;
        }

        const file = new File(
          [blob],
          "night-entry-selfie.jpg",
          {
            type: "image/jpeg",
          }
        );

        setPhoto(file);

        // Stop camera
        const stream = video.srcObject;

        if (stream) {
          stream
            .getTracks()
            .forEach((track) => track.stop());
        }

        video.srcObject = null;

        alert("Photo captured successfully.");
      },
      "image/jpeg",
      0.9
    );
  };

  // ================= SUBMIT =================

  const submitNightEntry = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Photo required
    if (!photo) {
      alert("Please capture a selfie first.");
      return;
    }

    // Location required
    if (!lat || !long) {
      alert("Location not fetched. Please try again.");
      getLocation();
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      const formData = new FormData();

      formData.append("reason", reason);
      formData.append("lat", String(lat));
      formData.append("long", String(long));
      formData.append("photo", photo);

      console.log("========== NIGHT ENTRY ==========");
      console.log("Reason:", reason);
      console.log("Latitude:", lat);
      console.log("Longitude:", long);
      console.log("Photo:", photo);
      console.log("Photo name:", photo.name);
      console.log("Photo size:", photo.size);
      console.log("=================================");

      const res = await api.post(
        "/night/submit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "NIGHT ENTRY RESPONSE:",
        res.data
      );

      alert(
        res.data?.msg ||
          "Night entry submitted successfully."
      );

      // Reset form after successful submission
      setReason("");
      setPhoto(null);

    } catch (err) {
      console.error(
        "NIGHT ENTRY SUBMIT ERROR:",
        err
      );

      console.error(
        "SERVER RESPONSE:",
        err.response?.data
      );

      const message =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        err.message ||
        "Failed to submit night entry.";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  // ================= INITIAL LOCATION =================

  useEffect(() => {
    getLocation();

    // Cleanup camera when leaving page
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  // ================= UI =================

  return (
    <div className="night-entry-page">

      <div className="night-entry-container">

        {/* ================= HEADER ================= */}

        <div className="night-entry-header">

          <div className="night-entry-title-icon">
            <Moon size={25} />
          </div>

          <div>
            <p className="night-entry-eyebrow">
              STUDENT SERVICE
            </p>

            <h1>Night Entry</h1>

            <p>
              Submit your night entry with location
              and selfie verification.
            </p>
          </div>

        </div>

        {/* ================= INFO ================= */}

        <div className="night-entry-info">

          <div className="night-entry-info-icon">
            <Navigation size={20} />
          </div>

          <div>
            <strong>
              Location verification enabled
            </strong>

            <span>
              Your current GPS location will be
              verified by the hostel system.
            </span>
          </div>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={submitNightEntry}
          className="night-entry-form"
        >

          {/* ================= REASON ================= */}

          <div className="night-entry-section">

            <div className="night-entry-section-heading">

              <div className="section-number">
                01
              </div>

              <div>
                <h2>Reason</h2>

                <p>
                  Required only when you are outside
                  the hostel premises.
                </p>
              </div>

            </div>

            <textarea
              className="night-entry-input"
              placeholder="Enter reason if you are outside the hostel..."
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              rows="4"
            />

          </div>

          {/* ================= LOCATION ================= */}

          <div className="night-entry-section">

            <div className="night-entry-section-heading">

              <div className="section-number">
                02
              </div>

              <div>
                <h2>Current Location</h2>

                <p>
                  Your browser's current GPS coordinates.
                </p>
              </div>

            </div>

            <div className="location-card">

              <div className="location-row">

                <div className="location-icon">
                  <MapPin size={19} />
                </div>

                <div>
                  <span>Latitude</span>

                  <strong>
                    {lat || "Fetching location..."}
                  </strong>
                </div>

              </div>

              <div className="location-divider" />

              <div className="location-row">

                <div className="location-icon">
                  <MapPin size={19} />
                </div>

                <div>
                  <span>Longitude</span>

                  <strong>
                    {long || "Fetching location..."}
                  </strong>
                </div>

              </div>

            </div>

            {lat && long ? (

              <div className="location-success">

                <CheckCircle size={17} />

                Location fetched successfully

              </div>

            ) : (

              <div className="location-loading">

                <Navigation size={17} />

                {locationLoading
                  ? "Fetching your location..."
                  : "Location unavailable"}

              </div>

            )}

            <button
              type="button"
              onClick={getLocation}
              className="camera-button"
              disabled={locationLoading}
            >
              <RefreshCw size={17} />

              {locationLoading
                ? "Fetching..."
                : "Refresh Location"}

            </button>

          </div>

          {/* ================= CAMERA ================= */}

          <div className="night-entry-section">

            <div className="night-entry-section-heading">

              <div className="section-number">
                03
              </div>

              <div>
                <h2>Selfie Verification</h2>

                <p>
                  Capture a live selfie for verification.
                </p>
              </div>

            </div>

            <div className="camera-box">

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="night-entry-video"
              />

              {!photo && (
                <div className="camera-placeholder">

                  <Camera size={38} />

                  <span>
                    Camera preview will appear here
                  </span>

                </div>
              )}

            </div>

            <div className="camera-actions">

              <button
                type="button"
                onClick={startCamera}
                className="camera-button"
              >
                <Camera size={18} />
                Open Camera
              </button>

              <button
                type="button"
                onClick={capturePhoto}
                className="capture-button"
              >
                <CheckCircle size={18} />
                Capture Selfie
              </button>

            </div>

            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
            />

            {photo && (

              <div className="photo-success">

                <CheckCircle size={18} />

                <span>
                  Selfie captured successfully
                </span>

              </div>

            )}

          </div>

          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            disabled={loading}
            className="night-entry-submit"
          >

            <Send size={18} />

            {loading
              ? "Submitting..."
              : "Submit Night Entry"}

          </button>

        </form>

        {/* ================= FOOTER ================= */}

        <div className="night-entry-footer">

          <Moon size={16} />

          <span>
            Night entry submission is subject to
            hostel verification rules.
          </span>

        </div>

      </div>

    </div>
  );
}