"use client";
import { getAllOrders } from "@/app/actions/book";
import { getAllServiceUsers, getAllUsers } from "@/app/actions/user";
import VerticallyCenter from "@/app/components/test/modal/order";
import WorkerModal from "@/app/components/test/modal/service-worker";
import WorkModal from "@/app/components/test/modal/work";
import {
  Container,
  Flex,
  Input,
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
  const { data, isLoading } = useQuery({
    queryKey: ["service-users"],
    queryFn: async () => getAllServiceUsers(),
  });
  const setOrderNull = () => setSelectedOrder(null);

  console.log(data);
  return (
    <Flex
      flexDir={"column"}
      gap={8}
      maxHeight={"95vh"}
      overflowY={"scroll"}
      w={"100%"}
    >
      <Text fontWeight={"bold"} fontSize={"xx-large"} p={8}>
        Service Workers List
      </Text>
      <Input placeholder="Search" marginX={4} bg={"white"} />

      <>
        <WorkerModal worker={selectedOrder} setNull={setOrderNull} />
        <Table variant="simple" size="md" width="full">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>ADDRESS</Th>
              <Th>CITY</Th>
              <Th>SERVICE TYPE</Th>
              <Th>APPROVED</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && <Spinner />}
            {data?.map((order: any) => (
              <Tr
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                _hover={{ bg: "teal.100" }}
                cursor="pointer"
              >
                <Td>{order.name}</Td>
                <Td>{order.address}</Td>
                <Td>{order.city}</Td>
                <Td>{order.service}</Td>
                <Td>{order.approved ? "YES" : "NO"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    </Flex>
  );
};
export default Page;
