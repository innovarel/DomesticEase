"use client";
import { getAllReviews, getReviewsWorker } from "@/app/actions/review";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useUser } from "../contexts/user";

const Page = () => {
  const { user } = useUser();
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews-mine"],
    queryFn: async () => getReviewsWorker(user),
  });

  console.log(reviews);
  return (
    <Flex
      flexDir={"column"}
      gap={8}
      w={"100%"}
      bg={"brown.100"}
      maxHeight={"95vh"}
      overflowY={"scroll"}
    >
      <Text fontWeight={"bold"} fontSize={"xx-large"} p={8}>
        Reviews List
      </Text>
      {isLoading && <Spinner />}
      {reviews?.map((review: any) => (
        <Flex
          key={review._id}
          marginX={4}
          background={"gray.100"}
          padding={2}
          borderRadius={4}
          gap={2}
          flexDir={"column"}
          marginY={2}
        >
          <img
            src={review.image ? `/api/get-image/${review.image}` : "/user.png"}
            alt=""
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
            }}
          />
          <Text fontSize={"large"} fontWeight={"bold"}>
            Reviwer: {review.user}
          </Text>
          {review?.rating && (
            <Flex fontSize={"large"} fontWeight={"bold"}>
              Rating:
              {Array.from(Array(review.rating), (_, i) => (
                <Image
                  key={i}
                  src={"/star.svg"}
                  width={30}
                  height={30}
                  alt="image"
                />
              ))}
            </Flex>
          )}
          <Flex gap={4}>
            <Text fontSize={"large"} fontWeight={"bold"}>
              Worker: {review.worker}
            </Text>
            <Text fontSize={"large"} fontWeight={"bold"}>
              |
            </Text>
            <Text fontSize={"large"} fontWeight={"bold"}>
              Type: {review.service}
            </Text>
          </Flex>
          <Text>Review: {review.review}</Text>
          <Text>Attachment:</Text>
          {review.videoName && (
            <Flex gap={2}>
              <img
                src={`/api/get-image/${review.videoName}`}
                alt=""
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "100px",
                  height: "100px",
                }}
              />
              <video
                src={`/api/get-image/${review.videoName}`}
                controls
                width="200px"
                height="200px"
              />
            </Flex>
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default Page;
