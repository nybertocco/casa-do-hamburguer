import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../config";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const [IsChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(`${API_URL}/me`, {
          credentials: "include",
        });

        if (response.ok) {
          navigate("/", { replace: true });
          return;
        }
      } catch (error) {
        console.log(error);
      }

      setIsChecking(false);
    };

    checkLogin();
  }, [navigate]);

  if (IsChecking) {
    return <p>Carregando</p>;
  }

  return <div>{children}</div>;
};

export default PublicRoute;
