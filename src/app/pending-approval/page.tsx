"use client";
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { createUser, getUser } from "../actions/user";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/user";

const Page = () => {
  const toast = useToast();
  const [disabled, setDisabled] = useState(false);
  const { user } = useUser();
  const handleForgetPassword = async (e: any) => {
    if (!user) {
      toast({
        title: "Please login in again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const res = await fetch("/api/approve-mail", {
      method: "POST",
      body: JSON.stringify({ email: user }),
    });
    toast({
      title: "Email will be sent if the user exists",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setDisabled(true);
  };

  return (
    <Flex
      direction={"column"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      marginY={10}
      paddingBottom={64}
    >
      <Flex
        background={"gray.800"}
        rounded={8}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={8}
        paddingX={8}
        paddingY={16}
      >
        <div className="brand">
          <a href="/">
            <img src="/a_logo.png" alt="Logo" width="200px" />
          </a>
        </div>
        <Text fontSize={"x-large"} fontWeight={"bold"} color={"white"}>
          Your account is pending approval, please verify your email
        </Text>
        <Button
          isDisabled={disabled}
          onClick={handleForgetPassword}
          colorScheme="teal"
        >
          Send verification email
        </Button>
      </Flex>
    </Flex>
  );
};
export default Page;
