import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Success from "@/components/ui/Success";
import Failed from "@/components/ui/Failed";
import { useAuth } from "../context/auth-context";
import Cookies from "js-cookie";

function handleSubmit(event, setStatus, router, setAuth) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const dataOb = {
    email: data.get("email"),
    password: data.get("password"),
  };

  fetch("/api/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataOb),
  })
    .then((response) => response.json())
    .then((data) => {
      setStatus("success");
      console.log("data: ", data);

      const authData = {
        user: data.cred.email,
        token: data.cred.password,
      };
      // Store the auth data in context and localStorage
      // setAuth(authData);
      Cookies.set("authToken", JSON.stringify(authData), { expires: 7 }); // Store token in cookies (expires in 7 days)

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    })
    .catch((error) => {
      setStatus("failed");
      console.error(error);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    });
}

export default function Home() {
  const [status, setStatus] = useState(null);
  const router = useRouter();
  const { setAuth } = useAuth();

  // Check if the user already has an authToken in cookies
  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      // If token exists, navigate directly to the dashboard
      router.push("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(e) => handleSubmit(e, setStatus, router, setAuth)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Start a 14-day free trial
          </a>
          {status === "success" && <Success />}
          {status === "failed" && <Failed />}
        </p>
      </div>
    </div>
  );
}
