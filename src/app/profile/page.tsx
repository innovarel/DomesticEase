"use client";
import { useUser } from "../contexts/user";
import { getUserInfo, updateUser } from "../actions/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Flex,
  Input,
  Select,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { serviceOptions } from "../actions/constants";
import Image from "next/image";

const Page = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [service, setService] = useState(serviceOptions[0].value);
  const toast = useToast();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { data: userdetails, isLoading } = useQuery({
    queryKey: ["userdetails", user],
    queryFn: async () => {
      const data = await getUserInfo(user);
      setEmail(data.email);
      setPassword(data.password);
      setName(data.name);
      setPhone(data.phone);
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setZip(data.zip);
      setService(data.service);

      return data;
    },
  });
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      let image = null;
      if (e.target.file.files[0]) {
        if (e.target.file.files[0].size > 1024 * 1024 * 8) {
          toast({
            title: "Image size should be less than 8MB",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          return;
        }
        const formData = new FormData();
        formData.append("file", e.target.file.files[0]);
        const res = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        image = data.name;
      }
      if (userdetails.type === "service") {
        await updateUser(email, {
          name,
          phone,
          address,
          city,
          state,
          zip,
          password,
          service,
          image: image ? image : userdetails.image,
        });
      } else {
        await updateUser(email, {
          password,
          image: image ? image : userdetails.image,
          name,
          phone,
          address,
          city,
          state,
          zip,
        });
      }
      toast({
        title: "Account updated.",
        description: "Your account has been updated successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/profile");
    } catch (e: any) {}

    setUpdateLoading(false);
  };

  if (isLoading)
    return (
      <Flex gap={2} width={"100%"} marginY={10} justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    );

  if (userdetails.type === "service") {
    return (
      <Flex
        direction={"column"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        marginY={10}
      >
        <Text fontSize={"x-large"} fontWeight={"bold"} textAlign="center">
          Update Service Provider Information
        </Text>
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", width: "100%" }}>
          <Image
            src={`/api/get-image/${userdetails.image}`}
            width={200}
            height={200}
            alt="image"
            style={{
              margin: "auto",
              border: "1px solid rgba(200,200,200,0.5)",
              maxHeight: "200px",
              maxWidth: "200px",
              objectFit: "cover",
              borderRadius: "10%",
            }}
          />
          <Flex
            paddingTop={2}
            gap={2}
            direction={"column"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Input
              width={"100%"}
              type="text"
              value={name}
              placeholder="Name"
              onChange={e => {
                if (e.target.value.length > 20) return;
                if (e.target.value.match(/[^a-zA-Z\s]/g)) return;
                setName(e.target.value);
              }}
            />
            <Input
              width={"100%"}
              disabled
              value={email}
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              width={"100%"}
              type="password"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              width={"100%"}
              type="number"
              value={phone}
              placeholder="Phone"
              onChange={e => {
                if (e.target.value.length > 12) return;
                if (e.target.value.match(/[^0-9]/g)) return;
                setPhone(e.target.value);
              }}
            />
            <Input
              width={"100%"}
              type="text"
              value={address}
              placeholder="Address"
              onChange={e => setAddress(e.target.value)}
            />
            <Input
              width={"100%"}
              type="text"
              value={city}
              placeholder="City"
              onChange={e => setCity(e.target.value)}
            />
            <Flex
              gap={2}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Input
                width={"100%"}
                type="text"
                value={state}
                placeholder="State"
                onChange={e => setState(e.target.value)}
              />
              <Input
                width={"100%"}
                type="text"
                value={zip}
                placeholder="Postal code"
                onChange={e => {
                  if (e.target.value.length > 6) return;
                  if (e.target.value.match(/[^0-9]/g)) return;
                  setZip(e.target.value);
                }}
              />
            </Flex>
            <Select
              value={service}
              onChange={e => setService(e.target.value)}
              width={"100%"}
              placeholder="Select service"
            >
              {serviceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Text fontSize={"large"}>Update Image</Text>
            <Input
              width={"100%"}
              type="file"
              name="file"
              accept="image/*"
              placeholder="Image"
              onChange={e => setImage(e.target.value)}
            />
            <Button
              width={"100%"}
              colorScheme="teal"
              type="submit"
              isLoading={updateLoading}
            >
              Update Account
            </Button>
            <Button
              width={"100%"}
              colorScheme="red"
              type="button"
              onClick={() => router.push("/user")}
            >
              Back
            </Button>
          </Flex>
        </form>
      </Flex>
    );
  } else {
    return (
      <Flex
        direction={"column"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        marginY={10}
      >
        <Text fontSize={"x-large"} fontWeight={"bold"} textAlign="center">
          Update User Information
        </Text>
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", width: "100%" }}>
          <Flex
            direction={"column"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
          >
            <Input
              width={"100%"}
              type="text"
              value={name}
              placeholder="Name"
              onChange={e => {
                if (e.target.value.length > 20) return;
                if (e.target.value.match(/[^a-zA-Z\s]/g)) return;
                setName(e.target.value);
              }}
            />
            <Input
              width={"100%"}
              type="email"
              disabled
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              width={"100%"}
              type="password"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              width={"100%"}
              type="number"
              value={phone}
              placeholder="Phone"
              onChange={e => {
                if (e.target.value.length > 12) return;
                setPhone(e.target.value);
              }}
            />
            <Input
              width={"100%"}
              type="text"
              value={address}
              placeholder="Address"
              onChange={e => setAddress(e.target.value)}
            />
            <Input
              width={"100%"}
              type="text"
              value={city}
              placeholder="City"
              onChange={e => setCity(e.target.value)}
            />
            <Input
              width={"100%"}
              type="text"
              value={zip}
              placeholder="Postal code"
              onChange={e => {
                if (e.target.value.length > 6) return;
                if (e.target.value.match(/[^0-9]/g)) return;
                setZip(e.target.value);
              }}
            />
            <Text fontSize={"large"}>Update Image</Text>
            <Input
              width={"100%"}
              type="file"
              name="file"
              accept="image/*"
              placeholder="Image"
              onChange={e => setImage(e.target.value)}
            />
            <Button
              width={"100%"}
              colorScheme="teal"
              type="submit"
              isLoading={updateLoading}
            >
              Update Account
            </Button>
          </Flex>
        </form>
      </Flex>
    );
  }
};

export default Page;
