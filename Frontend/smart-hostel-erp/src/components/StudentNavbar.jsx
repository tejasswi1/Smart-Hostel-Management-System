// import { useNavigate } from "react-router-dom";

// export default function StudentNavbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
//       <h1 className="text-lg font-bold">Smart Hostel ERP</h1>

//       <div className="flex gap-4 items-center">
//         <button onClick={() => navigate("/student")} className="hover:underline">
//           Dashboard
//         </button>
//         <button onClick={() => navigate("/night-entry")} className="hover:underline">
//           Night Entry
//         </button>
//         <button onClick={() => navigate("/complaints")} className="hover:underline">
//           Complaints
//         </button>
//         <button
//           onClick={logout}
//           className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }