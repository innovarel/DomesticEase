"use client";
import {
  Button,
  Flex,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "../contexts/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { deleteUser, getUserInfo } from "../actions/user";
import { useEffect } from "react";

const Page = () => {
  const { user, logout } = useUser();
  const { data: userdetails, isLoading } = useQuery({
    queryKey: ["userdetails", user],
    queryFn: async () => getUserInfo(user),
  });
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user === "admin@admin.com") {
      router.push("/dashboard");
    }
  }, [user]);

  const handleBookClick = () => {
    router.push("/book"); // navigate to the book page
  };

  if (isLoading)
    return (
      <Flex gap={2} width={"100%"} marginY={10} justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    );

  if (!user) {
    return (
      <Flex>
        <Text
          fontSize={"xx-large"}
          fontWeight={"800"}
          marginY={10}
          marginX={"auto"}
        >
          Only logged in users can view this page
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Flex
        alignItems={"center"}
        paddingY={4}
        width={"100%"}
        flexDir={"column"}
        paddingBottom={64}
      >
        {userdetails?.type === "service" ? (
          <Text fontSize={"x-large"} fontWeight={"bold"}>
            Welcome {userdetails?.name}
          </Text>
        ) : (
          <Text fontSize={"x-large"} fontWeight={"bold"}>
            Welcome {userdetails?.name}
          </Text>
        )}
        <Flex
          direction={{ base: "column", md: "row" }} // Change direction based on screen size
          gap={2}
          width={"100%"}
          marginTop={10}
          paddingX={10}
        >
          {userdetails?.type === "service" ? (
            <Button
              fontSize={"x-large"}
              w={"100%"}
              paddingY={12}
              colorScheme="purple"
              onClick={() => router.push("/works")}
            >
              <Image
                src={"/briefcase.svg"}
                width={30}
                height={30}
                alt="image"
              />
              Works
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/orders")}
              fontSize={"x-large"}
              w={"100%"}
              paddingY={12}
              colorScheme="teal"
            >
              <Image src={"/orders.svg"} width={30} height={30} alt="image" />
              Orders
            </Button>
          )}
          <Button
            fontSize={"x-large"}
            w={"100%"}
            paddingY={12}
            colorScheme={"linkedin"}
            onClick={() => router.push("/profile")}
          >
            <Image src={"/profile.svg"} width={30} height={30} alt="image" />
            Profile
          </Button>
          <Button
            fontSize={"x-large"}
            w={"100%"}
            paddingY={12}
            colorScheme="facebook"
            onClick={handleBookClick}
          >
            <Image src={"/book.svg"} width={30} height={30} alt="image" />
            Book
          </Button>
        </Flex>
        <Flex direction={{ base: "column", md: "row" }} gap={2} width={"100%"} marginY={2} paddingX={10}>
          <Button
            fontSize={"x-large"}
            w={"100%"}
            paddingY={12}
            colorScheme={"orange"}
            onClick={async () => {
              await deleteUser(user);
              logout();
              toast({
                title: "Account Deactivated",
                description: "Your account has been deactivated",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              router.push("/");
            }}
          >
            <Image src={"/delete.svg"} width={30} height={30} alt="image" />
            Deactivate Account
          </Button>
          <Button
            fontSize={"x-large"}
            w={"100%"}
            paddingY={12}
            colorScheme={"red"}
            onClick={() => {
              logout();
              toast({
                title: "Logged Out",
                description: "You have been logged out",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              router.push("/");
            }}
          >
            <Image src={"/logout.svg"} width={30} height={30} alt="image" />
            Logout
          </Button>
          <Button
            fontSize={"x-large"}
            w={"100%"}
            paddingY={12}
            colorScheme="whatsapp"
            onClick={() => router.push("/reviews-page")}
          >
            <Image src={"/book.svg"} width={30} height={30} alt="image" />
            Reviews
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
