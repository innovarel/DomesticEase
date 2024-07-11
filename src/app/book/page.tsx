"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  Button,
  Flex,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createOrder, findService } from "../actions/book";
import Popup from "../components/test/modal";
import { useUser } from "../contexts/user";
import { serviceOptions } from "../actions/constants";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../actions/user";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2luZXBpbmV6IiwiYSI6ImNsdXZlYzNoOTAyaHAybG55bGw2ZDJ1OTgifQ.58CX4i5rlZ3uYYPTr_cqWQ";

const stepsText = [
  "Enter your address",
  "Enter your information and select a date",
  "Select a service",
];

const MapboxMap = () => {
  const { user } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["user", user],
    queryFn: () => getUserInfo(user),
  });

  const [step, setStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState("");

  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null); // Updated type
  const prevMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    console.log(location);
    addMarker([location.lng, location.lat]);
  };

  const [popupText, setPopupText] = useState(
    "No worker available for this service"
  );

  const addMarker = (lngLat: [number, number]) => {
    if (!map) return;

    // Remove the previous marker, if exists
    if (prevMarkerRef.current) {
      prevMarkerRef.current.remove();
    }

    const newMarker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
    prevMarkerRef.current = newMarker;
    setMarker(newMarker);  // Update marker state
    map.resize();
  };

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainerRef }: any) => {
      // get current location
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        if (mapContainerRef.current) {  // Ensure the ref is not null
          const initializedMap = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [longitude, latitude],
            zoom: 9,
          });

          initializedMap.on("load", () => {
            setMap(initializedMap);
            initializedMap.resize();
          });

          setMap(initializedMap);
          initializedMap.resize();
        }
      },
      error => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true
      }
    );
  };


    if (!map) {
      initializeMap({ setMap, mapContainerRef });
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        addMarker([longitude, latitude]);

        map.flyTo({
          center: [longitude, latitude],
          zoom: 14,
        });
        map.on("click", (e: any) => {
          const { lng, lat } = e.lngLat;
          handleLocationSelect({ lng, lat });
          addMarker([lng, lat]);
        });
      },
      error => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }

    return () => {
      if (map) map.remove();
    };
  }, [map, isLoading]);

  const handleNext = () => {
    if (step === 2) {
      // submit form
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (step !== 2) return;

    if (!name || !phone || !dateTime) {
      setError("Please fill out all fields");
      return;
    }
    if (!service) {
      setError("Please select a service");
      return;
    }
    setLoading(true);

    if (e.target.file?.files?.[0]?.size > 1024 * 1024 * 8) {
      setError("Image size should be less than 8MB");
      setLoading(false);
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
    console.log(typeof dateTime, dateTime);
    const worker = await findService(service, dateTime.split("T")[0]);
    console.log({ worker });

    if (!worker.email) {
      setPopupText("No worker available for this service");
      onOpen();
      setLoading(false);
      return;
    }
    const res = await fetch("/api/new-order-mail", {
      method: "POST",
      body: JSON.stringify({ email: worker.email }),
    });
    const order = await createOrder({
      name,
      phone,
      address,
      city,
      service,
      email: user,
      image: videoName,
      date: dateTime.split("T")[0],
      worker: worker.email,
      dateTime,
      extra,
      location: selectedLocation,
      paid: false,
    });
    setLoading(false);
    console.log({ order });
    setPopupText("Request submitted successfully");
    onOpen();
    router.push("/");
  };
  const toast = useToast();

  const handleDateTimeChange = (e: any) => {
    const selectedDateTime = new Date(e.target.value);
    const currentDateTime = new Date();

    if (selectedDateTime >= currentDateTime) {
      setDateTime(e.target.value);
    } else {
      toast({
        title: "Invalid Date",
        description: "Please select a date in the future",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Flex
        direction={"column"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        marginY={10}
        paddingBottom={64}
      >
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (!user) {
    return (
      <Flex>
        <Text
          fontSize={"xx-large"}
          fontWeight={"800"}
          marginY={10}
          marginX={"auto"}
        >
          Only logged in users can view this page
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Popup isOpen={isOpen} onClose={onClose} text={popupText} />
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Flex
          gap={6}
          marginY={10}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          boxShadow="dark-lg"
          padding={8}
          borderRadius={8}
          maxW={600}
          width="100%"
          mx={4}
        >
          <Text fontSize={"x-large"} fontWeight={"bold"}>
            Step {step + 1}: {stepsText[step]}
          </Text>
          {step === 0 && (
            <Flex
              width={"100%"}
              gap={2}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Input
                width="100%"
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                width="100%"
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
               <link
                href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
                rel="stylesheet"
              />
              <div
                ref={mapContainerRef}
                className="map-container"
                style={{
                  width: "100%",
                  height: "400px",
                  position: "relative",
                  overflow: "hidden",
                }}
              />
            </Flex>
          )}
          {step === 1 && (
            <Flex
              width={"100%"}
              gap={2}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Input
                width="100%"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length > 20) {
                    return;
                  }
                  if (e.target.value.match(/[^a-zA-Z\s]/)) {
                    return;
                  }

                  setName(e.target.value);
                }}
              />
              <Input
                width="100%"
                type="number"
                placeholder="Phone"
                maxLength={12}
                value={phone}
                onChange={(e) => {
                  if (e.target.value.length > 12) {
                    return;
                  }
                  if (e.target.value.match(/[^0-9]/)) {
                    return;
                  }
                  setPhone(e.target.value);
                }}
              />
              <Input
                width="100%"
                value={dateTime}
                type="datetime-local"
                placeholder="Date and Time"
                onChange={handleDateTimeChange}
              />
            </Flex>
          )}
          {step === 2 && (
            <Flex
              width={"100%"}
              gap={2}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Select
                value={service}
                onChange={(e) => setService(e.target.value)}
                width="100%"
                placeholder="Select service"
              >
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <Textarea
                width="100%"
                placeholder="Extra information"
                onChange={(e) => setExtra(e.target.value)}
              />
              <Input
                width="100%"
                type="file"
                name="file"
                accept="video/*"
                onChange={(e) => setImage(e.target.value)}
              />
            </Flex>
          )}
          <Text color="red">{error}</Text>

          {step === 2 && (
            <Button
              isLoading={loading}
              type="submit"
              width="100%"
              colorScheme="green"
            >
              Submit request
            </Button>
          )}
          {step !== 2 && (
            <Button onClick={handleNext} width="100%" colorScheme="teal">
              Next
            </Button>
          )}
          {step !== 0 && (
            <Button onClick={handleBack} width="100%" colorScheme="teal">
              Back
            </Button>
          )}
        </Flex>
      </form>
    </>
  );
};


export default MapboxMap;
