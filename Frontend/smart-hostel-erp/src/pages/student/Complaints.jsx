// import { useState } from "react";
// import { submitComplaint } from "../../api/complaint.api";
// export default function Complaints() {
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [photo, setPhoto] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("category", category);
//     formData.append("description", description);
//     if (photo) formData.append("photo", photo);

//     await submitComplaint(formData);
//     alert("Complaint submitted");
//     setCategory(""); setDescription(""); setPhoto(null);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-md space-y-3">
//       <h2 className="text-xl font-bold">🛠️ Raise Complaint</h2>

//       <select className="w-full border p-2 rounded" value={category} onChange={e => setCategory(e.target.value)}>
//         <option value="">Select Category</option>
//         <option>Electricity</option>
//         <option>Water</option>
//         <option>Furniture</option>
//         <option>WiFi</option>
//         <option>Other</option>
//       </select>

//       <textarea className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

//       <input type="file" className="mb-3" onChange={e => setPhoto(e.target.files[0])} />

//       <button className="bg-blue-600 text-white w-full py-2 rounded">Submit</button>
//     </form>
//   );
// }
import { submitComplaint } from "../../api/complaint.api";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState("");
const [description, setDescription] = useState("");
const [photo, setPhoto] = useState(null);
  const token = localStorage.getItem("token");

  const fetchMyComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🎓 STUDENT COMPLAINTS:", res.data);
      setComplaints(res.data);
    } catch (err) {
      console.error("Student complaints fetch error", err);
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", category);
    formData.append("category", category);
    formData.append("description", description);

    if (photo) {
      formData.append("photo", photo);
    }

    await submitComplaint(formData);

    alert("Complaint submitted successfully");

    setCategory("");
    setDescription("");
    setPhoto(null);

    fetchMyComplaints();
  } catch (err) {
    console.error(err);
    alert("Failed to submit complaint");
  }
};

  useEffect(() => {
    fetchMyComplaints();

    // 🔥 AUTO REFRESH every 5 seconds
    const interval = setInterval(fetchMyComplaints, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
  <h2>Raise Complaint</h2>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
  >
    <option value="">Select Category</option>
    <option value="Electricity">Electricity</option>
    <option value="Water">Water</option>
    <option value="Furniture">Furniture</option>
    <option value="WiFi">WiFi</option>
    <option value="Other">Other</option>
  </select>

  <br /><br />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
  />

  <br /><br />

  <input
    type="file"
    onChange={(e) => setPhoto(e.target.files[0])}
  />

  <br /><br />

  <button type="submit">
    Submit Complaint
  </button>
</form>
      <h2>My Complaints</h2>

      {complaints.map((c) => {
        const status = c.status?.toLowerCase();

        return (
          <div
            key={c._id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <h4>{c.category}</h4>
            <p>{c.description}</p>

            <p>
              <b>Status:</b>{" "}
              {status === "pending" ? "⏳ Pending" : "✅ Resolved"}
            </p>
          </div>
        );
      })}
    </div>
  );
}