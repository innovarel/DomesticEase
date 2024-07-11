"use client";
import { getAllOrders } from "@/app/actions/book";
import VerticallyCenter from "@/app/components/test/modal/order";
import WorkModal from "@/app/components/test/modal/work";
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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => getAllOrders(),
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

  return (
    <Flex
      flexDir={"column"}
      gap={8}
      maxHeight={"95vh"}
      overflowY={"scroll"}
      w={"100%"}
    >
      <Text
        fontWeight={"bold"}
        fontSize={"xx-large"}
        paddingX={8}
        paddingTop={8}
      >
        Orders
      </Text>
      <Flex w={"100%"} gap={4} paddingX={4}>
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
      <>
        <WorkModal order={selectedOrder} setNull={setOrderNull} />
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
            {isLoading && <Spinner />}
            {data?.map((order: any) => (
              <Tr
                cursor={"pointer"}
                key={order.id}
                onClick={() => setSelectedOrder(order)}
              >
                <Td>{order.name}</Td>
                <Td>{order.address}</Td>
                <Td>{order.city}</Td>
                <Td>{order.paid ? "Paid" : "Not Paid"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    </Flex>
  );
};
export default Page;
