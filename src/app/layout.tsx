"use client";
// app/layout.tsx

import "./styles.css";
import { Providers } from "./libs/chakra";
import { UserWrapper } from "./contexts/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Ensure Snipcart div is only added once
    if (!document.getElementById("snipcart")) {
      const snipcartDiv = document.createElement("div");
      snipcartDiv.id = "snipcart";
      snipcartDiv.dataset.apiKey =
        "ZjVmZDUwNTEtMWMwZi00ZjYxLTg4NjQtYjkzYmYzMWVmZDU4NjM4MjM2MTkxNTI1MTA2MjE2";
      snipcartDiv.hidden = true;
      document.body.appendChild(snipcartDiv);

      const script = document.createElement("script");
      script.src = "https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
          rel="stylesheet"
        />
        <link href="./lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css"
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Providers>
            <UserWrapper>
              <Header />
              {children}
              <Footer />
            </UserWrapper>
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
