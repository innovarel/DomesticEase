"use client";
import { getAllContactInquiries } from "@/app/actions/contact";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data: contacts, isLoading } = useQuery({
    queryKey: ["inquiries-admin"],
    queryFn: async () => getAllContactInquiries(),
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
        Contact Inquiries List
      </Text>
      {isLoading && <Spinner />}
      {contacts?.map((contactr: any) => (
        <Flex
          key={contactr._id}
          marginX={4}
          background={"gray.100"}
          padding={2}
          borderRadius={4}
          gap={2}
          flexDir={"column"}
          marginY={2}
        >
          <Text fontSize={"large"} fontWeight={"bold"}>
            Email: {contactr.email}
          </Text>
          <Flex gap={4}>
            <Text fontSize={"large"}>Name: {contactr.name}</Text>
            <Text fontSize={"large"}>|</Text>
            <Text fontSize={"large"}>Subject: {contactr.subject}</Text>
          </Flex>
          <Text>Message: {contactr.message}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Page;
