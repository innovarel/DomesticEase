import { updateOrder } from "@/app/actions/book";
import { createShopItem } from "@/app/actions/items";
import { getUser, getUserInfo } from "@/app/actions/user";
import {
  Button,
  Flex,
  Input,
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
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function AddItem({ show, setNull }: any) {
  const toast = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { mutate: update, isPending } = useMutation({
    mutationFn: async imageName => {
      await createShopItem({ name, description, price, imageName });
      toast({
        title: "Item added",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setNull();
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !description || !price || !image) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    // size limit
    if (e.target.file?.files?.[0]?.size > 1024 * 1024 * 8) {
      return;
    }
    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const imageName = data.name;
    await update(imageName);
  };
  return (
    <>
      <Modal onClose={setNull} isOpen={show} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction={"column"}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              marginY={10}
            >
              <Text fontSize={"x-large"} fontWeight={"bold"}>
                Add item to shop
              </Text>
              <form className=" max-w-96" onSubmit={handleSubmit}>
                <Flex
                  direction={"column"}
                  width={"100%"}
                  gap={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Input
                    width={500}
                    type="text"
                    placeholder="Name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                  <Input
                    width={500}
                    type="text"
                    placeholder="Description"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                  />
                  <Input
                    width={500}
                    type="text"
                    placeholder="Price"
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                  />
                  <Input
                    width={500}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={e => setImage(e.target.value)}
                  />
                  <Button
                    width={500}
                    colorScheme="teal"
                    type="submit"
                    isLoading={isPending}
                  >
                    Add item
                  </Button>
                </Flex>
              </form>
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

export default AddItem;
