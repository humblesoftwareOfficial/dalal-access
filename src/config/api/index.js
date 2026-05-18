import axios from "axios";

let api = axios.create({
  //  baseURL: "https://booking-app-service-o7g3.onrender.com/",
  baseURL: "http://192.168.1.34:3001",
});

export const Authentication = async (payload) => {
  return await api.post(`/authentication/login`, payload);
};

export const UpdateUserInfos = async (payload, code, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.patch(`/users/${code}`, payload);
};

export const GetReservationInfos = async (code) => {
  return await api.get(`/reservations/${code}`);
};

export const GetRequests = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post("/reservations/list", payload);
};

export const ReportReservation = async (payload, token = "") => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/reservations/report`, payload);
};

const apis = {
  Authentication,
  UpdateUserInfos,
  GetReservationInfos,
  GetRequests,
  ReportReservation,
};

export default apis;
