"use client";
import { getAllOrders } from "@/app/actions/book";
import { GetOrders } from "@/app/actions/orders";
import { getAllServiceUsers, getAllUsers } from "@/app/actions/user";
import VerticallyCenter from "@/app/components/test/modal/order";
import WorkerModal from "@/app/components/test/modal/service-worker";
import ShopOrder from "@/app/components/test/modal/shop-order";
import WorkModal from "@/app/components/test/modal/work";
import {
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
  const { data, isLoading } = useQuery({
    queryKey: ["shop-orders"],
    queryFn: async () => GetOrders(),
  });
  const setOrderNull = () => setSelectedOrder(null);
  console.log({ selectedOrder });
  return (
    <Flex
      flexDir={"column"}
      gap={8}
      maxHeight={"95vh"}
      overflowY={"scroll"}
      w={"100%"}
    >
      <Text fontWeight={"bold"} fontSize={"xx-large"} p={8}>
        Shop Orders
      </Text>
      <>
        <ShopOrder data={selectedOrder} setNull={setOrderNull} />
        <Table variant="simple" size="md" width="full">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>EMAIL</Th>
              <Th>TOTAL PRICE</Th>
              <Th>CITY</Th>
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
                <Td>{order.billingAddressName}</Td>
                <Td>{order.email}</Td>
                <Td>{order.grandTotal}</Td>
                <Td>{order.shippingAddressCity}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    </Flex>
  );
};
export default Page;
