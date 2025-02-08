// import { useAuth } from "../../context/auth-context";
import Cookies from "js-cookie";

export default function Dashboard() {
  //   const { authData } = useAuth();
  const authData = Cookies.get("authToken")
    ? JSON.parse(Cookies.get("authToken"))
    : null;

  if (!authData) {
    return <p>Please log in to access the dashboard.</p>;
  }

  return (
    <div>
      {console.log(authData.user)}
      <h1>Welcome, {authData.user}</h1>
      <p>Your token: {authData.token}</p>
    </div>
  );
}
