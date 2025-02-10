// pages/index.js
import SignOutButton from "@/components/SignOutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HomePage = () => {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {session ? (
        <>
          <p>Logged in as {session.user.name}</p>
          <SignOutButton />
        </>
      ) : (
        <p>
          You are not logged in.
          <Link className="underline text-blue-500" href="/auth/signin">
            Log in!
          </Link>
        </p>
      )}
    </div>
  );
};

export default HomePage;
