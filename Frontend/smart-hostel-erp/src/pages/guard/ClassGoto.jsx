import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./ClassGoto.css";

export default function GuardClassGoto() {
  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    try {
      const res = await api.get("/class-goto/records");

      // ALL records
      setEntries(res.data);
    } catch (err) {
      alert("Failed to load class goto entries");
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  // ONLY students who have not returned
  const activeEntries = entries.filter((e) => !e.inTime);

  return (
    <div className="guard-goto-page">

      {/* HEADER */}

      <div className="guard-goto-header">

        <div>
          <span className="guard-goto-label">
            SECURITY MONITOR
          </span>

          <h1>🚶 Class Go / Return</h1>

          <p>
            Monitor all student class movement and return records.
          </p>
        </div>

        <div className="outside-count">
          <span>🚨</span>

          <div>
            <small>Currently Outside</small>
            <strong>{activeEntries.length}</strong>
          </div>
        </div>

      </div>


      {/* STATUS BANNER */}

      <div className="goto-status">

        <div className="goto-status-icon">
          🛡️
        </div>

        <div>
          <strong>Movement Monitor</strong>

          <p>
            View all students who have gone out, including
            their return status.
          </p>
        </div>

      </div>


      {/* CONTENT */}

      <div className="goto-card">

        <div className="goto-card-header">

          <div>
            <h2>All Class Go / Return Records</h2>

            <p>
              Complete history of student movement entries
            </p>
          </div>

          <span className="active-badge">
            ● {activeEntries.length} Outside
          </span>

        </div>


        {entries.length === 0 ? (

          <div className="goto-empty">

            <div className="goto-empty-icon">
              ✅
            </div>

            <h3>No class goto records</h3>

            <p>
              No student movement records are available.
            </p>

          </div>

        ) : (

          <div className="goto-table-wrapper">

            <table className="goto-table">

              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Out Time</th>
                  <th>Return Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {entries.map((e, index) => (

                  <tr key={e._id}>

                    <td className="goto-index">
                      {index + 1}
                    </td>


                    {/* STUDENT */}

                    <td>

                      <div className="goto-student">

                        <div className="goto-avatar">
                          {e.student?.name
                            ?.charAt(0)
                            .toUpperCase() || "?"}
                        </div>

                        <strong>
                          {e.student?.name || "Unknown"}
                        </strong>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td className="goto-email">
                      {e.student?.email || "-"}
                    </td>


                    {/* DATE */}

                    <td>
                      {e.date}
                    </td>


                    {/* OUT TIME */}

                    <td>

                      <div className="goto-time">

                        <span className="time-icon">
                          🕐
                        </span>

                        {e.outTime
                          ? new Date(
                              e.outTime
                            ).toLocaleTimeString()
                          : "-"}

                      </div>

                    </td>


                    {/* RETURN TIME */}

                    <td>

                      <div className="goto-time">

                        <span className="time-icon">
                          🕐
                        </span>

                        {e.inTime
                          ? new Date(
                              e.inTime
                            ).toLocaleTimeString()
                          : "-"}

                      </div>

                    </td>


                    {/* STATUS */}

                    <td>

                      {e.inTime ? (

                        <span className="out-badge returned">
                          ● RETURNED
                        </span>

                      ) : (

                        <span className="out-badge">
                          ● OUT
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