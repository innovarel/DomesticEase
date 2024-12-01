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
  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews-admin"],
    queryFn: async () => getAllReviews(),
  });
  const { data: items, isLoading: itemsLoading } = useQuery({
    queryKey: ["items-admin"],
    queryFn: async () => getAllItems(),
  });

  return (
    <>
      <div className="header home">
        <div className="container-fluid">
          <div className="hero row align-items-center">
            <div className="col-md-7">
              <h2>Book Fast, Convenient, and Affordable Oil Changes – Anytime, Anywhere!</h2>
              <h2>
                <span>Home</span> Service
              </h2>
              <Button as="a" href="/book" variant="solid" colorScheme="blue">
                Book Now
              </Button>
            </div>
            <div className="col-md-5">
              <Image
                src="/home.jpeg"
                alt="Service"
                layout="intrinsic"
                width={500}
                height={350}
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
                <Image src="/cover.avif" alt="Image" width={500} height={350} />
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="about-text">
                <h2>Providing Convenient and Efficient Services at Your Doorstep</h2>
                <p>
                  The main goal of Book Your Oil Change is to make people's lives easier
                  and more convenient by bringing various services right to
                  their doorsteps. We understand that households often struggle
                  to find skilled service providers at convenient times. Our aim
                  is to address this issue by ensuring customer safety,
                  improving work quality, and providing convenient services.
                </p>
                <Button as="a" href="/about" variant="outline" colorScheme="blue">
                  Learn More
                </Button>
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
            {['Electrician', 'Plumbing', 'Carpenter', 'Pest Control', 'Home Cleaning', 'Lock Smith Service'].map((service, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="service-item">
                  <Image
                    src={`/${index + 1}.svg`}
                    alt={service}
                    width={200}
                    height={200}
                    style={{
                      margin: "auto",
                    }}
                  />
                  <h3>{service} Service</h3>
                  <Button as="a" href={`/${service.toLowerCase().replace(' ', '')}`} variant="solid" colorScheme="blue">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
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
                  <Image
                    src={`/api/get-image/${item.imageName}`}
                    alt={item.name}
                    width={250}
                    height={250}
                    objectFit="cover"
                  />
                  <Text>{item.name}</Text>
                  <Text fontSize="md" color="gray.600">
                    {item.description}
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">
                    ₨ {item.price}
                  </Text>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    className="snipcart-add-item"
                    data-item-id={item.id}
                    data-item-price={item.price}
                    data-item-description={item.description}
                    data-item-image={`/api/get-image/${item.imageName}`}
                    data-item-name={item.name}
                    data-item-url={process.env.url}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </Flex>
          </div>
        </div>
      </div>

      <div className="testimonial">
        <div className="container">
          <div className="section-header">
            <h2>Client Reviews</h2>
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
                      <Image
                        src={
                          review.image
                            ? `/api/get-image/${review.image}`
                            : "/user.png"
                        }
                        alt="User Avatar"
                        width={100}
                        height={100}
                        style={{
                          objectFit: "contain",
                          borderRadius: "50%",
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
                        <Image
                          src={`/api/get-image/${review.videoName}`}
                          alt="Review Video"
                          width={100}
                          height={100}
                          objectFit="cover"
                          borderRadius="8px"
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
