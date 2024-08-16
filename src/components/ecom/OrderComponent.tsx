import { CarFront, Check, Package, ShirtIcon, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const OrderComponent = ({ data }: any) => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (data) {
      if (data.orderStatus == "ORDERED") {
        setActive(1);
        return;
      }
      if (data.orderStatus == "CONFIRM") {
        setActive(2);
        return;
      }
      if (data.orderStatus == "DELIVERY") {
        setActive(3);
        return;
      }
      if (data.orderStatus == "COMPLETE") {
        setActive(4);
        return;
      }
    }
  }, [data]);

  const router = useRouter();

  return (
    <>
      {data?.orderStatus == "CANCEL" ? (
        <div className="mx-auto h-full overflow-x-auto w-[80%] lg:w-[90%]">
          <div className=" bg-secondary overflow-x-auto space-y-4 p-3 lg:p-5 lg:w-[60%] mx-auto border border-input">
            <p className=" lg:text-base text-center text-xs capitalize font-medium">
              We are sorry to inform you that, Your Order {data?.orderCode} Has
              Been Canceled due to unexpected situations
            </p>
            <div className=" flex justify-center">
              <Button onClick={() => router.push("/")} size={"sm"}>
                Please, Explore Other Products Here
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mx-auto h-full overflow-x-hidden w-screen lg:w-[90%]">
            <div className=" bg-secondary space-y-4 p-3 lg:p-5 lg:w-[60%] border border-input">
              <p className=" lg:text-base text-xs capitalize font-medium">
                Your Order {data?.orderCode} Has Been{" "}
                {data?.orderStatus.toLowerCase()}!
              </p>
              <div className=" flex items-center gap-3">
                <div className=" flex flex-col justify-center items-center text-center gap-1.5 ">
                  <div
                    className={`border-dashed  ${
                      active > 0 && "bg-primary"
                    } duration-200 circle p-1.5 border-2 rounded-full border-primary inline-block`}
                  >
                    <ShirtIcon className=" lg:w-5 lg:h-5 stroke-white h-3 w-3" />
                  </div>
                  <p className=" text-xs font-normal lg:text-sm capitalize">
                    Processing
                  </p>
                </div>

                <div className=" border w-12  h-0 mb-2.5 border-dashed border-primary"></div>

                <div className=" flex flex-col justify-center items-center gap-1.5">
                  <div
                    className={`border-dashed  ${
                      active > 1 && " bg-primary"
                    } duration-200 circle p-1.5 border-2  rounded-full border-primary inline-block`}
                  >
                    <Package
                      className={` lg:w-5 lg:h-5 ${
                        active < 2 ? " stroke-black" : "stroke-white"
                      } h-3 w-3`}
                    />
                  </div>
                  <p className=" font-normal text-xs lg:text-sm capitalize">
                    Packed
                  </p>
                </div>

                <div className=" border w-12  h-0 mb-2.5 border-dashed border-primary"></div>

                <div className=" flex flex-col justify-center items-center gap-1.5">
                  <div
                    className={`border-dashed  ${
                      active > 2 && "bg-primary"
                    } duration-200 circle p-1.5 border-2  rounded-full border-primary inline-block`}
                  >
                    <CarFront
                      className={` lg:w-5 lg:h-5 ${
                        active < 3 ? " stroke-black" : "stroke-white"
                      } h-3 w-3`}
                    />
                  </div>
                  <p className=" font-normal text-xs lg:text-sm capitalize">
                    Delivery
                  </p>
                </div>

                <div className=" border w-12  h-0 mb-2.5 border-dashed border-primary"></div>

                <div className=" flex flex-col justify-center items-center gap-1.5">
                  <div
                    className={`border-dashed  ${
                      active > 3 && "bg-primary"
                    } duration-200 circle p-1.5 border-2  rounded-full border-primary inline-block`}
                  >
                    <Check
                      className={` lg:w-5 lg:h-5 ${
                        active < 4 ? " stroke-black" : "stroke-white"
                      } h-3 w-3`}
                    />
                  </div>
                  <p className=" font-normal text-xs lg:text-sm capitalize">
                    Complete
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto lg:w-[90%]">
            <div className=" space-y-2 py-6">
              <p className=" lg:text-base text-sm">
                Hi {data?.ecommerceUser?.name},
              </p>
              <p className=" text-xs lg:text-sm">
                We are pleased to inform you that your order {data?.orderCode}{" "}
                has been successfully completed. Thank you for shopping with us!
              </p>
            </div>
            <div className=" bg-secondary space-y-4 p-5 lg:w-1/3 border border-input">
              <p className=" lg:text-lg text-sm">Order Details:</p>
              <div className="flex gap-3">
                <p className="text-sm text-start w-[130px] text-primary/80">
                  Order Number :
                </p>
                <p className="text-sm font-normal w-[104px] text-start ">
                  {data?.orderCode}
                </p>
              </div>
              <div className="flex gap-3">
                <p className="text-sm text-start w-[130px] text-primary/80">
                  Order Date :
                </p>
                <p className="text-sm font-normal w-[104px] text-start ">
                  {data?.date}
                </p>
              </div>
              <div className="flex gap-3">
                <p className="text-sm text-start w-[130px] text-primary/80">
                  Total Amount :
                </p>
                <p className="text-sm font-normal text-start ">
                  {new Intl.NumberFormat("ja-JP").format(data?.total)} MMK
                </p>
              </div>
            </div>
            <div className="pt-4">
              <div className=" flex gap-1 items-center">
                <User2 />
                <p className=" font-medium lg:text-base text-sm">
                  {data?.ecommerceUser.name} .
                </p>
                <p className=" text-xs">{data?.ecommerceUser.phone}</p>
              </div>
              <p className=" ms-1 py-1 lg:text-sm text-xs">
                {data?.ecommerceUser.addressDetail},{data?.ecommerceUser.street}
                ,{data?.ecommerceUser.township},{data?.ecommerceUser.city}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderComponent;
