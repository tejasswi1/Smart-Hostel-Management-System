import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Students.css";

export default function GuardStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="guard-students-page">
        <div className="students-loading">
          <div className="students-spinner"></div>
          <h3>Loading students...</h3>
          <p>Fetching registered student records.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="guard-students-page">
        <div className="students-error">

          <div className="error-icon">
            ⚠️
          </div>

          <h2>Student Records</h2>

          <p>{error}</p>

          <button
            className="retry-button"
            onClick={fetchStudents}
          >
            ↻ Retry
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="guard-students-page">

      {/* HEADER */}

      <div className="students-header">

        <div>
          <span className="students-label">
            SECURITY PANEL
          </span>

          <h1>👩‍🎓 Student Records</h1>

          <p>
            View registered students and their mess account status.
          </p>
        </div>

        <div className="student-count">

          <div className="count-icon">
            👥
          </div>

          <div>
            <small>Total Students</small>
            <strong>{students.length}</strong>
          </div>

        </div>

      </div>


      {/* INFO */}

      <div className="students-info">

        <div className="students-info-icon">
          🛡️
        </div>

        <div>
          <strong>Student Information</strong>

          <p>
            Use this list to quickly check student identity
            and mess account status.
          </p>
        </div>

      </div>


      {/* TABLE CARD */}

      <div className="students-card">

        <div className="students-card-header">

          <div>
            <h2>Registered Students</h2>

            <p>
              Student accounts available in the hostel system
            </p>
          </div>

          <span className="records-badge">
            {students.length} Records
          </span>

        </div>


        {students.length === 0 ? (

          <div className="students-empty">

            <div className="empty-student-icon">
              👩‍🎓
            </div>

            <h3>No students found</h3>

            <p>
              There are currently no registered students.
            </p>

          </div>

        ) : (

          <div className="students-table-wrapper">

            <table className="students-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Mess Balance</th>
                  <th>Mess Status</th>
                </tr>
              </thead>

              <tbody>

                {students.map((student, index) => (

                  <tr key={student._id}>

                    {/* NUMBER */}

                    <td className="student-index">
                      {index + 1}
                    </td>


                    {/* NAME */}

                    <td>

                      <div className="student-name">

                        <div className="student-avatar">
                          {student.name
                            ?.charAt(0)
                            .toUpperCase() || "?"}
                        </div>

                        <strong>
                          {student.name}
                        </strong>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="student-email">
                      {student.email}
                    </td>


                    {/* BALANCE */}

                    <td>

                      <span className="balance">

                        ₹{student.messBalance || 0}

                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      {student.messPaymentStatus ===
                      "APPROVED" ? (

                        <span className="status-badge approved">
                          ● Approved
                        </span>

                      ) : student.messPaymentStatus ===
                        "PENDING" ? (

                        <span className="status-badge pending">
                          ● Pending
                        </span>

                      ) : student.messPaymentStatus ===
                        "REJECTED" ? (

                        <span className="status-badge rejected">
                          ● Rejected
                        </span>

                      ) : (

                        <span className="status-badge unpaid">
                          ● Not Paid
                        </span>

                      )}

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