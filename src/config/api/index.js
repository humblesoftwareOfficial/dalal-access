import axios from "axios";

let api = axios.create({
  // baseURL: "https://wedding-service-rbkvf5x6ka-uc.a.run.app/",
  baseURL: "http://192.168.10.93:3000",
});

export const Authentication = async (payload) => {
  return await api.post(`/authentication/login`, payload);
};

export const SignIn = async (payload) => {
  return await api.post(`/users/sign-in`, payload);
};

export const UpdateUserInfos = async (payload, code, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.patch(`/users/${code}`, payload);
};

export const VerifyAccount = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/users/verify`, payload);
};

export const GetUserInfos = async (code, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.get(`/users/${code}`);
};

export const GetAccess = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/access/list`, payload);
};

export const GetUserEvents = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/event/list`, payload);
};

export const NewGuestsForEvent = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/access/new`, payload);
};

export const GetAccessInfos = async (code, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.get(`/access/${code}`);
};

export const CheckAccessOnEvent = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/access/event`, payload);
};

export const UpdateAccess = async (code, token, payload) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.patch(`/access/update/${code}`, payload);
};

export const CreateNewEvent = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/event/new`, payload);
};

export const GetUserStats = async (code, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.get(`/event/stats/${code}`);
};

export const GetEventInfos = async (code, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.get(`/event/${code}`);
};

export const AddNewCategory = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/event/add-categories`, payload);
};

export const RemoveCategory = async (payload, token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
  return await api.post(`/event/remove-categories`, payload);
};



const apis = {
  Authentication,
  SignIn,
  VerifyAccount,
  UpdateUserInfos,
  GetUserInfos,
  GetAccess,
  GetUserEvents,
  NewGuestsForEvent,
  GetAccessInfos,
  UpdateAccess,
  CreateNewEvent,
  GetUserStats,
  GetEventInfos,
  AddNewCategory,
  RemoveCategory
};

export default apis;
