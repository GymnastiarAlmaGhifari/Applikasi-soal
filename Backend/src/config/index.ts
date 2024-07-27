import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  googleRedirectUrlAdmin: process.env.BASE_URL_FRONTEND_ADMIN,
  googleRedirectUrlUser: process.env.BASE_URL_FRONTEND_USER,
  bucketName: process.env.BUCKET_NAME,
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEYFILENAME,
  backendMlUrl: process.env.BASE_URL_BACKEND_ML,
  DefaultImage: process.env.DEFAULT_IMAGE,
};
