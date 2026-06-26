import api from "./axios";

// Student: Submit complaint
export const submitComplaint = (data) => {
  return api.post("/complaints", data);
};

// Student: Get my complaints
export const getMyComplaints = () => {
  return api.get("/complaints/my");
};

// Warden: Get all complaints
export const getAllComplaints = () => {
  return api.get("/complaints");
};

// Warden: Resolve complaint
export const resolveComplaint = (id) => {
  return api.put(`/complaints/resolve/${id}`);
};