import axios from "axios";

// Interface untuk data autentikasi pengguna
export interface AuthPayload {
  authToken: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

// Mengatur token autentikasi dalam header Axios
export const setAuthToken = (token: string | null) => {
  if (token) {
    // Jika token ada, tambahkan token ke header Authorization
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Jika token tidak ada, hapus header Authorization
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Simulasi login dan menyimpan data pengguna
export const login = (authData: AuthPayload) => {
  // Simpan data pengguna di localStorage
  localStorage.setItem("user", JSON.stringify(authData));
  // Atur token autentikasi
  setAuthToken(authData.authToken);
};

// Logout dan hapus data pengguna
export const logout = () => {
  // Hapus data pengguna dari localStorage
  localStorage.removeItem("user");
  // Hapus token autentikasi
  setAuthToken(null);
};

// Mengambil data pengguna dari localStorage
export const getUser = (): AuthPayload | null => {
  const user = localStorage.getItem("user");
  // Kembalikan data pengguna jika ada, atau null jika tidak ada
  return user ? JSON.parse(user) : null;
};
