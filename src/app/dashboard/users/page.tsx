"use client";
import { getAllOrders } from "@/app/actions/book";
import { deleteUser, getAllUsers } from "@/app/actions/user";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["users-admin"],
    queryFn: async () => getAllUsers(),
  });

  const { mutate: deleteUsr } = useMutation({
    mutationFn: async (email: any) => {
      await deleteUser(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users-admin"],
      });
    },
  });

  return (
    <Flex
      flexDir={"column"}
      gap={8}
      maxHeight={"95vh"}
      overflowY={"scroll"}
      w={"100%"}
    >
      <Text fontWeight={"bold"} fontSize={"xx-large"} p={8}>
        Users list
      </Text>
      <>
        <Table variant="simple" size="md" width="full">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>ADDRESS</Th>
              <Th>CITY</Th>
              <Th>PHONE</Th>
              <Th>EMAIL</Th>
              <Th>ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && <Spinner />}
            {data?.map((order: any) => (
              <Tr key={order.id}>
                <Td>{order.name ?? "Empty"}</Td>
                <Td>{order.address ?? "Empty"}</Td>
                <Td>{order.city ?? "Empty"}</Td>
                <Td>{order.phone ?? "Empty"}</Td>
                <Td>{order.email}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      deleteUsr(order.email);
                    }}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    </Flex>
  );
};
export default Page;
