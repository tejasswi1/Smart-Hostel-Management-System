import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../../api/axios";
import "./ScanQR.css";

export default function ScanQR() {
  const qrRef = useRef(null);
  const scannerStarted = useRef(false);
  const processingRef = useRef(false);

  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Prevent another scanner from being created
    if (scannerStarted.current) {
      return;
    }

    const scanner = new Html5Qrcode("reader");
    qrRef.current = scanner;

    const config = {
      fps: 10,
      qrbox: {
        width: 250,
        height: 250,
      },
    };

    const startScanner = async () => {
      try {
        await scanner.start(
          {
            facingMode: "environment",
          },
          config,
          async (decodedText) => {
            // Don't process multiple detections
            if (processingRef.current) return;

            processingRef.current = true;

            try {
              const res = await api.post("/mess/scan", {
                qrData: decodedText,
              });

              setMessage(res.data.msg);
              setBalance(res.data.balance);

              if (scanner.isScanning) {
                await scanner.stop();
              }

              scannerStarted.current = false;
            } catch (err) {
              console.error(err);

              setMessage(
                err.response?.data?.msg ||
                  "Meal recording failed."
              );

              processingRef.current = false;
            }
          },
          () => {
            // Ignore QR detection errors
          }
        );

        // If React already unmounted this instance,
        // immediately stop it.
        if (cancelled) {
          if (scanner.isScanning) {
            await scanner.stop();
          }

          try {
            scanner.clear();
          } catch (e) {}

          return;
        }

        scannerStarted.current = true;
      } catch (err) {
        if (!cancelled) {
          console.error("QR CAMERA ERROR:", err);

          setMessage(
            "Unable to access camera. Please allow camera permission."
          );
        }
      }
    };

    startScanner();

    return () => {
      cancelled = true;
      scannerStarted.current = false;

      if (scanner.isScanning) {
        scanner
          .stop()
          .then(() => {
            try {
              scanner.clear();
            } catch (e) {}
          })
          .catch(() => {
            try {
              scanner.clear();
            } catch (e) {}
          });
      } else {
        try {
          scanner.clear();
        } catch (e) {}
      }

      qrRef.current = null;
    };
  }, []);

  return (
    <div className="scan-page">

      <div className="scan-container">

        {/* ================= HEADER ================= */}

        <div className="scan-header">

          <div>
            <p className="scan-eyebrow">
              MESS ATTENDANCE
            </p>

            <h1>🍽️ Scan Mess QR</h1>

            <p>
              Scan the QR code at the hostel mess
              after taking your meal.
            </p>
          </div>

          <div className="scan-header-icon">
            📷
          </div>

        </div>

        {/* ================= SCANNER CARD ================= */}

        <div className="scanner-card">

          <div className="scanner-card-header">

            <div className="scanner-icon">
              📱
            </div>

            <div>
              <h2>Scan QR Code</h2>

              <p>
                Point your camera at the mess QR
              </p>
            </div>

          </div>

          <div className="scanner-wrapper">

            <div className="scanner-frame">

              <div
                id="reader"
                className="qr-reader"
              />

            </div>

          </div>

          <div className="scanner-instruction">

            <span>💡</span>

            <p>
              Keep the QR code inside the scanning
              area until it is detected.
            </p>

          </div>

        </div>

        {/* ================= MESSAGE ================= */}

        {message && (
          <div
            className={`scan-message ${
              balance !== null
                ? "scan-success"
                : "scan-error"
            }`}
          >

            <div className="message-icon">
              {balance !== null
                ? "✓"
                : "!"}
            </div>

            <div>
              <strong>
                {balance !== null
                  ? "Meal Recorded"
                  : "Scan Status"}
              </strong>

              <p>
                {message}
              </p>
            </div>

          </div>
        )}

        {/* ================= BALANCE ================= */}

        {balance !== null && (
          <div className="scan-balance-card">

            <div className="balance-icon">
              💰
            </div>

            <div className="balance-content">

              <span>
                REMAINING MESS BALANCE
              </span>

              <h2>
                ₹{balance}
              </h2>

              <p>
                Your meal amount has been deducted
                successfully.
              </p>

            </div>

            <div className="balance-check">
              ✓
            </div>

          </div>
        )}

        {/* ================= INFO ================= */}

        <div className="scan-info">

          <div className="scan-info-icon">
            🔒
          </div>

          <div>
            <strong>
              Secure meal attendance
            </strong>

            <p>
              Each student can record only one meal
              per day.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}