"use client";
import {
  Button,
  Container,
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
import { getOrders, getSerivcesOrders } from "../actions/book";
import { useState } from "react";
import VerticallyCenter from "../components/test/modal/order";
import WorkModal from "../components/test/modal/work";

const Page = () => {
  const { user } = useUser();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user],
    queryFn: async () => getSerivcesOrders(user),
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

  const setOrderNull = () => setSelectedOrder(null);

  return (
    <>
      <WorkModal order={selectedOrder} setNull={setOrderNull} />
      <Flex flexDir={"column"} w={"100%"} paddingX={8} marginY={10}>
        <Text fontSize={"xx-large"} fontWeight={"800"}>
          My service Orders
        </Text>
        <Flex w={"100%"} gap={4}>
          <Button
            background={filter === "all" ? "green.300" : "gray.200"}
            w={"100%"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            background={filter === "paid" ? "green.300" : "gray.200"}
            w={"100%"}
            onClick={() => setFilter("paid")}
          >
            Paid
          </Button>
          <Button
            background={filter === "not-paid" ? "green.300" : "gray.200"}
            w={"100%"}
            onClick={() => setFilter("not-paid")}
          >
            Not Paid
          </Button>
          <Button
            w={"100%"}
            onClick={() => setFilter("pending")}
            background={filter === "pending" ? "green.300" : "gray.200"}
          >
            Pending
          </Button>
          <Button
            w={"100%"}
            onClick={() => setFilter("completed")}
            background={filter === "completed" ? "green.300" : "gray.200"}
          >
            Completed
          </Button>
        </Flex>
        <Flex flexDirection={"column"} gap={2} width={"100%"} marginY={10}>
          <Table variant="simple" size="md" width="full">
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>ADDRESS</Th>
                <Th>CITY</Th>
                <Th>DATE</Th>
                <Th>TIME</Th>
                <Th>PAYMENT STATUS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading && <Spinner />}
              {data?.map((order: any) => (
                <Tr
                  cursor={"pointer"}
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  _hover={{ bg: "gray.100" }}
                >
                  <Td>{order.name}</Td>
                  <Td>{order.address}</Td>
                  <Td>{order.city}</Td>
                  <Td>{order.date}</Td>
                  <Td>{order.dateTime?.split("T")?.[1] ?? ""}</Td>
                  <Td>{order.paid ? "Paid" : "Not Paid"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
};
export default Page;
