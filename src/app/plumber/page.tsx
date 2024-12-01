"use client";
import "../globals.css";

import { Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getReviewsType } from "../actions/review";

export default function Component() {
  const { data } = useQuery({
    queryKey: ["plumber"],
    queryFn: () => getReviewsType("plumber"),
  });
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
        <div className="container px-4 md:px-6 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Expert Plumber Services
            </h1>
            <p className=" max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
              Reliable and affordable Mobile Mechanic Services for your home or
              business. From installations to repairs, our team of skilled home
              cleaners has you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                // go to /book
                onClick={() => (window.location.href = "/book")}
                colorScheme="facebook"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Book an Appointment
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 space-y-4">
              <CloudLightningIcon className="w-10 h-10 text-blue-500" />
              <h3 className="text-xl font-semibold">Plumbing Installations</h3>
              <p className="text-gray-600 dark:text-gray-400">
                From new construction to home renovations, we handle all your
                plumbing installation needs.
              </p>
            </div>
            <div className="bg-white dark:bg-[#242424] rounded-lg shadow-md p-6 space-y-4">
              <BoldIcon className="w-10 h-10 text-blue-500" />
              <h3 className="text-xl font-semibold">plumbing Repairs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our experienced Plumbers are ready to diagnose and fix any
                plumbing issues in your home or business.
              </p>
            </div>
            <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
              <PlugIcon className="w-10 h-10 text-blue-600" />
              <h3 className="text-xl font-semibold">Maintenance & Upgrades</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Keep your plumbing system running smoothly with our regular
                maintenance and upgrade services.
              </p>
            </div>
            <div className="bg-white  rounded-lg shadow-md p-6 space-y-4">
              <WrenchIcon className="w-10 h-10 text-blue-600" />
              <h3 className="text-xl font-semibold">Emergency Services</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Dont worry, were available 24/7 to handle any plumbing
                emergencies you may have.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-10 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              How to Book an Appointment
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-600 dark:text-gray-400 text-lg">
              Our simple 3-step process makes it easy to schedule an appointment
              with one of our skilled Plumbers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <CalendarIcon className="w-12 h-12 mx-auto text-[#0070f3]" />
              <h3 className="text-2xl font-semibold">Schedule</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select a convenient date and time for your appointment.
              </p>
            </div>
            <div className="space-y-4">
              <PhoneIcon className="w-12 h-12 mx-auto text-[#0070f3]" />
              <h3 className="text-2xl font-semibold">Confirm</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our team will call you to confirm the details of your
                appointment.
              </p>
            </div>
            <div className="space-y-4">
              <WrenchIcon className="w-12 h-12 mx-auto text-[#0070f3]" />
              <h3 className="text-2xl font-semibold">Service</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our skilled Plumber will arrive on time and provide expert
                service.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f5f5f5] ">
        <div className="container px-4 md:px-6 space-y-10 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Why Choose Us?
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-600 dark:text-gray-400 text-lg">
              Our Plumber services stand out from the rest with these key
              advantages.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#242424] rounded-lg shadow-md p-6 space-y-4 text-left">
              <ClockIcon className="w-10 h-10 text-[#0070f3]" />
              <h3 className="text-xl font-semibold">Prompt Service</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We understand the importance of timely service, so we always
                arrive on schedule.
              </p>
            </div>
            <div className="bg-white dark:bg-[#242424] rounded-lg shadow-md p-6 space-y-4 text-left">
              <WrenchIcon className="w-10 h-10 text-[#0070f3]" />
              <h3 className="text-xl font-semibold">Expert Technicians</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our team of licensed and experienced Plumbers are dedicated to
                providing top-notch service.
              </p>
            </div>
            <div className="bg-white dark:bg-[#242424] rounded-lg shadow-md p-6 space-y-4 text-left">
              <DollarSignIcon className="w-10 h-10 text-[#0070f3]" />
              <h3 className="text-xl font-semibold">Affordable Pricing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer competitive rates without compromising on quality or
                customer service.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-10 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              What Our Customers Say
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-600 dark:text-gray-400 text-lg">
              Hear from our satisfied customers about their experience with our
              Plumber services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((review: any) => (
              <div
                key={review._id}
                className="bg-white dark:bg-[#242424] rounded-lg shadow-md p-6 space-y-4 text-left"
              >
                <div className="flex items-center gap-4">
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
                  <div>
                    <h6 className="font-semibold">{review.user}</h6>
                    <div className="flex items-center gap-1 text-[#0070f3]">
                      {new Array(review.rating).fill(0).map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {review.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
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

function BoldIcon(props: any) {
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
      <path d="M14 12a4 4 0 0 0 0-8H6v8" />
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
    </svg>
  );
}

function CalendarIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CloudLightningIcon(props: any) {
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
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function PhoneIcon(props: any) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PlugIcon(props: any) {
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
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  );
}

function WrenchIcon(props: any) {
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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
