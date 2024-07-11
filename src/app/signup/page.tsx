"use client";
import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/actions/user";

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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (password.length < 6 || !/\d/.test(password)) {
      setError("Password should be atleast 6 characters long and contain a number");
      setLoading(false);
      return;
    }

    if (!name || !email || !password || !phone || !address || !city || !state || !zip) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    if (e.target.file?.files?.[0]?.size > 1024 * 1024 * 8) {
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
      const response = await createUser({
        name,
        email,
        password,
        phone,
        address,
        city,
        state,
        zip,
        image: imageName,
      });
      if (response) {
        toast({
          title: "Account Created.",
          description: "You can now login with your credentials",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/signin");
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
        maxWidth={"800px"}
      >
        <div className="brand">
          <a href="/">
            <img src="/a_logo.png" alt="Logo" width="200px" />
          </a>
        </div>
        <Text fontSize={"x-large"} fontWeight={"bold"} color={"white"}>
          User Signup
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
              value={name}
              placeholder="Name"
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
              onChange={e => {
                if (e.target.value.length > 20) return;
                setPassword(e.target.value);
              }}
            />
            <Input
              bg={"gray.100"}
              width={"100%"}
              type="number"
              placeholder="Phone"
              value={phone}
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
            <Input
              bg={"gray.100"}
              width={"100%"}
              type="text"
              placeholder="City"
              onChange={e => setCity(e.target.value)}
            />
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
              onClick={() =>
                (window.location.href = "/signup/service-provider")
              }
            >
              Signup as Service Worker
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
export default Page;
