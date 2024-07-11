"use client";
import { getAllOrders } from "@/app/actions/book";
import { deleteUser, getAllUsers } from "@/app/actions/user";
import VerticallyCenter from "@/app/components/test/modal/order";
import WorkModal from "@/app/components/test/modal/work";
import {
  Button,
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
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AddItem from "./add-item";
import { deleteItem, getAllItems } from "@/app/actions/items";

const Page = () => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["items-admin"],
    queryFn: async () => getAllItems(),
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
  const setShowNull = () => setShow(false);
  const toast = useToast();
  return (
    <Flex
      flexDir={"column"}
      gap={8}
      maxHeight={"95vh"}
      overflowY={"scroll"}
      w={"100%"}
    >
      <AddItem show={show} setNull={setShowNull} />
      <Text fontWeight={"bold"} fontSize={"xx-large"} px={8} pt={8} pb={0}>
        Shop items list
      </Text>
      <Flex w={"100%"} gap={4} paddingX={4}>
        <Input placeholder="Search" />
        <Button
          colorScheme="blue"
          w={"200px"}
          onClick={() => {
            setShow(true);
          }}
        >
          Add Item
        </Button>
      </Flex>
      <>
        <Table variant="simple" size="md" width="full">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>DESCRIPTION</Th>
              <Th>PRICE</Th>
              <Th>IMAGE</Th>
              <Th>ACTION</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && <Spinner />}
            {data?.map((order: any) => (
              <Tr key={order._id}>
                <Td>{order.name ?? "Empty"}</Td>
                <Td>{order.description ?? "Empty"}</Td>
                <Td>{order.price ?? "Empty"}</Td>
                <Td>
                  <img
                    src={`/api/get-image/${order.imageName}`}
                    alt=""
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      width: "50px",
                      height: "50px",
                      maxWidth: "50px",
                    }}
                  />
                </Td>

                <Td>
                  <Button
                    isLoading={load}
                    onClick={async () => {
                      setLoad(true);
                      await deleteItem(order._id);
                      setLoad(false);
                      toast({
                        title: "Item deleted, please refresh the page",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
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
