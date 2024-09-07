"use client";

import { useAppProvider } from "@/app/Provider/AppProvider";
import { BreadCrumbComponent, Container } from "@/components/ecom";
import HotDealAlert from "@/components/ecom/HotDealAlert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Backend_URL, getFetch, getFetchForEcom } from "@/lib/fetch";
import { DashIcon } from "@radix-ui/react-icons";
import { Heart, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SweetAlert2 from "react-sweetalert2";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

type orderItem = {
  name: string;
  variantId: number;
  colorCode: string;
  photo: string;
  priceAfterDiscount?: number;
  quantity: number;
  discount?: number;
  salePrice: number;
  productSizing: string;
  amountSaved?: number;
  ids: any;
};

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [imageToShow, setImageToShow] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<any>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [totalAvailable, setTotalAvailable] = useState<number>(1);
  const [onlyLeft, setOnlyLeft] = useState<string>("");
  const [variantId, setVariantId] = useState<number>();
  const [userId, setUserId] = useState<number | null>();

  const {
    cartItems,
    setCartItems,
    handleLogin,
    orderRecord,
    setOrderRecord,
    addedCartIds,
    setAddedCartIds,
  } = useAppProvider();

  const getData = (url: string) => {
    return getFetchForEcom(url);
  };

  const {
    data: productData,
    error,
    isLoading,
  } = useSWR(`${Backend_URL}/ecommerce-products/${params.id}`, getData);

  const addToCart = () => {
    if (quantity > 1) {
      const data = productData.productVariants
        .filter(
          (el: any) =>
            el.colorCode === selectedColor && el.productSizing === selectedSize
        )
        .slice(0, quantity);
      const ids = data.map((el: any) => el.id);

      const existsInOrder = orderRecord?.some((el: orderItem) =>
        ids.includes(el.variantId)
      );

      if (!existsInOrder) {
        // to send data to backend
        const records: orderItem[] = data.map((el: any) => {
          const itemData: orderItem = {
            name: productData.name as string,
            quantity: 1,
            salePrice: productData.salePrice as number,
            colorCode: el.colorCode,
            productSizing: el.productSizing,
            variantId: el.id,
            photo: el.mediaUrl,
            discount: productData.discountPrice,

            priceAfterDiscount:
              productData.salePrice *
              (1 - (productData.discountPrice as number) / 100),

            amountSaved:
              productData.salePrice -
              productData.salePrice *
                (1 - (productData.discountPrice as number) / 100),
            ids: ids,
          };
          return itemData;
        });

        const foundItem = data.find((el: any) => el.id === variantId);

        const dataToDisplay = foundItem
          ? {
              name: productData.name as string,
              quantity: quantity,
              salePrice: productData.salePrice as number,
              colorCode: foundItem.colorCode,
              productSizing: foundItem.productSizing,
              variantId: foundItem.id,
              photo: foundItem.mediaUrl,
              discount: productData.discountPrice,

              priceAfterDiscount:
                quantity *
                productData.salePrice *
                (1 - (productData.discountPrice as number) / 100),

              amountSaved:
                quantity * productData.salePrice -
                quantity *
                  productData.salePrice *
                  (1 - (productData.discountPrice as number) / 100),
              ids: ids,
            }
          : null;

        setOrderRecord([...orderRecord, ...records]);
        setCartItems([...cartItems, dataToDisplay]);
      }
    } else {
      const foundItem = productData.productVariants.filter(
        (el: any) => el.id === variantId
      );

      const existsInOrder = orderRecord
        ?.map((el: orderItem) => el.variantId)
        .includes(variantId);

      if (!existsInOrder) {
        const dataToDisplay = foundItem[0]
          ? {
              name: productData.name as string,
              quantity: quantity,
              salePrice: productData.salePrice as number,
              colorCode: foundItem[0].colorCode,
              productSizing: foundItem[0].productSizing,
              variantId: foundItem[0].id,
              photo: foundItem[0].mediaUrl,
              discount: productData.discountPrice,

              priceAfterDiscount:
                quantity *
                productData.salePrice *
                (1 - (productData.discountPrice as number) / 100),

              amountSaved:
                quantity * productData.salePrice -
                quantity *
                  productData.salePrice *
                  (1 - (productData.discountPrice as number) / 100),
              ids: [foundItem[0].id],
            }
          : null;

        const records: orderItem[] = foundItem.map((el: any) => {
          const itemData: orderItem = {
            name: productData.name as string,

            quantity: 1,

            salePrice: productData.salePrice as number,

            colorCode: el.colorCode,

            productSizing: el.productSizing,

            variantId: el.id,

            photo: el.mediaUrl,

            discount: productData.discountPrice,

            priceAfterDiscount:
              productData.salePrice *
              (1 - (productData.discountPrice as number) / 100),

            amountSaved:
              productData.salePrice -
              productData.salePrice *
                (1 - (productData.discountPrice as number) / 100),
            ids: [el.id],
          };
          return itemData;
        });

        setOrderRecord([...orderRecord, ...records]);
        setCartItems([...cartItems, dataToDisplay]);
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

      if (addedCartIds.length > 0) {
        const ids = productData?.productVariants.map((el: any) =>
          Number(el.id)
        );

        const missingIds = ids.filter(
          (id: number) => !addedCartIds.includes(id)
        );

        setVariantId(missingIds[0]);
      }
    }
  }, [productData, addedCartIds, setAddedCartIds]);

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

  const postData = async (url: string, { arg }: { arg: any }) => {
    try {
      const token = isClient && localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(arg),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      return data;
    } catch (error: any) {
      console.error("Fetch API Error:", error.message);
      throw new Error(error.message || "An error occurred");
    }
  };

  const {
    data: addData,
    trigger: addWishList,
    error: addError,
  } = useSWRMutation(`${Backend_URL}/wishlist`, postData);

  const addToWishList = async () => {
    if (isClient) {
      if (localStorage.getItem("accessToken")) {
        const data = {
          wishlistId: Date.now().toString(),
          productVariantIds: [
            {
              productVariantId: variantId,
              salePrice: productData.salePrice,
            },
          ],
        };
        const res = await addWishList(data);
        if (res) {
        }
      } else {
        setSwalProps({
          ...swalProps,
          show: true,
        });
      }
    }
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
                  onClick={addToCart}
                  disabled={isLoading}
                  className=" w-full lg:w-3/5"
                ></Button>
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
            {addError && (
              <p className=" text-red-500 text-sm">{addError.message}</p>
            )}
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
                      onClick={addToCart}
                      disabled={productData?.productVariants.length < 1}
                      className=" w-full lg:w-3/5"
                    >
                      Add to cart
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

          {isClient && userId !== null && (
            <SweetAlert2
              didClose={() => {
                setSwalProps({
                  ...swalProps,
                  show: false,
                });
              }}
              {...swalProps}
              // customClass={{ popup: "!w-auto" }}
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
