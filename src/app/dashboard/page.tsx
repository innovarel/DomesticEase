"use client";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import { getAllOrders } from "../actions/book";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "../actions/review";
import { getAllServiceUsers, getAllUsers } from "../actions/user";
import { GetOrders } from "../actions/orders";

const Page = () => {
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => getAllOrders(),
  });
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews-admin"],
    queryFn: async () => getAllReviews(),
  });
  const { data: workers, isLoading: workersLoading } = useQuery({
    queryKey: ["service-users"],
    queryFn: async () => getAllServiceUsers(),
  });
  const { data: shopOrders, isLoading: shopLoading } = useQuery({
    queryKey: ["shop-orders"],
    queryFn: async () => GetOrders(),
  });
  const { data, isLoading } = useQuery({
    queryKey: ["users-admin"],
    queryFn: async () => getAllUsers(),
  });
  return (
    <Flex flexDir={"column"} w={"100%"} gap={4}>
      <Text
        fontWeight={"bold"}
        fontSize={"xx-large"}
        paddingX={8}
        paddingTop={8}
        color={"blue.800"}
        marginX={"auto"}
      >
        Select An Option
      </Text>
      <Flex paddingX={8} w={"100%"} gap={2}>
        <Flex
          flexDir={"column"}
          gap={6}
          padding={6}
          rounded={"20px"}
          w={"100%"}
          bg={"blue.600"}
          _hover={{
            bg: "blue.700",
          }}
          cursor={"pointer"}
          onClick={() => {
            window.location.href = "/dashboard/orders";
          }}
        >
          <Image src={"/orders.svg"} width={30} height={30} alt="image" />

          <Text fontSize={"x-large"} color={"white"} fontWeight={"bold"}>
            Orders
          </Text>
          <Text fontSize={"large"} fontWeight={"semibold"} color={"white"}>
            {ordersLoading ? <Spinner /> : orders?.length}
          </Text>
        </Flex>

        <Flex
          flexDir={"column"}
          gap={6}
          padding={6}
          rounded={"20px"}
          w={"100%"}
          bg={"blue.600"}
          _hover={{
            bg: "blue.700",
          }}
          cursor={"pointer"}
          onClick={() => {
            window.location.href = "/dashboard/service-workers";
          }}
        >
          <Image src={"/profile.svg"} width={30} height={30} alt="image" />

          <Text fontSize={"x-large"} color={"white"} fontWeight={"bold"}>
            Service Workers
          </Text>
          <Text fontSize={"large"} fontWeight={"semibold"} color={"white"}>
            {workersLoading ? <Spinner /> : workers?.length}
          </Text>
        </Flex>

        <Flex
          flexDir={"column"}
          gap={6}
          padding={6}
          rounded={"20px"}
          w={"100%"}
          bg={"blue.600"}
          _hover={{
            bg: "blue.700",
          }}
          cursor={"pointer"}
          onClick={() => {
            window.location.href = "/dashboard/reviews";
          }}
        >
          <Image src={"/briefcase.svg"} width={30} height={30} alt="image" />

          <Text fontSize={"x-large"} color={"white"} fontWeight={"bold"}>
            Reviews
          </Text>
          <Text fontSize={"large"} fontWeight={"semibold"} color={"white"}>
            {reviewsLoading ? <Spinner /> : reviews?.length}
          </Text>
        </Flex>
      </Flex>

      <Flex paddingX={8} w={"100%"} gap={2}>
        <Flex
          flexDir={"column"}
          gap={6}
          padding={6}
          rounded={"20px"}
          w={"100%"}
          bg={"blue.600"}
          _hover={{
            bg: "blue.700",
          }}
          cursor={"pointer"}
          onClick={() => {
            window.location.href = "/dashboard/users";
          }}
        >
          <Image src={"/profile.svg"} width={30} height={30} alt="image" />

          <Text fontSize={"x-large"} color={"white"} fontWeight={"bold"}>
            Users
          </Text>
          <Text fontSize={"large"} fontWeight={"semibold"} color={"white"}>
            {isLoading ? <Spinner /> : data?.length}
          </Text>
        </Flex>

        <Flex
          flexDir={"column"}
          gap={6}
          padding={6}
          rounded={"20px"}
          w={"100%"}
          bg={"blue.600"}
          _hover={{
            bg: "blue.700",
          }}
          cursor={"pointer"}
          onClick={() => {
            window.location.href = "/dashboard/shop-orders";
          }}
        >
          <Image src={"/orders.svg"} width={30} height={30} alt="image" />

          <Text fontSize={"x-large"} color={"white"} fontWeight={"bold"}>
            Shop Orders
          </Text>
          <Text fontSize={"large"} fontWeight={"semibold"} color={"white"}>
            {shopLoading ? <Spinner /> : shopOrders?.length}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Page;
