import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173", // Ganti dengan URL frontend Anda
  optionsSuccessStatus: 200, // Beberapa browser lama (IE11, berbagai SmartTV) memerlukan ini
  credentials: true, // Izinkan kredensial (seperti cookie)
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
