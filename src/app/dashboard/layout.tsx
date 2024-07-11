"use client";
import { Flex, Link } from "@chakra-ui/react";
import { useUser } from "../contexts/user";
import { getUserInfo } from "../actions/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const { user } = useUser();
  const { data: userdetails } = useQuery({
    queryKey: ["userdetails", user],
    queryFn: async () => getUserInfo(user),
  });

  useEffect(() => {
    if (user && user !== "admin@admin.com") {
      router.push("/user");
    }
  }, [user]);
  return (
    <Flex>
      <Flex
        paddingY={6}
        paddingX={2}
        maxW={"200px"}
        gap={4}
        w={"100%"}
        h={"100vh"}
        flexDir={"column"}
        bg={"gray.50"}
      >
        <Link
          color={"blue.800"}
          fontWeight={"semibold"}
          fontSize={"larger"}
          w={"100%"}
          _hover={{
            textDecoration: "none",
          }}
          padding={1}
          borderRadius={4}
          href="/dashboard"
        >
          Home
        </Link>
        <Link
          color={"blue.800"}
          fontWeight={"semibold"}
          fontSize={"larger"}
          w={"100%"}
          _hover={{
            textDecoration: "none",
          }}
          padding={1}
          borderRadius={4}
          href="/dashboard/service-workers"
        >
          Service Workers
        </Link>
        <Link
          color={"blue.800"}
          fontWeight={"semibold"}
          fontSize={"larger"}
          w={"100%"}
          _hover={{
            textDecoration: "none",
          }}
          padding={1}
          borderRadius={4}
          href="/dashboard/users"
        >
          Users
        </Link>
        <Link
          color={"blue.800"}
          fontWeight={"semibold"}
          fontSize={"larger"}
          w={"100%"}
          _hover={{
            textDecoration: "none",
          }}
          padding={1}
          borderRadius={4}
          href="/dashboard/orders"
        >
          Orders
        </Link>
        <Link
          color={"blue.800"}
          fontWeight={"semibold"}
          fontSize={"larger"}
          w={"100%"}
          _hover={{
            textDecoration: "none",
          }}
          padding={1}
          borderRadius={4}
          href="/dashboard/reviews"
        >
          Reviews
        </Link>
        <Link
          color={"blue.800"}
          fontWeight={"semibold"}
          fontSize={"larger"}
          w={"100%"}
          _hover={{
            textDecoration: "none",
          }}
          padding={1}
          borderRadius={4}
          href="/dashboard/shop-orders"
        >
          Shop Orders
        </Link>
        <Link
          color={"blue.800"}
          fontWeight={"semibold"}
          fontSize={"larger"}
          w={"100%"}
          _hover={{
            textDecoration: "none",
          }}
          padding={1}
          borderRadius={4}
          href="/dashboard/contact-requests"
        >
          Contact Requests
        </Link>
        <Link
          color={"blue.800"}
          fontWeight={"semibold"}
          fontSize={"larger"}
          w={"100%"}
          _hover={{
            textDecoration: "none",
          }}
          padding={1}
          borderRadius={4}
          href="/dashboard/items"
        >
          Shop Items
        </Link>
      </Flex>
      {children}
    </Flex>
  );
};

export default Layout;
