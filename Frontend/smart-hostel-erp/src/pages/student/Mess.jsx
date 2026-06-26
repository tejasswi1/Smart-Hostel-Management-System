// import { useEffect, useState } from "react";
// import { getMyBills, payBill } from "../../api/messbill.api";

// export default function MessBills() {
//   const [bills, setBills] = useState([]);

//   useEffect(() => {
//     getMyBills().then(res => setBills(res.data));
//   }, []);

//   const uploadProof = async (id, file) => {
//     const fd = new FormData();
//     fd.append("proof", file);
//     await payBill(id, fd);
//     alert("Payment proof submitted");
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">💰 Mess Bills</h2>
//       {bills.map(b => (
//         <div key={b._id} className="border p-3 mb-3 rounded">
//           <p>Month: {b.month}</p>
//           <p>Amount: ₹{b.amount}</p>
//           <p>Status: {b.paid ? "Paid" : "Pending"}</p>
//           {!b.paid && (
//             <input type="file" className="mt-2" onChange={e => uploadProof(b._id, e.target.files[0])} />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
// pages/student/MessBills.jsx
// ======================= STUDENT MESS UI (FINAL – CORRECTED) =======================
// ======================= FRONTEND =======================
// StudentMess.jsx
// ===================== STUDENT MESS UI =====================
// ✅ FIXED StudentMess.jsx (working with advance wallet + mess cuts)

import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentMess() {
  const [wallet, setWallet] = useState(null);
  const [file, setFile] = useState(null);
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  const fetchWallet = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/mess/my-wallet",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setWallet(res.data);
  };

  const uploadAdvance = async () => {
    const fd = new FormData();
    fd.append("screenshot", file);
    fd.append("amount", amount);

    await axios.put(
      "http://localhost:5000/api/mess/advance/upload",
      fd,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Advance uploaded");
    fetchWallet();
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  if (!wallet) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Mess Wallet</h2>

      <p><b>Status:</b> {wallet.advanceStatus}</p>
      <p><b>Balance:</b> ₹{wallet.advanceBalance}</p>
      <p><b>Used:</b> ₹{wallet.usedAmount}</p>

      <hr />

      <input
        type="number"
        placeholder="Advance Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadAdvance}>Upload Advance</button>

      <hr />

      <h3>Monthly Bills</h3>
      {wallet.bills.map((b) => (
        <p key={b._id}>
          {b.month} – ₹{b.amount}
        </p>
      ))}
    </div>
  );
}