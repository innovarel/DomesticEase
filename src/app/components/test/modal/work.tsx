import { updateOrder } from "@/app/actions/book";
import { getUser, getUserInfo } from "@/app/actions/user";
import {
  Button,
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
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// name
// "sdf"
// phone
// "234"
// address
// "sdf"
// city
// "sdf"
// service
// "home_cleaning"
// email
// "basitsaeed1@gmail.com"
// image
// ""
// worker
// "basitsaeed1@gmail.com" dateTime "2024-04-12T17:47"
// extra ""
// location Object
// paid false

function WorkModal({ order, setNull }: any) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: async (status: any) => {
      console.log({ order });
      const res = await updateOrder(
        {
          worker: order.worker,
          dateTime: order.dateTime,
        },
        status
      );
      queryClient.invalidateQueries({
        queryKey: ["orders", "worker"],
      });
      router.refresh();
      return res;
    },
  });

  if (!order) return <></>;

  return (
    <>
      <Modal onClose={setNull} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
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
                Order Information
              </Text>
              <Text>Order Name: {order.name}</Text>
              <Text>Order Status: {order.status}</Text>
              <Text>Order Phone: {order.phone}</Text>
              <Text>Order Date: {order.dateTime.split("T")[0]}</Text>
              <Text>Order Time: {order.dateTime.split("T")[1]}</Text>
              <Text>Order Worker: {order.worker}</Text>
              <Text>Order Service: {order.service}</Text>
              <Text>Order Extra: {order.extra}</Text>
            </Flex>
            {/* <p>Order Location: {order.location}</p> */}
            <Text marginY={2} marginX={"auto"}>
              Order Paid: {order.paid ? "PAID" : "NOT PAID"}
            </Text>
            {order.image ? (
              <>
                <Text fontWeight={"bold"} fontSize={"medium"}>
                  VIDEO
                </Text>
                <video
                  src={`/api/get-image/${order.image}`}
                  controls
                  width="200px"
                  height="200px"
                />
              </>
            ) : (
              <p>No video</p>
            )}

            <Button
              width={"100%"}
              marginY={3}
              colorScheme="blue"
              onClick={() => window.open(`/location/${order._id}`, "_blank")}
            >
              View location
            </Button>

            {order.status === "pending" && (
              <Flex gap={2}>
                <Button
                  onClick={() => update("completed")}
                  isLoading={isPending}
                  marginTop={1}
                  w={"100%"}
                  colorScheme={"teal"}
                >
                  Complete
                </Button>
                <Button
                  onClick={() => update("cancelled")}
                  isLoading={isPending}
                  marginTop={1}
                  w={"100%"}
                  colorScheme={"red"}
                >
                  Cancel
                </Button>
              </Flex>
            )}
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

export default WorkModal;
