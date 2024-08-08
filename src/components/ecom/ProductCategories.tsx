import React, { useRef } from "react";
import Container from "./Container";
import Heading from "./Heading";
import { Button } from "../ui/button";
import { IconLeft, IconRight } from "react-day-picker";
import { Backend_URL, getFetch } from "@/lib/fetch";
import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const ProductCategories = () => {
  const getData = (url: string) => {
    return getFetch(url);
  };

  const { data, error, isLoading } = useSWR(
    `${Backend_URL}/ecommerce-categories
    `,
    getData
  );

  const next = useRef<HTMLButtonElement | null>(null);
  const previous = useRef<HTMLButtonElement | null>(null);

  return (
    <Container>
      <div className=" space-y-4 my-12">
        <div className=" flex justify-between items-center">
          <Heading
            header="shop by categories"
            desc="the latest and greatest products that every man needs to enhance his lifestyle"
          />
          <div className=" hidden  lg:flex gap-2">
            <Button
              onClick={() => previous.current && previous.current.click()}
              size={"sm"}
              variant={"outline"}
            >
              <IconLeft />
            </Button>
            <Button
              onClick={() => next.current && next.current.click()}
              size={"sm"}
            >
              <IconRight />
            </Button>
          </div>
        </div>
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
                  <CarouselItem className="">
                    <div className=" py-12"></div>
                  </CarouselItem>
                ) : (
                  data.map(({ name, media }: any, index: number) => (
                    <CarouselItem key={index} className="lg:basis-1/3">
                      <Image
                        src={media.url}
                        className=" w-full object-cover h-[500px] "
                        alt=""
                        width={300}
                        height={600}
                      />
                      <div className=" font-bold p-3 text-sm lg:text-base ">
                        {name}
                      </div>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <div className=" hidden">
                <CarouselNext ref={next} />
                <CarouselPrevious ref={previous} />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductCategories;
