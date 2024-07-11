"use client";
import Image from "next/image";

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createUser } from "./actions/user";
import { useUser } from "./contexts/user";
import { useQuery } from "@tanstack/react-query";
import { getAllReviews } from "./actions/review";
import { getAllItems } from "./actions/items";

export default function Home() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews-admin"],
    queryFn: async () => getAllReviews(),
  });
  const { data: items, isLoading: isitemLoading } = useQuery({
    queryKey: ["items-admin"],
    queryFn: async () => getAllItems(),
  });
  console.log({ items });
  return (
    <>
      <div className="header home">
        <div className="container-fluid">
          <div className="hero row align-items-center">
            <div className="col-md-7">
              <h2>Best & Trusted</h2>
              <h2>
                <span>Home</span> Service
              </h2>
              <a className="btn" href="/book">
                Book Now
              </a>
            </div>
            <div className="col-md-5">
              <img
                src="/home.jpeg"
                alt="Service"
                style={{
                  margin: "auto",
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="about-img">
                <img src="/cover.avif" alt="Image" />
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="about-text">
                <h2>
                  {" "}
                  Providing Convenient and Efficient Services at your doorstep
                </h2>
                <p>
                  The main goal of Domestic Ease is to make peoples lives easier
                  and more convenient by bringing various services right to
                  their doorsteps. We understand that households often struggle
                  to find skilled service providers at convenient times. Our aim
                  is to address this issue by ensuring customer safety,
                  improving work quality, and Providing Convenient and Efficient
                  Services.
                </p>
                <a className="btn" href="/about">
                  Learn More
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service" id="s2">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-item">
                <img
                  src="/1.svg"
                  alt="Service"
                  style={{
                    margin: "auto",
                  }}
                />
                <h3>Electrician Service</h3>
                <a className="btn" href="/electrician">
                  Book Now
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-item">
                <img
                  src="/2.svg"
                  alt="Service"
                  style={{
                    margin: "auto",
                  }}
                />
                <h3>Plumbing Service</h3>

                <a className="btn" href="/plumber">
                  Book Now
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-item">
                <img
                  src="/3.svg"
                  alt="Service"
                  style={{
                    margin: "auto",
                  }}
                />
                <h3>Carpenter</h3>

                <a className="btn" href="/carpentry">
                  Book Now
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-item">
                <img
                  src="/4.png"
                  alt="Service"
                  style={{
                    margin: "auto",
                  }}
                />
                <h3>Pest Control</h3>

                <a className="btn" href="/pest_control">
                  Book Now
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-item">
                <img
                  src="/5.webp"
                  alt="Service"
                  style={{
                    margin: "auto",
                  }}
                />
                <h3>Home Cleaning</h3>

                <a className="btn" href="/homecleaning">
                  Book Now
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-item">
                <img
                  src="/6.png"
                  alt="Service"
                  style={{
                    margin: "auto",
                  }}
                />
                <h3>Car Services</h3>

                <a className="btn" href="/car_cleaning">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="store">
        <div className="container">
          <div className="section-header">
            <h2>Our Product</h2>
          </div>
          <div className="row">
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
 
      <div className="testimonial">
        <div className="container">
          <div className="section-header">
            <h2>Client Review</h2>
          </div>

          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {reviews?.map((review: any) => (
              <GridItem key={review.id}>
                <Box bg="white" rounded="lg" shadow="md" p={6} textAlign="left">
                  <VStack alignItems="start" spacing={4}>
                    <HStack spacing={4}>
                      <img
                        src={
                          review.image
                            ? `/api/get-image/${review.image}`
                            : "/user.png"
                        }
                        alt=""
                        style={{
                          margin: "auto",
                          objectFit: "contain",
                          borderRadius: "50%",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                      <VStack alignItems="start" spacing={1}>
                        <Text maxW={"200px"} fontWeight="semibold">
                          {review.user}
                        </Text>
                        <HStack spacing={1}>
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <StarIcon key={i} boxSize="5" />
                          ))}
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text color="gray.600">{review.review}</Text>
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
                  </VStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
