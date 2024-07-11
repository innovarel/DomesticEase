"use client";
import { Button, Flex, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createUser, getUser, getUserInfo, updateUser } from "../actions/user";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/user";
import { useQuery } from "@tanstack/react-query";

const Page = ({ searchParams }: any) => {
  const email = decodeURIComponent(searchParams.email);
  const oldPass = decodeURIComponent(searchParams.password);

  console.log({ email, oldPass });
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { user } = useUser();
  const toast = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["user", email],
    queryFn: () => getUser(email, oldPass),
  });
  useEffect(() => {
    if (user) {
      console.log(user);
      console.log("user already loggedin");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    console.log("here", { data });
    if (data?.email === email && data?.password === oldPass) {
    } else {
      console.log({ data }, "invalid");
      toast({
        title: "Invalid Details",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      router.push("/");
    }
  }, [data]);

  if (isLoading) {
    return (
      <Flex
        direction={"column"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        marginY={10}
        paddingBottom={64}
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!password) {
      toast({
        title: "Password is required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const user = await updateUser(email, { password });
    toast({
      title: "Password updated",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    router.push("/");
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
      <Text fontSize={"x-large"} fontWeight={"bold"}>
        Update Password
      </Text>
      <Text fontSize={"large"} fontWeight={"semibold"}>
        {email}
      </Text>
      <form className=" max-w-96" onSubmit={handleSubmit}>
        <Flex
          direction={"column"}
          width={"100%"}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Input
            width={500}
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button width={500} colorScheme="teal" type="submit">
            Change Password
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
export default Page;
