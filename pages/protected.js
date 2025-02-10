// pages/protected.js
import { requireAuth } from "../lib/auth";

const ProtectedPage = () => {
  return <h1>This is a protected page</h1>;
};

export default requireAuth(ProtectedPage);
