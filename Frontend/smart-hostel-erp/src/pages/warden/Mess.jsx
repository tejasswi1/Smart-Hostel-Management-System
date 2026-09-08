import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Mess.css";

export default function WardenMess() {
  const [students, setStudents] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/mess/records");
      setStudents(res.data);
    } catch (err) {
      console.error("FETCH RECORDS ERROR:", err);

      alert(
        err.response?.data?.msg ||
          "Failed to load mess records"
      );
    }
  };

  const fetchPending = async () => {
    try {
      const res = await api.get(
        "/mess/pending-payments"
      );

      setPending(res.data);
    } catch (err) {
      console.error(
        "FETCH PENDING ERROR:",
        err
      );
    }
  };

  const loadData = async () => {
    setLoading(true);

    await Promise.all([
      fetchRecords(),
      fetchPending(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const approvePayment = async (studentId) => {
    try {
      const res = await api.put(
        `/mess/payment/approve/${studentId}`
      );

      alert(res.data.msg);

      loadData();
    } catch (err) {
      console.error(
        "APPROVE PAYMENT ERROR:",
        err
      );

      alert(
        err.response?.data?.msg ||
          "Payment approval failed"
      );
    }
  };

  const rejectPayment = async (studentId) => {
    try {
      const res = await api.put(
        `/mess/payment/reject/${studentId}`
      );

      alert(res.data.msg);

      loadData();
    } catch (err) {
      console.error(
        "REJECT PAYMENT ERROR:",
        err
      );

      alert(
        err.response?.data?.msg ||
          "Payment rejection failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="mess-page">
        <div className="mess-loading">
          <div className="mess-spinner"></div>
          <h3>Loading mess records...</h3>
          <p>Fetching student mess information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mess-page">

      {/* ================= HEADER ================= */}

      <div className="mess-header">

        <div>
          <p className="mess-eyebrow">
            WARDEN MANAGEMENT
          </p>

          <h1>🍽️ Mess Management</h1>

          <p>
            Manage student payments and mess
            balances.
          </p>
        </div>

        <div className="mess-summary">
          <div>
            <strong>{students.length}</strong>
            <span>Students</span>
          </div>

          <div className="summary-divider"></div>

          <div>
            <strong>{pending.length}</strong>
            <span>Pending</span>
          </div>
        </div>

      </div>


      {/* ================= PENDING PAYMENTS ================= */}

      <section className="mess-section">

        <div className="section-heading">

          <div>
            <h2>⏳ Pending Payments</h2>

            <p>
              ₹36,000 payment proofs waiting
              for approval.
            </p>
          </div>

          <span className="pending-count">
            {pending.length}
          </span>

        </div>


        {pending.length === 0 ? (

          <div className="mess-empty small-empty">

            <div className="empty-icon">
              ✓
            </div>

            <div>
              <strong>No pending payments</strong>
              <p>
                All payment proofs have been
                processed.
              </p>
            </div>

          </div>

        ) : (

          <div className="pending-grid">

            {pending.map((student) => (

              <div
                key={student._id}
                className="payment-card"
              >

                {/* STUDENT */}

                <div className="payment-student">

                  <div className="payment-avatar">
                    {student.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3>{student.name}</h3>

                    <p>{student.email}</p>
                  </div>

                  <span className="pending-badge">
                    ⏳ Pending
                  </span>

                </div>


                {/* PAYMENT INFO */}

                <div className="payment-info">

                  <div>
                    <small>PAYMENT</small>
                    <strong>
                      ₹{student.messInitialAmount}
                    </strong>
                  </div>

                  <div>
                    <small>STATUS</small>
                    <strong className="orange-text">
                      Awaiting approval
                    </strong>
                  </div>

                </div>


                {/* SCREENSHOT */}
{student.messPaymentScreenshot && (
  <a
    href={student.messPaymentScreenshot}
    target="_blank"
    rel="noreferrer"
    className="screenshot-link"
  >
    📷 View Payment Screenshot
  </a>
)}
                {/* ACTIONS */}

                <div className="payment-actions">

                  <button
                    onClick={() =>
                      approvePayment(
                        student._id
                      )
                    }
                    className="approve-btn"
                  >
                    ✓ Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectPayment(
                        student._id
                      )
                    }
                    className="reject-btn"
                  >
                    ✕ Reject
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ================= ALL RECORDS ================= */}

      <section className="mess-section records-section">

        <div className="section-heading">

          <div>
            <h2>📊 Student Mess Records</h2>

            <p>
              Overview of every student's mess
              account.
            </p>
          </div>

          <span className="records-count">
            {students.length} Records
          </span>

        </div>


        {students.length === 0 ? (

          <div className="mess-empty">

            <div className="empty-icon">
              📊
            </div>

            <h3>No student records found</h3>

            <p>
              Student mess records will appear
              here.
            </p>

          </div>

        ) : (

          <div className="mess-table-wrapper">

            <table className="mess-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Initial</th>
                  <th>Used</th>
                  <th>Remaining</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {students.map((student) => (

                  <tr key={student._id}>

                    <td>

                      <div className="table-student">

                        <div className="table-avatar">
                          {student.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {student.name}
                        </strong>

                      </div>

                    </td>

                    <td className="email-cell">
                      {student.email}
                    </td>

                    <td>
                      ₹{student.messInitialAmount}
                    </td>

                    <td>
                      ₹{student.messUsedAmount}
                    </td>

                    <td>

                      <strong
                        className={
                          student.messBalance > 0
                            ? "balance-positive"
                            : "balance-negative"
                        }
                      >
                        ₹{student.messBalance}
                      </strong>

                    </td>

                    <td>

                      {student.messPaymentStatus ===
                      "APPROVED" ? (

                        <span className="table-status approved">
                          ✓ Approved
                        </span>

                      ) : student.messPaymentStatus ===
                        "PENDING" ? (

                        <span className="table-status pending">
                          ⏳ Pending
                        </span>

                      ) : student.messPaymentStatus ===
                        "REJECTED" ? (

                        <span className="table-status rejected">
                          ✕ Rejected
                        </span>

                      ) : (

                        <span className="table-status unpaid">
                          Not Paid
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );
}