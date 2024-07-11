"use client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext<{
  user: string;
  setUser: (user: any) => void;
  logout: () => void;
} | null>(null);

export const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("domestic-user");
    if (user) {
      setUser(user);
    } else {
      if (
        pathname === "/book" ||
        pathname === "/profile" ||
        pathname === "/dashboard"
      ) {
        router.push("/");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("domestic-user");
    setUser("");
    router.push("/");
  };

  return (
    <userContext.Provider value={{ user, setUser, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserWrapper");
  }
  return context;
};
