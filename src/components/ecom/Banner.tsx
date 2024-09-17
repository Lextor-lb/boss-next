import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Backend_URL, getFetch, getFetchForEcom } from "@/lib/fetch";
import useSWR from "swr";
import Image from "next/image";

const Banner = () => {
  const getData = (url: string) => {
    return getFetchForEcom(url);
  };

  const { data, error, isLoading } = useSWR(
    `${Backend_URL}/api/v1/sliders`,
    getData
  );

  const someData = [
    {
      id: 1,
      name: "KYK",
      sorting: 2,
    },
    {
      id: 2,
      name: "YN",
      sorting: 1,
    },
    {
      id: 3,
      name: "PMZ",
      sorting: 3,
    },
  ];

  return (
    <div>
      <div className="flex justify-center object-contain items-center">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {error || isLoading ? (
              <CarouselItem className=" h-[400px] lg:h-[600px] flex justify-center items-center  text-red-300 py-12 bg-neutral-600"></CarouselItem>
            ) : (
              <>
                {data?.data
                  ?.sort((a: any, b: any) => a.sorting - b.sorting)
                  .map(({ id, desktopImage, mobileImage }: any) => (
                    <CarouselItem
                      key={id}
                      className=" h-[400px] lg:h-[600px] w-full flex justify-center items-center text-red-300 py-12"
                    >
                      <Image
                        src={desktopImage}
                        className=" hidden lg:block w-full object-cover h-[600px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                      <Image
                        src={mobileImage}
                        className=" lg:hidden block w-full object-cover h-[400px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
              </>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
