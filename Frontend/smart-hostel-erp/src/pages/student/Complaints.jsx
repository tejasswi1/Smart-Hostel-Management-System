import { useEffect, useState } from "react";
import { submitComplaint } from "../../api/complaint.api";
import api from "../../api/axios";
import "./Complaints.css";

export default function StudentComplaints() {
  const [complaints, setComplaints] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const fetchMyComplaints = async () => {
    try {
      const res = await api.get("/complaints/my");
      setComplaints(res.data);
    } catch (err) {
      console.error("Student complaints fetch error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter complaint title");
      return;
    }

    if (!category) {
      alert("Please select category");
      return;
    }

    if (!description.trim()) {
      alert("Please enter description");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);

      if (photo) {
        formData.append("photo", photo);
      }

      await submitComplaint(formData);

      alert("Complaint submitted successfully");

      setTitle("");
      setCategory("");
      setDescription("");
      setPhoto(null);

      document.getElementById("complaint-photo").value = "";

      fetchMyComplaints();
    } catch (err) {
      console.error("COMPLAINT SUBMIT ERROR:", err);

      alert(
        err.response?.data?.msg ||
          "Failed to submit complaint"
      );
    }
  };

  useEffect(() => {
    fetchMyComplaints();

    const interval = setInterval(
      fetchMyComplaints,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="complaints-page">

      <div className="complaints-container">

        {/* ================= HEADER ================= */}

        <div className="complaints-header">

          <div>
            <p className="complaints-eyebrow">
              HOSTEL SUPPORT
            </p>

            <h1>🛠️ Complaints</h1>

            <p>
              Report hostel issues and track their resolution.
            </p>
          </div>

          <div className="complaints-header-icon">
            🛠️
          </div>

        </div>

        {/* ================= RAISE COMPLAINT ================= */}

        <form
          onSubmit={handleSubmit}
          className="complaint-form-card"
        >

          <div className="form-card-header">

            <div className="form-card-icon">
              ✏️
            </div>

            <div>
              <h2>Raise a Complaint</h2>

              <p>
                Tell us what needs to be fixed.
              </p>
            </div>

          </div>

          <div className="form-content">

            {/* TITLE */}

            <div className="form-group">

              <label>
                Complaint Title
              </label>

              <input
                type="text"
                placeholder="e.g. Fan not working"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

            </div>

            {/* CATEGORY */}

            <div className="form-group">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
              >
                <option value="">
                  Select Category
                </option>

                <option value="Electricity">
                  Electricity
                </option>

                <option value="Water">
                  Water
                </option>

                <option value="Furniture">
                  Furniture
                </option>

                <option value="WiFi">
                  WiFi
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

            </div>

            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                placeholder="Describe your problem in detail..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                required
                rows="5"
              />

            </div>

            {/* PHOTO */}

            <div className="form-group">

              <label>
                Photo Proof
                <span className="optional">
                  Optional
                </span>
              </label>

              <label
                htmlFor="complaint-photo"
                className="complaint-file-box"
              >

                <div className="complaint-upload-icon">
                  📷
                </div>

                <div>

                  <strong>
                    {photo
                      ? photo.name
                      : "Attach a photo"}
                  </strong>

                  <span>
                    {photo
                      ? "Photo selected"
                      : "PNG, JPG or JPEG"}
                  </span>

                </div>

                <input
                  id="complaint-photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setPhoto(e.target.files[0])
                  }
                />

              </label>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="submit-complaint-button"
            >
              <span>Submit Complaint</span>
              <span>→</span>
            </button>

          </div>

        </form>

        {/* ================= MY COMPLAINTS ================= */}

        <div className="my-complaints-header">

          <div>
            <p>YOUR REQUESTS</p>

            <h2>📋 My Complaints</h2>
          </div>

          <span>
            {complaints.length}{" "}
            {complaints.length === 1
              ? "Complaint"
              : "Complaints"}
          </span>

        </div>

        {complaints.length === 0 ? (
          <div className="empty-complaints">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No complaints submitted
            </h3>

            <p>
              Your submitted complaints will appear here.
            </p>

          </div>
        ) : (
          <div className="complaints-list">

            {complaints.map((c) => {

              const status =
                c.status?.toLowerCase();

              return (
                <div
                  key={c._id}
                  className="complaint-card"
                >

                  {/* CARD TOP */}

                  <div className="complaint-card-top">

                    <div className="complaint-title-area">

                      <div className="category-icon">
                        {c.category === "Electricity"
                          ? "⚡"
                          : c.category === "Water"
                          ? "💧"
                          : c.category === "Furniture"
                          ? "🪑"
                          : c.category === "WiFi"
                          ? "📶"
                          : "🔧"}
                      </div>

                      <div>

                        <h3>
                          {c.title || c.category}
                        </h3>

                        <span className="category-label">
                          {c.category}
                        </span>

                      </div>

                    </div>

                    <span
                      className={`complaint-status ${
                        status === "pending"
                          ? "complaint-pending"
                          : "complaint-resolved"
                      }`}
                    >
                      {status === "pending"
                        ? "⏳ Pending"
                        : "✅ Resolved"}
                    </span>

                  </div>

                  {/* DESCRIPTION */}

                  <div className="complaint-description">

                    <span>
                      DESCRIPTION
                    </span>

                    <p>
                      {c.description}
                    </p>

                  </div>

                  {/* PHOTO */}

                  {c.photo && (
                    <div className="complaint-photo-section">

                      <span>
                        ATTACHED PHOTO
                      </span>

                      <img
                        src={`http://localhost:5000/${c.photo.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Complaint"
                      />

                    </div>
                  )}

                  {/* FOOTER */}

                  <div className="complaint-footer">

                    <span>
                      Submitted
                    </span>

                    <strong>
                      {new Date(
                        c.createdAt
                      ).toLocaleString()}
                    </strong>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}