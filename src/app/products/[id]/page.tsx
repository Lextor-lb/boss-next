"use client";

import { useAppProvider } from "@/app/Provider/AppProvider";
import { BreadCrumbComponent, Container } from "@/components/ecom";
import HotDealAlert from "@/components/ecom/HotDealAlert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Backend_URL, getFetch, getFetchForEcom } from "@/lib/fetch";
import { DashIcon } from "@radix-ui/react-icons";
import { Heart, Plus, PlusIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SweetAlert2 from "react-sweetalert2";
import useSWR from "swr";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [imageToShow, setImageToShow] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<any>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [totalAvailable, setTotalAvailable] = useState<number>(1);
  const [onlyLeft, setOnlyLeft] = useState<string>("");
  const [variantId, setVariantId] = useState<number>();

  const { cartItems, setCartItems, handleLogin, orderRecord, setOrderRecord } =
    useAppProvider();

  const getData = (url: string) => {
    return getFetchForEcom(url);
  };

  const {
    data: productData,
    error,
    isLoading,
  } = useSWR(`${Backend_URL}/ecommerce-products/${params.id}`, getData);

  const addToCart = () => () => {
    if (quantity > 1) {
      const data = productData.productVariants.filter(
        (el: any) =>
          el.productSizing == selectedSize && el.colorCode == selectedColor
      );

      if (
        !orderRecord
          .map((el: any) => el.variantId)
          .some((variantId: any) => data.some((el: any) => el.id === variantId))
      ) {
        const records = data.map((el: any) => {
          return {
            ...el,
            name: productData.name,
            variantId: el.id,
            priceAfterDiscount:
              productData.salePrice *
              (1 - (productData.discountPrice as number) / 100),
            quantity: 1,
          };
        });

        setOrderRecord([...orderRecord, ...records]);
      }
    } else {
      if (!cartItems.some((el: any) => el.selectedVariant === variantId)) {
        const item = {
          ...productData,

          quantity: quantity,

          selectedVariant: variantId,

          selectedProduct: productData?.productVariants?.find(
            (el: any) => el.id === variantId
          ),

          variantId: productData?.productVariants?.find(
            (el: any) => el.id === variantId
          ).id,

          discountInPrice:
            quantity * productData.salePrice -
            quantity *
              productData.salePrice *
              (1 - (productData.discountPrice as number) / 100),

          priceAfterDiscount:
            quantity *
            productData.salePrice *
            (1 - (productData.discountPrice as number) / 100),

          productSizing: productData?.productVariants?.find(
            (el: any) => el.id === variantId
          ).productSizing,
        };

        setCartItems((prev: any) => [...prev, item]);
        setOrderRecord([...orderRecord, item]);
      }
    }
  };

  useEffect(() => {
    if (productData) {
      const initialVariant = productData?.productVariants[0];
      setSelectedColor(initialVariant?.colorCode);

      // Set the initial size by finding the first variant that matches the color code
      const initialSize = productData?.productVariants?.find(
        (variant: any) => variant.colorCode === initialVariant.colorCode
      )?.productSizing as string;

      setSelectedSize(initialSize);

      // Set available sizes
      const sizes = new Set(
        productData?.productVariants
          ?.filter(
            (variant: any) => variant.colorCode === initialVariant.colorCode
          )
          ?.map((variant: any) => variant?.productSizing as string)
      );

      const sizesArray = Array.from(sizes);

      setAvailableSizes(sizesArray);

      setVariantId(initialVariant?.id);
    }
  }, [productData]);

  const handleColorChange = (colorCode: string) => {
    setSelectedColor(colorCode);

    const filteredSizes = new Set<string>(
      productData?.productVariants
        .filter((variant: any) => variant?.colorCode === colorCode)
        .map((variant: any) => variant?.productSizing as string)
    );

    const sizesArray = Array.from(filteredSizes);

    // Set the available sizes
    setAvailableSizes(sizesArray);

    // Set the selected size to the first element in the array, if it exists
    setSelectedSize(sizesArray[0] || "");
    setQuantity(1);
    setOnlyLeft("");
  };

  useEffect(() => {
    if (productData)
      setTotalAvailable(
        productData?.productVariants?.filter(
          (variant: any) =>
            variant.colorCode === selectedColor &&
            variant.productSizing == selectedSize
        ).length
      );
  }, [selectedColor, selectedSize]);

  const {
    data,
    isLoading: dealLoading,
    error: dealError,
  } = useSWR(
    productData
      ? `${Backend_URL}/ecommerce-Products/riddle/${productData.productCategory.id}`
      : null,
    getData
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [swalProps, setSwalProps] = useState({
    show: false,
    showConfirmButton: false,
  });

  console.log(orderRecord);

  const addToWishList = () => {
    if (isClient) {
      if (localStorage.getItem("auth")) {
        console.log("add here");
      } else {
        setSwalProps({
          ...swalProps,
          show: true,
        });
      }
    }

    setSwalProps({
      ...swalProps,
      show: true,
    });
  };

  return (
    <>
      {isLoading ? (
        // skeleton loader
        <Container>
          <div className="grid lg:grid-cols-5 gap-5 h-auto">
            <div className="overflow-auto w-full lg:col-span-2">
              <div className=" flex gap-3 lg:flex-col w-full bg-neutral-500 animate-pulse lg:h-[700px] overflow-auto  h-[400px]"></div>
            </div>
            <div className="lg:p-10 lg:col-span-3 space-y-2 lg:space-y-4 ">
              <div className=" hidden lg:block">
                <BreadCrumbComponent path="Home" currentPage="Best Sellers" />
              </div>
              <div className=" space-y-1">
                <div className="flex gap-3 items-center">
                  <span className=" h-3 w-24 bg-neutral-500 animate-pulse"></span>
                </div>
                <div className=" h-3 w-24 bg-neutral-500 animate-pulse"></div>
              </div>
              <div className=" h-3 w-24 bg-neutral-500 animate-pulse"></div>

              <div>
                <p className="text-neutral-500 mb-2 text-xs lg:text-base uppercase">
                  available colors
                </p>
                <div className=" flex gap-3">
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-neutral-500 mb-2 text-xs lg:text-base uppercase">
                  Select Size
                </p>
                <div className=" flex gap-3">
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <p className="text-neutral-500 mb-2 text-xs lg:text-base uppercase">
                  Quantity
                </p>
                <div className=" flex gap-3">
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                  <div className=" h-7 w-7 bg-neutral-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className=" flex gap-3">
                <div className=" h-3 w-12 bg-neutral-500 animate-pulse"></div>
                <div className=" h-3 w-12 bg-neutral-500 animate-pulse"></div>
                <div className=" h-3 w-12 bg-neutral-500 animate-pulse"></div>
                <div className=" h-3 w-12 bg-neutral-500 animate-pulse"></div>
              </div>
              <div className=" h-3 w-12 bg-neutral-500 animate-pulse"></div>

              <div className=" pt-2 flex gap-2">
                <Button
                  onClick={addToCart()}
                  disabled={isLoading}
                  className=" w-full lg:w-3/5"
                >
                  {cartItems.some(
                    (el: any) => el.selectedVariant === variantId
                  ) ? (
                    <span className=" me-1">Added to Cart</span>
                  ) : (
                    <span className=" me-1">Add to Cart</span>
                  )}
                </Button>
                <Button
                  onClick={() => addToWishList()}
                  size={"sm"}
                  variant={"outline"}
                >
                  <Heart />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <div>
            <div className="grid lg:grid-cols-12 gap-5 lg:gap-0 h-auto">
              <div className="overflow-auto w-full lg:col-span-6">
                <div className=" flex gap-3 lg:flex-col w-full lg:h-[860px] overflow-auto  h-[300px]">
                  {imageToShow.length < 1 ? (
                    <>
                      {productData.mediaUrls.map(({ url }: any, index: any) => (
                        <Image
                          key={index}
                          src={url}
                          alt="product image"
                          className="!w-full !h-[full] object-cover"
                          width={300}
                          height={300}
                        />
                      ))}
                    </>
                  ) : (
                    imageToShow.map((el, index) => (
                      <Image
                        key={index}
                        src={el}
                        alt="product image"
                        className="!w-full !h-[full] object-cover"
                        width={300}
                        height={300}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="lg:p-10 lg:col-span-6 ">
                <div className=" w-[90%] flex flex-col gap-[24px] mx-start">
                  <div
                    style={{ alignContent: "baseline" }}
                    className="flex justify-between "
                  >
                    <BreadCrumbComponent
                      path="Home"
                      currentPage="Best Sellers"
                    />
                    <p className=" font-bold text-[20px] lg:text-[24px]">
                      {productData?.productBrand}
                    </p>
                  </div>
                  <div className=" space-y-1.5">
                    <p className="lg:text-2xl text-lg font-bold">
                      {productData?.name}
                    </p>
                    <p className=" font-normal text-primary/90 lg:text-sm text-xs">
                      {productData?.description}
                    </p>
                    {productData?.productVariants.length < 1 && (
                      <Badge variant={"destructive"}>Out Of Stock</Badge>
                    )}
                  </div>
                  <div className=" flex flex-col gap-[9px]">
                    {(productData?.discountPrice as number) > 0 ? (
                      <div className=" space-y-1.5 text-lg lg:font-semibold ">
                        <Badge className=" text-black bg-neutral-300">
                          {productData.discountPrice}%
                        </Badge>

                        <div className="lg:flex gap-2 space-y-1 items-center">
                          <p className=" line-through opacity-80">
                            {new Intl.NumberFormat("ja-JP").format(
                              productData.salePrice
                            )}{" "}
                            MMK
                          </p>
                          <p className="text-lg !mt-0 ">
                            {new Intl.NumberFormat("ja-JP").format(
                              productData.salePrice *
                                (1 -
                                  (productData.discountPrice as number) / 100)
                            )}{" "}
                            MMK
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-lg ">
                        {new Intl.NumberFormat("ja-JP").format(
                          productData.salePrice
                        )}{" "}
                        MMK
                      </p>
                    )}
                    <div className=" block">
                      <Badge>{productData.productFitting}</Badge>
                    </div>
                  </div>

                  {productData?.productVariants.length > 0 && (
                    <>
                      <div>
                        <p className="text-neutral-500 mb-2 text-xs lg:text-sm uppercase">
                          available colors
                        </p>
                        <div className="flex gap-3">
                          {productData?.productVariants
                            .filter(
                              (variant: any, index: any, self: any) =>
                                index ===
                                self.findIndex(
                                  (v: any) => v.colorCode === variant.colorCode
                                )
                            )
                            .map(
                              (
                                {
                                  mediaUrl,
                                  colorCode,
                                  id,
                                }: {
                                  mediaUrl: string;
                                  colorCode: string;
                                  id: number;
                                },
                                index: number
                              ) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    handleColorChange(colorCode);
                                    setVariantId(id);
                                  }}
                                  className={`cursor-pointer rounded-full p-1 ${
                                    colorCode === selectedColor
                                      ? "border border-input"
                                      : ""
                                  }`}
                                >
                                  <div
                                    style={{
                                      backgroundImage: `url(${mediaUrl})`,
                                    }}
                                    className="lg:w-7 lg:h-7 h-6 bg-red-900 w-6 rounded-full bg-cover bg-center"
                                  ></div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                      <div className=" lg:w-1/2">
                        <div className="space-y-3">
                          <p className="text-neutral-500 mb-2 text-xs lg:text-sm uppercase">
                            Select Size
                          </p>
                          <ToggleGroup
                            value={selectedSize}
                            defaultValue={selectedSize}
                            onValueChange={(e) => {
                              setSelectedSize(e);
                              setOnlyLeft("");
                              setVariantId(
                                productData?.productVariants.find(
                                  (el: any) => el.productSizing == e
                                ).id
                              );
                            }}
                            size="sm"
                            type="single"
                          >
                            {availableSizes?.map((el: any, index: any) => (
                              <ToggleGroupItem
                                disabled={availableSizes.length === 1}
                                key={index}
                                value={el}
                              >
                                {el}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </div>
                      </div>
                      <div>
                        <p className="text-neutral-500 mb-2 text-xs lg:text-sm uppercase">
                          Quantity
                        </p>
                        <div className=" rounded-md border w-[130px] flex items-center">
                          <Button
                            onClick={() => {
                              if (quantity !== 1) {
                                setOnlyLeft("");
                                setQuantity(quantity - 1);
                              }
                            }}
                            size={"sm"}
                            variant={"ghost"}
                          >
                            <DashIcon />
                          </Button>
                          <p className=" text-center w-[2rem]">{quantity}</p>
                          <Button
                            size={"sm"}
                            onClick={() => {
                              if (selectedSize == "") {
                                setOnlyLeft(`Select Size First!`);
                                return;
                              }
                              if (quantity == totalAvailable) {
                                setOnlyLeft(
                                  ` Sorry! Only ${totalAvailable} is in stock now.`
                                );
                              } else {
                                setQuantity(quantity + 1);
                              }
                            }}
                            variant={"ghost"}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                        {onlyLeft && (
                          <p className=" my-2 text-base text-red-500">
                            {onlyLeft}.
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  <div className=" flex items-center justify-start pt-2 gap-2">
                    <Button
                      size={"lg"}
                      onClick={addToCart()}
                      disabled={productData?.productVariants.length < 1}
                      className=" w-full lg:w-3/5"
                    >
                      Add To Card
                    </Button>
                    {/* <Button
                      className=" h-10"
                      disabled={productData?.productVariants.length < 1}
                      onClick={() => addToWishList()}
                      variant={"outline"}
                    >
                      <Heart />
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>

            <hr className=" my-8" />

            <HotDealAlert data={data} isLoading={dealLoading} />
          </div>

          {isClient && (
            <SweetAlert2
              didClose={() => {
                setSwalProps({
                  ...swalProps,
                  show: false,
                });
              }}
              {...swalProps}
            >
              <div className=" pointer-events-none space-y-3 text-center">
                <p className=" pointer-events-none font-medium">Wishlist</p>
                <p className=" pointer-events-none text-black/50 text-base">
                  Your wishlist is currently empty. Sign in or create an account
                  to save your wishlist across all your devices.
                </p>
                <div className="pointer-events-none flex gap-3 justify-center items-center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSwalProps({
                        ...swalProps,
                        show: false,
                      });
                    }}
                    size={"sm"}
                    className="pointer-events-auto"
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={(e) => {
                      handleLogin();
                      e.stopPropagation();
                      setSwalProps({
                        ...swalProps,
                        show: false,
                      });
                    }}
                    size={"sm"}
                    className="  pointer-events-auto"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </SweetAlert2>
          )}
        </Container>
      )}
    </>
  );
};

export default ProductDetailPage;
