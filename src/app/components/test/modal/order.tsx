import { updateOrder } from "@/app/actions/book";
import { addReview, getWorkerReviews } from "@/app/actions/review";
import { getUser, getUserInfo } from "@/app/actions/user";
import {
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

function VerticallyCenter({ order, setNull }: any) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: reviews } = useQuery({
    queryKey: ["reviews", order?.worker],
    queryFn: async () => getWorkerReviews(order.worker),
  });
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const { data: worker, isLoading } = useQuery({
    queryKey: ["worker", order?.worker],
    queryFn: async () => getUserInfo(order.worker),
  });

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

  const { mutate: pay } = useMutation({
    mutationFn: async () => {
      const resposne = await fetch(`/api/checkout?orderId=${order._id}`);
      const res = await resposne.json();
      console.log({ res });
      router.push(res.session.url);
    },
  });

  const toast = useToast();
  const { mutate: addReviw, isPending: isAdding } = useMutation({
    mutationFn: async (videoName: string) => {
      const res = await addReview({
        image: order.image,
        service: order.service,
        worker: order.worker,
        user: order.email,
        rating,
        videoName,
        review,
      });
      console.log({ res });
      return res;
    },
    onSuccess: () => {
      toast({
        title: "Review added",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  console.log({ worker, isLoading });
  if (!order) return <></>;
  const onSubmit = async (e: any) => {
    e.preventDefault();
    // size limit
    if (e.target.file?.files?.[0]?.size > 1024 * 1024 * 8) {
      toast({
        title: "Image size should be less than 8MB",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    let videoName = "";
    if (e.target.file?.files?.length) {
      const formData = new FormData();
      formData.append("file", e.target.file.files[0]);
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const imageName = data.name;
      videoName = imageName;
    }
    addReviw(videoName);
  };
  return (
    <>
      <Modal size={"xl"} onClose={setNull} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {worker.image && (
                  <img
                    src={`/api/get-image/${worker.image}`}
                    alt=""
                    width={200}
                    height={200}
                    style={{
                      margin: "auto",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Text fontWeight={"bold"} fontSize={"large"} marginY={4}>
                  Worker Name: {worker.name}
                </Text>
              </>
            )}
            <Flex
              background={"gray.100"}
              padding={2}
              borderRadius={4}
              gap={2}
              flexDir={"column"}
            >
              <Text fontSize={"large"} fontWeight={"bold"}>
                Basic Information
              </Text>
              <Text>Order Name: {order.name}</Text>
              <Text>Order Status: {order.status}</Text>
              <Text>Order Phone: {order.phone}</Text>
              <Text>Order Date: {order.dateTime.split("T")[0]}</Text>
              <Text>Order Time: {order.dateTime.split("T")[1]}</Text>
            </Flex>
            <Flex
              background={"gray.100"}
              padding={2}
              borderRadius={4}
              gap={2}
              flexDir={"column"}
              marginY={2}
            >
              <Text fontSize={"large"} fontWeight={"bold"}>
                Additional Details
              </Text>
              <p>Order Worker: {order.worker}</p>
              <p>Order Service: {order.service}</p>
              <p>Order Extra: {order.extra}</p>
              <p>Order Paid: {order.paid ? "PAID" : "NOT PAID"}</p>
            </Flex>
            {order.paid ? (
              <></>
            ) : (
              <Button
                // onClick={() =>
                //   router.push(`https://buy.stripe.com/test_aEU4hR0vAg8UgxydQQ`)
                // }
                onClick={() => pay()}
                marginTop={2}
                w={"100%"}
                colorScheme={"blue"}
              >
                Pay
              </Button>
            )}
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
            <Divider marginTop={2} />
            {order.status === "completed" && (
              <form onSubmit={onSubmit}>
                <Flex flexDir={"column"} gap={2}>
                  <Text fontSize={"large"} fontWeight={"bold"}>
                    Add a review
                  </Text>
                  <Textarea
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    placeholder="Enter review"
                    marginTop={2}
                    w={"100%"}
                  />
                  <Select
                    value={rating}
                    onChange={e => setRating(parseInt(e.target.value))}
                  >
                    <option value={1}>1 star</option>
                    <option value={2}>2 stars</option>
                    <option value={3}>3 stars</option>
                    <option value={4}>4 stars</option>
                    <option value={5}>5 stars</option>
                  </Select>
                  <br />
                  <Text>Add attachment</Text>
                  <Input
                    width={500}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={e => setImage(e.target.value)}
                  />
                  <Button isLoading={isAdding} type="submit">
                    Submit review
                  </Button>
                </Flex>
              </form>
            )}

            <Flex gap={2} flexDir={"column"} marginTop={2}>
              <Text fontSize={"large"} fontWeight={"bold"}>
                Reviews
              </Text>
              {reviews?.map((review: any) => (
                <Flex
                  key={review._id}
                  background={"gray.100"}
                  padding={2}
                  borderRadius={4}
                  gap={2}
                  flexDir={"column"}
                  marginY={2}
                >
                  <Text fontSize={"large"} fontWeight={"bold"}>
                    {review.user}
                  </Text>
                  <Text>{review.review}</Text>
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

export default VerticallyCenter;
