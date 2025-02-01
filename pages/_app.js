import { useRouter } from "next/router";
import Layout from "../components/layout/main";
import LoginLayout from "../components/layout/article";
import "../styles/globals.css";
import axios from "../lib/axios";
import { useEffect, useState } from "react";

function App({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.post("/api/auth/verify-token", { token }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (res.data.success) {
            setIsLoggedIn(true);
            if (router.pathname === '/login') {
              router.push('/dashboard/main');
            }
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          handleLogout();
        }
      } else {
        handleLogout();
      }
      setIsLoading(false);
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("token");

      const protectedRoutes = [
        "/dashboard/main",
        "/dashboard/team",
        "/dashboard/portfolio"
      ];

      if (protectedRoutes.some(route => router.pathname.startsWith(route))) {
        router.push("/login");
      }
    };

    checkLoginStatus();
  }, [router]);


  const getLayout = () => {
    if (router.pathname === "/login") {
      return (
        <LoginLayout>
          <Component {...pageProps} />
        </LoginLayout>
      );
    } else {
      return (
        <Layout isLoggedIn={isLoggedIn} isLoading={isLoading}>
          <Component {...pageProps} />
        </Layout>
      );
    }
  };
  return <>{getLayout()}</>;
}

export default App;
