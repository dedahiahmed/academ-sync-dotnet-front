import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const secretKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzg2MjU4NCwiaWF0IjoxNzA3ODYyNTg0fQ.5Ab6-iu6ds1--VS6JG5aLkpKSJggIL6f8c-nam79pPM";

export const accessToken = (() => {
  const encryptedToken = Cookies.get("accessToken");
  if (encryptedToken) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedToken;
    } catch (error) {
      console.error("Error decrypting token:", error);
      return "";
    }
  } else {
    return "";
  }
})();
