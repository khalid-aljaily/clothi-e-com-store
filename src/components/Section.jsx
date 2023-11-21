import { useEffect } from "react";
import { Button, Skeleton } from "@mantine/core";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SectionCard from "./SectionCard";

function Section({ title, sortID }) {
  const { data, refetch } = useQuery({
    queryKey: [title],
    queryFn: async () => {
      const options = {
        method: "GET",
        url: "https://kohls.p.rapidapi.com/products/list",
        params: {
          limit: "4",
          dimensionValueID: "Department:Clothing",
          sortID,
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
          "X-RapidAPI-Host": "kohls.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (err) {
        if (err.response && err.response.status === 429) {
          try {
            const newOptions = {
              ...options,
              headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_API_KEY_2,
                "X-RapidAPI-Host": "kohls.p.rapidapi.com",
              },
            };
            const newResponse = await axios.request(newOptions);
            return newResponse.data;
          } catch (err) {
            if (err.response && err.response.status === 429) {
              const newOptions = {
                ...options,
                headers: {
                  "X-RapidAPI-Key": import.meta.env.VITE_API_KEY_3,
                  "X-RapidAPI-Host": "kohls.p.rapidapi.com",
                },
              };
              const newResponse = await axios.request(newOptions);
              return newResponse.data;
            }
          }
        }
        throw new Error("Failed to fetch products");
      }
    },
    staleTime: "infinity",
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="py-16 px-5 md:px-[70px]">
      <h2 className="text-center text-[32px] md:text-[48px] mb-8 md:mb-14">
        {title}
      </h2>
      <div className="flex justify-between gap-4 overflow-auto snap-x snap-mandatory">
        {data ? (
          data?.payload.products?.map((product) => (
            <div key={product.webID} className="snap-center">
              <SectionCard product={product} />
            </div>
          ))
        ) : (
          <div className="flex justify-between gap-4 overflow-auto snap-x snap-mandatory w-full">
            {[1, 2, 3, 4].map((prod) => (
              <div
                key={prod}
                className="w-[280px] h-[280px] flex flex-col justify-between snap-center "
              >
                <Skeleton className="h-[75%] w-full " />
                <Skeleton className="h-[8%] w-[70%] rounded-md" />
                <Skeleton className="h-[8%] w-[90%] rounded-md" />
              </div>
            ))}
          </div>
        )}
      </div>
      {title === "New Arrivals" || title === "Best Sellers" ? (
        <Button
          variant="outline"
          classNames={{ inner: "font-Satoshi-medium text-base" }}
          className="border-gray-300 mx-auto block mt-10"
          w={218}
          h={52}
          radius={50}
        >
          <Link to={"/shop?" + "CN=Department:Clothing"} state={sortID}>
            View All
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

export default Section;
//
