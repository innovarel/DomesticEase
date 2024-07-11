"use client";
import { getOrder } from "@/app/actions/book";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
//@ts-ignore
import mapboxgl from "mapbox-gl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2luZXBpbmV6IiwiYSI6ImNsdXZlYzNoOTAyaHAybG55bGw2ZDJ1OTgifQ.58CX4i5rlZ3uYYPTr_cqWQ";

const Page = () => {
  const params = useParams<{ order: string }>();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", params.order],
    queryFn: async () => getOrder(params.order),
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null); // Updated typing for map container ref

  const [map, setMap] = useState<mapboxgl.Map | null>(null); // Properly typed map state
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null); // Properly typed marker state

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainerRef }: { setMap: (map: mapboxgl.Map) => void, mapContainerRef: React.RefObject<HTMLDivElement> }) => {
      if (!mapContainerRef.current || !order?.location) return;
      const { lat, lng } = order.location;
      const initializedMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: 5,
      });

      initializedMap.on("load", () => {
        setMap(initializedMap);
        initializedMap.resize();
      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainerRef });
    } else {
      if (order?.location) {
        const { lat, lng } = order.location;
        const newMarker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);
        setMarker(newMarker);
        map.flyTo({
          center: [lng, lat],
          zoom: 10,
        });
      }
    }

    return () => {
      if (map) map.remove();
    };
  }, [map, order]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <div
        ref={mapContainerRef}
        className="map-container"
        style={{ width: "100%", height: "90vh" }}
      />
    </>
  );
};

export default Page;
