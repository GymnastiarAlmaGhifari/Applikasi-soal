/* eslint-disable no-useless-catch */
import axios from "axios";
import { CreateQuizFormValues, RegisterPayload } from "@/types";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`; // Mengambil URL dari environment variables

const api = axios.create({
  baseURL: API_BASE_URL,
});

const setAuthHeader = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const { authToken }: { authToken: string } = JSON.parse(user);
    api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  }
};

// Menetapkan header autentikasi setiap kali membuat permintaan
setAuthHeader();

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProtectedData = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};


export const registerUser = async (
  payload: RegisterPayload
): Promise<Response> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Registration failed.");
  }

  return response.json();
};

// Fungsi untuk membangun URL API trivia dengan parameter yang diberikan
export const buildTriviaApiUrl = ({
  amount,
  category,
  difficulty,
  type,
}: CreateQuizFormValues): string => {
  // Mulai dengan bagian dasar URL API
  let apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}`;

  // Tambahkan parameter kesulitan jika ada
  if (difficulty) {
    apiUrl += `&difficulty=${difficulty}`;
  }

  // Tambahkan parameter tipe jika ada
  if (type) {
    apiUrl += `&type=${type}`;
  }

  // Kembalikan URL yang telah dibangun
  return apiUrl;
};
