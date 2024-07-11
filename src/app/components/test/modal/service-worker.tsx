import { updateOrder } from "@/app/actions/book";
import {
  deleteUser,
  getUser,
  getUserInfo,
  updateUser,
} from "@/app/actions/user";
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
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// {
//     "_id": "6617c1acefdc33aae3b4c907",
//     "name": "Basit saeed"
//     "email": "basitsaeed1@gmail.com",
//     "password": "123123",
//     "phone": "03167452933",
//     "address": "MT FSD 1",
//     "city": "Lahore",
//     "state": "Punjab",
//     "zip": "18000",
//     "service": "home_cleaning",
//     "image": "b550cc48-cc1f-4baf-b7ff-625a8b4e1668",
//     "type": "service",
//     "approved": true,
// }

function WorkerModal({ worker, setNull }: any) {
  const router = useRouter();
  const queryClient = useQueryClient();

  //   const { mutate: update, isPending } = useMutation({
  //     mutationFn: async (status: any) => {
  //       console.log({ order });
  //       const res = await updateOrder(
  //         {
  //           worker: order.worker,
  //           dateTime: order.dateTime,
  //         },
  //         status
  //       );
  //       queryClient.invalidateQueries({
  //         queryKey: ["orders", "worker"],
  //       });
  //       router.refresh();
  //       return res;
  //     },
  //   });
  const toast = useToast();
  const { mutate: deleteUsr, isPending } = useMutation({
    mutationFn: async () => {
      const res = await deleteUser(worker.email);

      return res;
    },
    onSuccess: () => {
      toast({
        title: "User Deleted",
        description: "User has been deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/dashboard/service-workers");
    },
  });

  const { mutate: update, isPaused: isLoading } = useMutation({
    mutationFn: async () => {
      const res = await updateUser(worker.email, {
        approved: !worker.approved,
      });

      return res;
    },
    onSuccess: () => {
      toast({
        title: worker.approved ? "User Disapproved" : "User Approved",
        description: worker.approved
          ? "User has been disapproved"
          : "User has been approved",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/dashboard/service-workers");
    },
  });

  if (!worker) return <></>;

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
                Worker Information
              </Text>
              <Image
                alt="123"
                src={`/api/get-image/${worker.image}`}
                width={200}
                height={200}
                style={{
                  borderRadius: 4,

                  maxWidth: "200px",
                  maxHeight: "200px",
                }}
              />
              <Text>Worker Name: {worker.name}</Text>
              <Text>Worker Email: {worker.email}</Text>
              <Text>Worker Phone: {worker.phone}</Text>
              <Text>Worker Address: {worker.address}</Text>
              <Text>Worker City: {worker.city}</Text>
              <Text>Worker State: {worker.state}</Text>
              <Text>Worker Zip: {worker.zip}</Text>
              <Text>Worker Service: {worker.service}</Text>
              <Text>Worker Type: {worker.type}</Text>
              <Text>Worker Approved: {worker.approved ? "YES" : "NO"}</Text>
            </Flex>
            <Flex marginY={2} gap={2}>
              <Button
                colorScheme="red"
                w={"100%"}
                onClick={() => {
                  deleteUsr();
                }}
                isLoading={isPending}
              >
                Delete Service Worker
              </Button>
              {worker.approved ? (
                <Button
                  colorScheme="facebook"
                  w={"100%"}
                  onClick={() => update()}
                  isLoading={isLoading}
                >
                  Disapprove
                </Button>
              ) : (
                <Button
                  onClick={() => update()}
                  isLoading={isLoading}
                  colorScheme="green"
                  w={"100%"}
                >
                  Approve
                </Button>
              )}
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

export default WorkerModal;
