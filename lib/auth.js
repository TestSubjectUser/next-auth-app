// lib/auth.js
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const requireAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkSession = async () => {
        const session = await getSession();

        if (!session) {
          // Redirect to sign-in page if not authenticated
          router.push("/auth/signin");
        } else {
          setLoading(false); // Set loading to false if authenticated
        }
      };

      checkSession();
    }, [router]);

    if (loading) {
      return <p>Loading...</p>; // Show loading state while checking session
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
