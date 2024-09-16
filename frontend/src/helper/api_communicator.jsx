import axios from "axios";

export const signupUser = async (name, email, password) => {
  try {
    const res = await axios.post('/users/signup', { name, email, password });
    if (res.status !== 201) throw new Error('Signup Failed!');
    return res.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post("/users/login", { email, password });
    if (res.status !== 200) throw new Error("Login Failed");
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get("/users/logout");
    if (res.status !== 200) throw new Error("Logout Failed");
    return res.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/users/auth-status");
    if (res.status !== 200) throw new Error("Auth Status Check Failed");
    return res.data;
  } catch (error) {
    console.error("Error checking auth status:", error);
    throw error;
  }
};

export const sendChatRequest = async (message) => {
  try {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) throw new Error("Unable to send chat");
    return res.data;
  } catch (error) {
    console.error("Error sending chat request:", error);
    throw error;
  }
};

export const fetchChats = async () => {
  try {
    const res = await axios.get("/chat/fetch-chats");
    if (res.status !== 200) throw new Error("Unable to fetch chats");
    return res.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export const deleteChats = async () => {
  try {
    const res = await axios.delete("/chat/delete-chats");
    if (res.status !== 200) throw new Error("Unable to delete chats");
    return res.data;
  } catch (error) {
    console.error("Error deleting chats:", error);
    throw error;
  }
};