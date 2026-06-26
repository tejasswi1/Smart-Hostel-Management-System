// src/pages/warden/WardenMess.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function WardenMess() {
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [bills, setBills] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [month, setMonth] = useState("");
  const [baseAmount, setBaseAmount] = useState("");

  /* ================= FETCH ================= */

  const fetchStudents = async () => {
    const res = await axios.get(`${API}/users/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(res.data);
  };

  const fetchBills = async () => {
    const res = await axios.get(`${API}/messbill/all`);
    setBills(res.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchBills();
  }, []);

  /* ================= CREATE BILL ================= */

  const createBill = async () => {
  console.log("CLICKED"); // 👈 must print

  if (!studentId || !month || !baseAmount) {
    alert("Fill all fields");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/messbill",
      {
        studentId,
        month,
        baseAmount: Number(baseAmount),
        perDayAmount: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Bill Created ✅");

    setStudentId("");
    setMonth("");
    setBaseAmount("");
    fetchBills();
  } catch (err) {
    console.error(err);
    alert("Create bill failed ❌");
  }
};

  /* ================= UI ================= */

  return (
    <div style={{ padding: 20 }}>
      <h2>Warden – Mess Wallet</h2>

      {/* ===== CREATE BILL ===== */}
      <form
        onSubmit={createBill}
        style={{ border: "1px solid #ccc", padding: 15, marginBottom: 30 }}
      >
        <h3>Create Monthly Bill</h3>

        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <br /><br />

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          <option value="2025-01">January 2025</option>
          <option value="2025-02">February 2025</option>
          <option value="2025-03">March 2025</option>
        </select>

        <br /><br />

        <input
          type="number"
          placeholder="Base Amount"
          value={baseAmount}
          onChange={(e) => setBaseAmount(e.target.value)}
        />

        <br /><br />

        <button onClick={createBill} >Create Bill</button>
      </form>

      {/* ===== CREATED BILLS ===== */}
      <h3>Created Bills</h3>

      {bills.length === 0 && <p>No bills created yet</p>}

      {bills.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid #aaa",
            padding: 12,
            marginBottom: 12,
          }}
        >
          <p><b>Student:</b> {b.student?.name}</p>
          <p><b>Month:</b> {b.month}</p>
          <p><b>Base:</b> ₹{b.baseAmount}</p>
          <p><b>Cut:</b> ₹{b.totalCutAmount}</p>
          <p><b>Final:</b> ₹{b.finalAmount}</p>
        </div>
      ))}
    </div>
  );
}