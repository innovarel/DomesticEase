"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../actions/items";
import { Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";

const Page = () => {
  const [value, setValue] = useState("");
  const { data: itemsData, isLoading: isitemLoading } = useQuery({
    queryKey: ["items-admin"],
    queryFn: async () => getAllItems(),
  });

  const items =
    value === ""
      ? itemsData
      : itemsData?.filter((item: any) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );

  return (
    <div className="store">
      <div className="container">
        <div className="section-header">
          <h2>Shop items</h2>
        </div>
        <Flex paddingBottom={8} justifyContent="center">
          <Input
            value={value}
            type="text"
            placeholder="Search by name"
            onChange={(e) => setValue(e.target.value)}
            maxW="400px"
            w="100%"
          />
        </Flex>
        <div className="row">
          {isitemLoading && <Spinner />}
          {items?.length === 0 && <Text>no product available</Text>}
          <Flex
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start"
            gap="20px"
          >
            {items?.map((item: any) => (
              <div
                key={item.id}
                className="store-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "300px",
                }}
              >
                <img
                  src={`/api/get-image/${item.imageName}`}
                  alt="Service"
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                <p>{item.name}</p>
                <h5>{item.description}</h5>
                <h6> ₨ {item.price}</h6>
                <button
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    background: "#6666FF",
                    color: "white",
                    border: "none",
                    marginBottom: "10px",
                  }}
                  className="snipcart-add-item"
                  data-item-id={"20"}
                  data-item-price={"50.0"}
                  data-item-description={item.description}
                  data-item-image={`/api/get-image/${item.imageName}`}
                  data-item-name={item.name}
                  data-item-url={process.env.url}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Page;
