import axios from "axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("/users/login", { email, password });
  if (res.status !== 200) throw new Error("Login Failed");

  const data = res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/users/logout");
  if (res.status !== 200) throw new Error("Logout Failed");

  const data = res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/users/auth-status");
  if (res.status !== 200) throw new Error("Auth Status Check Failed");
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) throw new Error("Unable to send chat");
  const data = await res.data;
  return data;
};

export const fetchChats = async () => {
  const res = await axios.get("/chat/fetch-chats");
  if (res.status !== 200) throw new Error("Unable to fetch chats");
  const data = await res.data;
  return data;
};

export const deleteChats = async () => {
  const res = await axios.delete("/chat/delete-chats");
  if (res.status !== 200) throw new Error("Unable to delete chats");
  const data = await res.data;
  return data;
};
