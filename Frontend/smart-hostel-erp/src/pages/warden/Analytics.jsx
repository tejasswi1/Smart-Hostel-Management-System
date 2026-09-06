import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Analytics.css";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      const res = await api.get("/analytics/warden");
      setData(res.data);
    } catch (err) {
      console.error("Analytics error:", err);
      alert(
        err.response?.data?.msg ||
          "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">
          <div className="analytics-spinner"></div>
          <h3>Loading analytics...</h3>
          <p>Fetching the latest hostel statistics.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="analytics-page">
        <div className="analytics-empty">
          <div>📊</div>
          <h3>No analytics data available</h3>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">

      {/* HEADER */}

      <div className="analytics-header">
        <div>
          <p className="analytics-label">
            WARDEN PANEL
          </p>

          <h1>📊 Warden Analytics</h1>

          <p>
            Overview of hostel activity and student services.
          </p>
        </div>
      </div>


      {/* STUDENTS */}

      <section className="analytics-section">

        <div className="section-heading">
          <div className="section-icon students-icon">
            👩‍🎓
          </div>

          <div>
            <h2>Students</h2>
            <p>Total registered students</p>
          </div>
        </div>

        <div className="student-total-card">
          <div className="big-stat">
            {data.students.total}
          </div>

          <div>
            <span>Total Students</span>
            <small>Currently registered</small>
          </div>
        </div>

      </section>


      {/* NIGHT ENTRIES */}

      <section className="analytics-section">

        <div className="section-heading">
          <div className="section-icon night-icon">
            🌙
          </div>

          <div>
            <h2>Night Entries</h2>
            <p>Night entry approval statistics</p>
          </div>
        </div>

        <div className="analytics-grid">

          <Card
            title="Total"
            value={data.nightEntries.total}
            icon="📋"
            type="default"
          />

          <Card
            title="Pending"
            value={data.nightEntries.pending}
            icon="⏳"
            type="pending"
          />

          <Card
            title="Approved"
            value={data.nightEntries.approved}
            icon="✓"
            type="approved"
          />

          <Card
            title="Rejected"
            value={data.nightEntries.rejected}
            icon="✕"
            type="rejected"
          />

        </div>

      </section>


      {/* COMPLAINTS */}

      <section className="analytics-section">

        <div className="section-heading">
          <div className="section-icon complaint-icon">
            🛠️
          </div>

          <div>
            <h2>Complaints</h2>
            <p>Hostel complaint statistics</p>
          </div>
        </div>

        <div className="analytics-grid">

          <Card
            title="Total"
            value={data.complaints.total}
            icon="📋"
            type="default"
          />

          <Card
            title="Pending"
            value={data.complaints.pending}
            icon="⏳"
            type="pending"
          />

          <Card
            title="Resolved"
            value={data.complaints.resolved}
            icon="✓"
            type="approved"
          />

        </div>

      </section>


      {/* MESS */}

      <section className="analytics-section">

        <div className="section-heading">
          <div className="section-icon mess-icon">
            🍽️
          </div>

          <div>
            <h2>Mess Payments</h2>
            <p>Student mess payment status</p>
          </div>
        </div>

        <div className="analytics-grid">

          <Card
            title="Approved"
            value={data.mess.approved}
            icon="✓"
            type="approved"
          />

          <Card
            title="Pending"
            value={data.mess.pending}
            icon="⏳"
            type="pending"
          />

          <Card
            title="Rejected"
            value={data.mess.rejected}
            icon="✕"
            type="rejected"
          />

          <Card
            title="Unpaid"
            value={data.mess.unpaid}
            icon="₹"
            type="unpaid"
          />

        </div>

      </section>

    </div>
  );
}


// =====================================================
// CARD
// =====================================================

function Card({ title, value, icon, type }) {
  return (
    <div className={`analytics-card ${type}`}>

      <div className="card-top">

        <div className="card-icon">
          {icon}
        </div>

        <span className="card-title">
          {title}
        </span>

      </div>

      <div className="card-value">
        {value}
      </div>

      <div className="card-footer">
        {title} records
      </div>

    </div>
  );
}