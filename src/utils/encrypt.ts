import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";

export const encodedObjectId = (id: string) => {
  const cipherText = CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
  return encodeURIComponent(cipherText);
};
