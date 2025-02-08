import { useAuth } from "../../context/auth-context";

export default function Dashboard() {
  const { authData } = useAuth();

  if (!authData) {
    return <p>Please log in to access the dashboard.</p>;
  }

  return (
    <div>
      <h1>Welcome, {authData.user}</h1>
      <p>Your token: {authData.token}</p>
    </div>
  );
}
