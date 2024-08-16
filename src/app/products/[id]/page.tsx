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
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [totalAvailable, setTotalAvailable] = useState<number>(1);
  const [onlyLeft, setOnlyLeft] = useState<string>("");
  const [variantId, setVariantId] = useState<number>();

  const { cartItems, setCartItems, handleLogin } = useAppProvider();

  const getData = (url: string) => {
    return getFetchForEcom(url);
  };

  const {
    data: productData,
    error,
    isLoading,
  } = useSWR(`${Backend_URL}/ecommerce-products/${params.id}`, getData);

  const addToCart = () => () => {
    if (!cartItems.some((el: any) => el.selectedVariant === variantId)) {
      const item = {
        ...productData,
        quantity,
        selectedVariant: variantId,
        selectedProduct: productData.productVariants.find(
          (el: any) => el.id === variantId
        ),
        discountInPrice:
          productData.salePrice -
          productData.salePrice *
            (1 - (productData.discountPrice as number) / 100),
        priceAfterDiscount:
          productData.salePrice *
          (1 - (productData.discountPrice as number) / 100),
      };
      setCartItems((prev: any) => [...prev, item]);
    }
  };
  console.log(productData);
  useEffect(() => {
    if (productData) {
      const initialVariant = productData.productVariants[0];
      setSelectedColor(initialVariant?.colorCode);

      setSelectedSize(
        productData.productVariants.find(
          (variant: any) =>
            variant.colorCode === productData.productVariants[0].colorCode
        ).productSizing
      );

      setAvailableSizes(
        productData.productVariants
          .filter(
            (variant: any) => variant.colorCode === initialVariant.colorCode
          )
          .map((el: any) => el.productSizing)
      );
      setVariantId(productData.productVariants[0].id);
    }
  }, [productData]);

  useEffect(() => {
    if (productData)
      setTotalAvailable(
        productData.productVariants.filter(
          (variant: any) =>
            variant.colorCode === selectedColor &&
            variant.productSizing == selectedSize
        ).length
      );
  }, [selectedColor, selectedSize]);

  const handleColorChange = (colorCode: string) => {
    setSelectedColor(colorCode);
    const filteredImages = productData.productVariants
      .filter((variant: any) => variant.colorCode === colorCode)
      .map((variant: any) => variant.mediaUrl);

    setImageToShow(filteredImages);

    setAvailableSizes(
      productData.productVariants
        .filter((variant: any) => variant.colorCode === colorCode)
        .map((variant: any) => variant.productSizing)
    );

    setTotalAvailable(
      productData.productVariants.filter(
        (variant: any) =>
          variant.colorCode === colorCode &&
          variant.productSizing == selectedSize
      ).length
    );

    const filteredSizes = productData.productVariants
      .filter((variant: any) => variant.colorCode === colorCode)
      .map((variant: any) => variant.productSizing);

    setAvailableSizes(filteredSizes);
    setSelectedSize(filteredSizes[0]);
    setQuantity(1);
    setOnlyLeft("");
  };

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
  };

  return (
    <>
      {isLoading ? (
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
                <p className="text-neutral-500 mb-2 text-xs lg:text-sm uppercase">
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
                <p className="text-neutral-500 mb-2 text-xs lg:text-sm uppercase">
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
                <p className="text-neutral-500 mb-2 text-xs lg:text-sm uppercase">
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
            <div className="grid lg:grid-cols-5 gap-5 h-auto">
              <div className="overflow-auto w-full lg:col-span-2">
                <div className=" flex gap-3 lg:flex-col w-full lg:h-[700px] overflow-auto  h-[400px]">
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
              <div className="lg:p-10 lg:col-span-3 space-y-2 lg:space-y-4 ">
                <div className=" hidden lg:block">
                  <BreadCrumbComponent path="Home" currentPage="Best Sellers" />
                </div>
                <div className=" space-y-1">
                  <div className="flex gap-3 items-center">
                    <p className="lg:text-xl text-lg font-semibold">
                      {productData?.name}
                    </p>
                  </div>
                  <p className=" font-light text-primary/60 lg:text-base text-xs">
                    {productData?.productBrand}
                  </p>
                </div>
                {(productData?.discountPrice as number) > 0 ? (
                  <div className=" space-y-1.5 text-sm lg:text-base ">
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
                      <p className=" text-sm !mt-0 lg:text-base">
                        {new Intl.NumberFormat("ja-JP").format(
                          productData.salePrice *
                            (1 - (productData.discountPrice as number) / 100)
                        )}{" "}
                        MMK
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className=" text-sm">
                    {new Intl.NumberFormat("ja-JP").format(
                      productData.salePrice
                    )}{" "}
                    MMK
                  </p>
                )}
                <Badge>{productData.productFitting}</Badge>
                <div>
                  <p className="text-neutral-500 mb-2 text-xs lg:text-sm uppercase">
                    available colors
                  </p>
                  <div className="flex gap-3">
                    {productData.productVariants
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
                              style={{ backgroundImage: `url(${mediaUrl})` }}
                              className="lg:w-7 lg:h-7 h-4 bg-red-900 w-4 rounded-full bg-cover bg-center"
                            ></div>
                          </div>
                        )
                      )}
                  </div>
                </div>
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
                        productData.productVariants.find(
                          (el: any) => el.productSizing == e
                        ).id
                      );
                    }}
                    size="sm"
                    type="single"
                  >
                    {availableSizes?.map((el: any, index: any) => (
                      <ToggleGroupItem key={index} value={el}>
                        {el}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
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
                    <p className=" my-2 text-sm text-red-500">{onlyLeft}.</p>
                  )}
                </div>
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
            <hr className=" my-8" />
            <HotDealAlert data={data} isLoading={dealLoading} />
          </div>
          {isClient && (
            <SweetAlert2 {...swalProps}>
              <div className=" pointer-events-none space-y-3 text-center">
                <p className=" pointer-events-none font-medium">Wishlist</p>
                <p className=" pointer-events-none text-black/50 text-sm">
                  Your wishlist is currently empty. Sign in or create an account
                  to save your wishlist across all your devices.
                </p>
                <div className="  pointer-events-none flex gap-3 justify-center items-center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSwalProps({
                        ...swalProps,
                        show: false,
                      });
                    }}
                    size={"sm"}
                    className="  pointer-events-auto"
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
