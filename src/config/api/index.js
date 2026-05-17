import axios from "axios";

let api = axios.create({
  // baseURL: "https://wedding-service-rbkvf5x6ka-uc.a.run.app/",
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

const apis = {
  Authentication,
  UpdateUserInfos,
  GetReservationInfos,
  GetRequests
};

export default apis;
