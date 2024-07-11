import { updateOrder } from "@/app/actions/book";
import {
  deleteUser,
  getUser,
  getUserInfo,
  updateUser,
} from "@/app/actions/user";
import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function ShopOrder({ data, setNull }: any) {
  if (!data) return <></>;
  console.log({ data });
  const worker = data.billingAddress;
  return (
    <>
      <Modal onClose={setNull} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              background={"gray.100"}
              padding={2}
              borderRadius={4}
              gap={2}
              flexDir={"column"}
            >
              <Text fontSize={"large"} fontWeight={"bold"}>
                Address Information
              </Text>

              <Text>Name: {worker.fullName}</Text>
              <Text>Address: {worker.fullAddress}</Text>
              <Text>City: {worker.city}</Text>
              <Text>Country: {worker.country}</Text>
              <Text>Postal Code: {worker.postalCode}</Text>
              <Text>Province: {worker.province}</Text>
              <Text>Phone: {worker.phone}</Text>
            </Flex>
            <Flex
              background={"gray.100"}
              padding={2}
              borderRadius={4}
              gap={2}
              flexDir={"column"}
            >
              <Text fontSize={"large"} fontWeight={"bold"}>
                Items
              </Text>

              {data.items.map((item: any) => (
                <Flex
                  key={item.id}
                  padding={2}
                  borderRadius={4}
                  flexDir={"column"}
                  background={"gray.200"}
                >
                  <Text>Name: {item.name}</Text>
                  <Text>Price: {item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Total Price: {item.totalPrice}</Text>
                </Flex>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button w={"100%"} onClick={setNull}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShopOrder;
