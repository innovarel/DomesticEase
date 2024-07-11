"use client";
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { createUser, getUser } from "../actions/user";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/user";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { setUser } = useUser();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await getUser(email, password);
      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      console.log(user);
      localStorage.setItem("domestic-user", user.email);
      setUser(user.email);
      router.push("/user");
    } catch (e) {
      setError(e as string);
    }

    setLoading(false);
  };

  const toast = useToast();
  const handleForgetPassword = async (e: any) => {
    if (!email) {
      toast({
        title: "Email is required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const res = await fetch("/api/forget-pass", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    toast({
      title: "Email will be sent if the user exists",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
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
        width={["90%", "80%", "70%", "60%", "40%"]}
        maxWidth={"500px"}
      >
        <div className="brand">
          <a href="/">
            <img src="/a_logo.png" alt="Logo" width="200px" />
          </a>
        </div>
        <Text fontSize={"x-large"} fontWeight={"bold"} color={"white"}>
          Domestic Ease Signin
        </Text>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Flex
            direction={"column"}
            width={"100%"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Input
              background={"gray.100"}
              width={"100%"}
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              background={"gray.100"}
              width={"100%"}
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              width={"100%"}
              colorScheme="teal"
              type="submit"
              isLoading={loading}
            >
              Login
            </Button>
            <Button
              width={"100%"}
              colorScheme="blue"
              isLoading={loading}
              type="button"
              onClick={handleForgetPassword}
            >
              Forget Password
            </Button>
          </Flex>
        </form>
        {error && <Text color={"red"}>{error}</Text>}
      </Flex>
    </Flex>
  );
};
export default Page;
