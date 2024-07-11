"use client";
import {
  Button,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useUser } from "../contexts/user";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../actions/book";
import { useState } from "react";
import VerticallyCenter from "../components/test/modal/order";

const Page = () => {
  const { user } = useUser();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => getOrders(user),
  });
  const [filter, setFilter] = useState("all");
  const data =
    filter === "all"
      ? orders
      : orders?.filter((order: any) => {
          if (filter === "paid") {
            return order.paid;
          } else if (filter === "not-paid") {
            return !order.paid;
          } else if (filter === "pending") {
            return order.status === "pending";
          } else if (filter === "completed") {
            return order.status === "completed";
          }
        });
  const setOrderNull = () => setSelectedOrder(null);

  if (!user) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        <Text
          fontSize={{ base: "lg", md: "xx-large" }}
          fontWeight={"800"}
          textAlign={"center"}
          marginX={4}
        >
          Only logged in users can view this page
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <VerticallyCenter order={selectedOrder} setNull={setOrderNull} />
      <Flex flexDir={"column"} w={"100%"} paddingX={{ base: 4, md: 8 }} marginY={10}>
        <Text fontSize={{ base: "xl", md: "xx-large" }} fontWeight={"800"} textAlign={{ base: "center", md: "left" }}>
          Orders
        </Text>
        <Flex w={"100%"} gap={{ base: 2, md: 4 }} flexWrap={"wrap"} marginY={4}>
          <Button
            background={filter === "all" ? "green.300" : "gray.200"}
            flex={1}
            onClick={() => setFilter("all")}
            _hover={{ background: "green.300" }}
          >
            All
          </Button>
          <Button
            background={filter === "paid" ? "green.300" : "gray.200"}
            flex={1}
            onClick={() => setFilter("paid")}
            _hover={{ background: "green.300" }}
          >
            Paid
          </Button>
          <Button
            background={filter === "not-paid" ? "green.300" : "gray.200"}
            flex={1}
            onClick={() => setFilter("not-paid")}
            _hover={{ background: "green.300" }}
          >
            Not Paid
          </Button>
          <Button
            flex={1}
            onClick={() => setFilter("pending")}
            background={filter === "pending" ? "green.300" : "gray.200"}
            _hover={{ background: "green.300" }}
          >
            Pending
          </Button>
          <Button
            flex={1}
            onClick={() => setFilter("completed")}
            background={filter === "completed" ? "green.300" : "gray.200"}
            _hover={{ background: "green.300" }}
          >
            Completed
          </Button>
        </Flex>
        <Flex flexDirection={"column"} gap={2} width={"100%"} marginY={10} overflowX={"auto"}>
          <Table variant="simple" size="md" width="full">
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>ADDRESS</Th>
                <Th>CITY</Th>
                <Th>PAYMENT STATUS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={4}>
                    <Spinner size="xl" />
                  </Td>
                </Tr>
              ) : (
                data?.map((order: any) => (
                  <Tr
                    cursor={"pointer"}
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    _hover={{ bg: "gray.100" }}
                  >
                    <Td>{order.name}</Td>
                    <Td>{order.address}</Td>
                    <Td>{order.city}</Td>
                    <Td>{order.paid ? "Paid" : "Not Paid"}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
};
export default Page;
