import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import "./Mess.css";

export default function StudentMess() {
  const [mess, setMess] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // =========================
  // LOAD MESS DETAILS
  // =========================

  const loadMess = async () => {
    try {
      const res = await api.get("/mess/my");
      setMess(res.data);
    } catch (err) {
      console.error("MESS LOAD ERROR:", err);

      alert(
        err.response?.data?.msg ||
          "Failed to load mess details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMess();
  }, []);

  // =========================
  // UPLOAD ₹36,000 PAYMENT
  // =========================

  const uploadPayment = async () => {
    if (!file) {
      alert("Please select payment screenshot");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("screenshot", file);

      const res = await api.post(
        "/mess/payment/upload",
        formData
      );

      alert(res.data.msg);

      setFile(null);

      await loadMess();
    } catch (err) {
      console.error("PAYMENT UPLOAD ERROR:", err);

      alert(
        err.response?.data?.msg ||
          "Payment upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="mess-page">
        <div className="mess-loading">
          <div className="mess-spinner"></div>
          <p>Loading mess details...</p>
        </div>
      </div>
    );
  }

  if (!mess) {
    return (
      <div className="mess-page">
        <div className="mess-error">
          <span>⚠️</span>
          <p>Unable to load mess details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mess-page">
      <div className="mess-container">

        {/* ================= HEADER ================= */}

        <div className="mess-header">
          <div>
            <p className="mess-eyebrow">
              HOSTEL SERVICES
            </p>

            <h1>🍽️ Mess Account</h1>

            <p>
              Manage your mess payment, balance and meal history.
            </p>
          </div>

          <div className="mess-header-icon">
            🍽️
          </div>
        </div>

        {/* ================= PAYMENT CARD ================= */}

        <div className="mess-payment-card">

          <div className="mess-card-header">
            <div>
              <span className="mess-card-label">
                PAYMENT
              </span>

              <h2>💳 Mess Payment</h2>
            </div>

            <span
              className={`payment-status status-${mess.paymentStatus.toLowerCase()}`}
            >
              {mess.paymentStatus === "NONE" && "Not Paid"}
              {mess.paymentStatus === "PENDING" && "Pending"}
              {mess.paymentStatus === "APPROVED" && "Approved"}
              {mess.paymentStatus === "REJECTED" && "Rejected"}
            </span>
          </div>

          {/* NONE / REJECTED */}

          {(mess.paymentStatus === "NONE" ||
            mess.paymentStatus === "REJECTED") && (
            <div className="payment-upload-area">

              <div className="payment-amount">
                <span>Initial Mess Amount</span>
                <strong>₹36,000</strong>
              </div>

              {mess.paymentStatus === "REJECTED" && (
                <div className="rejected-message">
                  <span>❌</span>

                  <div>
                    <strong>Payment rejected</strong>

                    <p>
                      Your previous payment proof was rejected.
                      Please upload a new screenshot.
                    </p>
                  </div>
                </div>
              )}

              <label className="file-upload-box">

                <div className="upload-icon">
                  📷
                </div>

                <div>
                  <strong>
                    {file
                      ? file.name
                      : "Upload payment screenshot"}
                  </strong>

                  <span>
                    {file
                      ? "Screenshot selected"
                      : "PNG, JPG or JPEG"}
                  </span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                />

              </label>

              <button
                onClick={uploadPayment}
                disabled={uploading}
                className="upload-payment-button"
              >
                {uploading
                  ? "Uploading..."
                  : "Upload ₹36,000 Payment Proof"}
              </button>

            </div>
          )}

          {/* PENDING */}

          {mess.paymentStatus === "PENDING" && (
            <div className="payment-message pending-message">

              <div className="message-icon">
                ⏳
              </div>

              <div>
                <strong>Payment under review</strong>

                <p>
                  Your ₹36,000 payment proof is waiting
                  for warden approval.
                </p>
              </div>

            </div>
          )}

          {/* APPROVED */}

          {mess.paymentStatus === "APPROVED" && (
            <div className="payment-message approved-message">

              <div className="message-icon">
                ✓
              </div>

              <div>
                <strong>Payment approved</strong>

                <p>
                  Your ₹36,000 mess payment has been approved.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* ================= WALLET ================= */}

        {mess.paymentStatus === "APPROVED" && (
          <>
            <div className="mess-section-title">
              <div>
                <p>YOUR WALLET</p>
                <h2>Mess Balance</h2>
              </div>
            </div>

            <div className="balance-card">

              <div className="balance-main">
                <span>Remaining Balance</span>

                <h2>
                  ₹{mess.balance}
                </h2>

                <p>
                  Available for your meals
                </p>
              </div>

              <div className="balance-stats">

                <div className="balance-stat">
                  <span>Initial Amount</span>
                  <strong>
                    ₹{mess.initialAmount}
                  </strong>
                </div>

                <div className="balance-stat">
                  <span>Total Used</span>
                  <strong>
                    ₹{mess.usedAmount}
                  </strong>
                </div>

                <div className="balance-stat">
                  <span>Meals This Month</span>
                  <strong>
                    {mess.mealsThisMonth}
                  </strong>
                </div>

              </div>

            </div>

            {/* ================= QR SCANNER ================= */}

            <Link
              to="/student/scan"
              className="scan-meal-link"
            >
              <div className="scan-meal-card">

                <div className="scan-icon">
                  📷
                </div>

                <div>
                  <strong>
                    Scan Mess QR
                  </strong>

                  <p>
                    Scan today's QR code to record your meal
                  </p>
                </div>

                <span className="scan-arrow">
                  →
                </span>

              </div>
            </Link>

            {/* ================= HISTORY ================= */}

            <div className="history-header">
              <div>
                <p>TRANSACTIONS</p>
                <h2>🍽️ Meal History</h2>
              </div>

              <span>
                {mess.mealsThisMonth} meals
              </span>
            </div>

            {mess.transactions.length === 0 ? (
              <div className="empty-history">
                <div>🍽️</div>

                <h3>No meals recorded</h3>

                <p>
                  Your meal transactions will appear here.
                </p>
              </div>
            ) : (
              <div className="history-table-wrapper">

                <table className="history-table">

                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Meal</th>
                      <th>Amount</th>
                      <th>Balance After</th>
                    </tr>
                  </thead>

                  <tbody>
                    {mess.transactions.map((t) => (
                      <tr key={t._id}>

                        <td>
                          <span className="date-value">
                            {t.mealDate}
                          </span>
                        </td>

                        <td>
                          <span className="meal-name">
                            🍽️ Meal
                          </span>
                        </td>

                        <td>
                          <span className="amount-value">
                            -₹{t.amount}
                          </span>
                        </td>

                        <td>
                          <span className="balance-value">
                            ₹{t.balanceAfter}
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}