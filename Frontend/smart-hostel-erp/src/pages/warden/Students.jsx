import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Students.css";

export default function WardenStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users/students");

      setStudents(res.data);
      setError("");
    } catch (err) {
      console.error("STUDENT FETCH ERROR:", err);

      setError(
        err.response?.data?.msg ||
          "Failed to load student records"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="students-page">
        <div className="students-loading">
          <div className="loading-spinner"></div>
          <h3>Loading students...</h3>
          <p>Please wait while we fetch student records.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="students-page">
        <div className="error-card">
          <div className="error-icon">⚠️</div>

          <h2>Student Records</h2>

          <p>{error}</p>

          <button
            className="retry-btn"
            onClick={fetchStudents}
          >
            ↻ Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="students-page">

      {/* HEADER */}

      <div className="students-header">
        <div>
          <p className="page-label">WARDEN PANEL</p>

          <h1>
            👩‍🎓 Student Records
          </h1>

          <p className="page-description">
            View student information and mess account details.
          </p>
        </div>

        <div className="student-count-card">
          <span>👥</span>

          <div>
            <small>Total Students</small>
            <strong>{students.length}</strong>
          </div>
        </div>
      </div>

      {/* STUDENT DETAILS */}

      {selectedStudent && (
        <div className="student-details-card">

          <div className="details-header">
            <div className="student-avatar">
              {selectedStudent.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2>{selectedStudent.name}</h2>
              <p>{selectedStudent.email}</p>
            </div>

            <button
              className="close-btn"
              onClick={() => setSelectedStudent(null)}
            >
              ✕
            </button>
          </div>

          <div className="details-grid">

            <div className="detail-item">
              <span>👤 Name</span>
              <strong>{selectedStudent.name}</strong>
            </div>

            <div className="detail-item">
              <span>✉️ Email</span>
              <strong>{selectedStudent.email}</strong>
            </div>

            <div className="detail-item">
              <span>💰 Mess Initial</span>
              <strong>
                ₹{selectedStudent.messInitialAmount || 0}
              </strong>
            </div>

            <div className="detail-item">
              <span>🍽️ Mess Used</span>
              <strong>
                ₹{selectedStudent.messUsedAmount || 0}
              </strong>
            </div>

            <div className="detail-item balance-detail">
              <span>💵 Mess Balance</span>
              <strong>
                ₹{selectedStudent.messBalance || 0}
              </strong>
            </div>

            <div className="detail-item">
              <span>💳 Payment Status</span>

              <PaymentStatus
                status={selectedStudent.messPaymentStatus}
              />
            </div>

          </div>
        </div>
      )}

      {/* TABLE */}

      <div className="students-table-card">

        <div className="table-header">
          <div>
            <h2>All Students</h2>
            <p>
              Complete student and mess information
            </p>
          </div>

          <div className="record-count">
            {students.length} Records
          </div>
        </div>

        {students.length === 0 ? (
          <div className="empty-state">
            <div>👨‍🎓</div>
            <h3>No students found</h3>
            <p>There are currently no registered students.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="students-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Mess Initial</th>
                  <th>Used</th>
                  <th>Balance</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>

                    <td className="index-cell">
                      {index + 1}
                    </td>

                    <td>
                      <div className="student-name-cell">

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
                      ₹{student.messInitialAmount || 0}
                    </td>

                    <td>
                      ₹{student.messUsedAmount || 0}
                    </td>

                    <td>
                      <span
                        className={
                          student.messBalance > 0
                            ? "balance-positive"
                            : "balance-zero"
                        }
                      >
                        ₹{student.messBalance || 0}
                      </span>
                    </td>

                    <td>
                      <PaymentStatus
                        status={student.messPaymentStatus}
                      />
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() =>
                          handleViewStudent(student)
                        }
                      >
                        👁 View
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
}


/* PAYMENT STATUS */

function PaymentStatus({ status }) {
  if (status === "APPROVED") {
    return (
      <span className="status-badge approved">
        ✓ Approved
      </span>
    );
  }

  if (status === "PENDING") {
    return (
      <span className="status-badge pending">
        ⏳ Pending
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className="status-badge rejected">
        ✕ Rejected
      </span>
    );
  }

  return (
    <span className="status-badge unpaid">
      Not Paid
    </span>
  );
}