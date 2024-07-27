import { Request, Response } from "express";
import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { google } from "googleapis";
import { config } from "../config";

// const oauth2Client = new google.auth.OAuth2(config.googleClientId, config.googleClientSecret, config.googleCallbackUrl);

// const scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"];
// const authorizationUrl = oauth2Client.generateAuthUrl({
//   access_type: "offline",
//   scope: scopes,
//   include_granted_scopes: true,
// });

interface UserData {
  id: string;
  name: string;
  role: string;
  address: string;
}

interface ValidationRequest extends Request {
  userData?: UserData;
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists
  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists", data: [] });
  }

  // Create new user
  const newUser = await prisma.users.create({
    data: { name, email, password: hashedPassword },
  });

  if (newUser) {
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    const token = jwt.sign(payload, config.jwtSecret!, { expiresIn: "30d" });

    return res.json({
      message: "User created",
      data: payload,
      authToken: token,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found", data: [] });
  }

  if (!user.password) {
    return res.status(404).json({ message: "Password not set", data: [] });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret!, {
      expiresIn: 60 * 60 * 24 * 30,
    });
    // Ensure the token length is 255 characters

    return res.json({
      message: "Login success",
      data: { id: user.id, name: user.name, email: user.email },
      authToken: token,
    });
  } else {
    return res.status(403).json({ message: "Wrong password", data: [] });
  }
};
// buatkan logout juga menggunakan jwt menghapus token dari client
export const logout = async (req: Request, res: Response) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  try {
    const token = authorization!.split(" ")[1];
    const jwtDecode = jwt.decode(token) as UserData;

    const user = await prisma.users.findUnique({ where: { id: jwtDecode.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: [] });
    }
    return res.json({ message: "Logout success" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", data: error });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      status: false,
      data: [],
    });
  }

  try {
    const decoded = jwt.decode(token);
    const user = await prisma.users.findUnique({
      where: { id: (decoded as any).id },
    });

    if (!user) {
      return res.status(404).json({
        message: "Auth token doesn't match any user",
        status: false,
        data: [],
      });
    }

    res.json({
      message: "Authorized Successfully",
      status: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", data: error });
  }
};
// export const googleAuth = (req: Request, res: Response) => {
//   res.redirect(authorizationUrl);
// };

// export const googleCallback = async (req: Request, res: Response) => {
//   const { code } = req.query;
//   const { tokens } = await oauth2Client.getToken(code as string);
//   oauth2Client.setCredentials(tokens);

//   const oauth2 = google.oauth2({
//     auth: oauth2Client,
//     version: "v2",
//   });

//   const { data } = await oauth2.userinfo.get();

//   if (!data.email || !data.name) {
//     return res.json({ data });
//   }

//   let user = await prisma.users.findUnique({
//     where: { email: data.email },
//   });

//   if (!user) {
//     // Jika pengguna tidak ada, tambahkan sebagai pengguna baru
//     user = await prisma.users.create({
//       data: { name: data.name, email: data.email, address: "-", role: "user", image: data.picture },
//     });
//   }

//   // Cek apakah pengguna adalah admin
//   const isAdmin = user.role === "admin";

//   // Simpan informasi pengguna ke sesi
//   const payload = { id: user.id, name: user.name, address: user.address, role: user.role, image: user.image };
//   const token = jwt.sign(payload, config.jwtSecret!, { expiresIn: 60 * 60 * 24 * 30 });

//   res.cookie("token", token);

//   if (isAdmin) {
//     res.redirect(`${config.googleRedirectUrlAdmin}`); // Redirect ke halaman admin jika pengguna adalah admin
//   } else {
//     res.redirect(`${config.googleRedirectUrlUser}`); // Redirect ke halaman pengguna jika pengguna adalah pengguna biasa
//   }
// };
