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
    `${Backend_URL}/slider/all`,
    getData
  );

  const sorting1 =
    data &&
    data?.data?.filter(
      (el: any) =>
        el.sorting == 1 && {
          desktopImage: el.desktopImage,
          phoneImage: el.mobileImage,
        }
    );

  const sorting2 =
    data &&
    data?.data?.filter(
      (el: any) =>
        el.sorting == 1 && {
          desktopImage: el.desktopImage,
          phoneImage: el.mobileImage,
        }
    );

  const sorting3 =
    data &&
    data?.data?.filter(
      (el: any) =>
        el.sorting == 1 && {
          desktopImage: el.desktopImage,
          phoneImage: el.mobileImage,
        }
    );

  const sorting4 =
    data &&
    data?.data?.map(
      (el: any) =>
        el.sorting == 1 && {
          desktopImage: el.desktopImage,
          phoneImage: el.mobileImage,
        }
    );

  return (
    <div className="">
      <div className="flex justify-center object-contain items-center">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {error || isLoading ? (
              <CarouselItem className=" h-[400px] lg:h-[660px] flex justify-center items-center   text-red-300 py-12 bg-neutral-600">
                <p className=" text-3xl ">up to 60% off</p>
              </CarouselItem>
            ) : (
              <>
                <>
                  {sorting1?.map((el: any, index: any) => (
                    <CarouselItem key={index} className=" hidden lg:block">
                      <Image
                        src={el.desktopImage}
                        className=" w-full object-cover h-[500px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
                  {sorting2?.map((el: any, index: any) => (
                    <CarouselItem key={index} className=" hidden lg:block">
                      <Image
                        src={el.desktopImage}
                        className=" w-full object-cover h-[500px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
                  {sorting3?.map((el: any, index: any) => (
                    <CarouselItem key={index} className=" hidden lg:block">
                      <Image
                        src={el.desktopImage}
                        className=" w-full object-cover h-[500px]"
                        alt={""}
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
                  {sorting4?.map((el: any, index: any) => (
                    <CarouselItem key={index} className=" hidden lg:block">
                      <Image
                        src={el.desktopImage}
                        className=" w-full object-cover h-[500px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
                </>
                <>
                  {sorting1?.map((el: any, index: any) => (
                    <CarouselItem key={index} className="  lg:hidden block">
                      <Image
                        src={el.desktopImage}
                        className=" w-full object-cover h-[500px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
                  {sorting2?.map((el: any, index: any) => (
                    <CarouselItem key={index} className="  lg:hidden block">
                      <Image
                        src={el.desktopImage}
                        className=" w-full object-cover h-[500px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
                  {sorting3?.map((el: any, index: any) => (
                    <CarouselItem key={index} className="  lg:hidden block">
                      <Image
                        src={el.desktopImage}
                        className=" w-full object-cover h-[500px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
                  {sorting4?.map((el: any, index: any) => (
                    <CarouselItem key={index} className="  lg:hidden block">
                      <Image
                        src={el.desktopImage}
                        className=" w-full object-cover h-[500px]"
                        alt="banner photo"
                        width={300}
                        height={300}
                      />
                    </CarouselItem>
                  ))}
                </>
              </>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
