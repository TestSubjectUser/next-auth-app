// components/SignOutButton.js
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button className="underline text-red-500" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
