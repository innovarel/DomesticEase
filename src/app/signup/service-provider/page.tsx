"use client";
import { serviceOptions } from "@/app/actions/constants";
import { createServiceUser } from "@/app/actions/user";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [image, setImage] = useState("");

  const [service, setService] = useState(serviceOptions[0].value);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (password.length < 6 || !/\d/.test(password)) {
      setError("Password should be atleast 6 characters long and contain a number");
      setLoading(false);
      return;
    }

    if (!email || !password || !phone || !address || !city || !state || !zip || !image) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    if (e.target.file.files[0].size > 1024 * 1024 * 8) {
      setError("Image size should be less than 8MB");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const imageName = data.name;

    try {
      const response = await createServiceUser({
        name,
        email,
        password,
        phone,
        address,
        city,
        state,
        zip,
        service,
        image: imageName,
      });
      if (response) {
        router.push("/pending-approval");
      } else {
        setError("Something went wrong");
      }
    } catch (e: any) {
      setError(e.message as string);
    }
  };

  return (
    <Flex
      direction={"column"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      marginY={10}
      paddingBottom={64}
    >
      <Flex
        background={"gray.800"}
        rounded={8}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={8}
        paddingX={8}
        paddingY={16}
        width={["90%", "80%", "70%", "60%", "40%"]}
        maxWidth={"500px"}
      >
        <div className="brand">
          <a href="/">
            <img src="/a_logo.png" alt="Logo" width="200px" />
          </a>
        </div>
        <Text fontSize={"x-large"} fontWeight={"bold"} color={"white"}>
          Service Provider Signup
        </Text>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Flex
            gap={2}
            direction={"column"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Input
              bg={"gray.100"}
              width={"100%"}
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => {
                if (e.target.value.length > 20) return;
                if (e.target.value.match(/[^a-zA-Z\s]/g)) return;
                setName(e.target.value);
              }}
            />
            <Input
              bg={"gray.100"}
              width={"100%"}
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              bg={"gray.100"}
              width={"100%"}
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              bg={"gray.100"}
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
              bg={"gray.100"}
              width={"100%"}
              type="text"
              placeholder="Address"
              onChange={e => setAddress(e.target.value)}
            />
            <Input
              bg={"gray.100"}
              width={"100%"}
              type="text"
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
                bg={"gray.100"}
                width={"100%"}
                type="text"
                placeholder="State"
                onChange={e => setState(e.target.value)}
              />
              <Input
                bg={"gray.100"}
                width={"100%"}
                type="text"
                placeholder="Postal code"
                value={zip}
                onChange={e => {
                  if (e.target.value.length > 6) return;
                  if (e.target.value.match(/[^0-9]/g)) return;
                  setZip(e.target.value);
                }}
              />
            </Flex>
            <Select
              value={service}
              bg={"gray.100"}
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
            <Input
              bg={"gray.100"}
              width={"100%"}
              type="file"
              name="file"
              accept="image/*"
              onChange={e => setImage(e.target.value)}
            />
            <Text color="red">{error}</Text>
            <Button
              width={"100%"}
              colorScheme="teal"
              type="submit"
              disabled={loading}
            >
              Create Account
            </Button>
            <Button
              width={"100%"}
              colorScheme="facebook"
              type="button"
              onClick={() => (window.location.href = "/signup")}
            >
              Signup as User
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
export default Page;
