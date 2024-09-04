"use client";
import React, { useRef, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Heart, ShoppingCart, User, Gift } from "lucide-react";
import Container from "./Container";
import { useRouter } from "next/navigation";
import ControlSheet from "./ControlSheet";
import { useAppProvider } from "@/app/Provider/AppProvider";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Cart from "./Cart";

const Navbar = () => {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { searchInputValue, setSearchInputValue } = useAppProvider();
  const [debouncedValue, setDebouncedValue] = useState(searchInputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchInputValue(debouncedValue);
    }, 1300); // delay in milliseconds

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue, setSearchInputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedValue(e.target.value);
  };

  const { handleLogin } = useAppProvider();

  return (
    <div className=" select-none">
      <div className=" w-full z-[50] h-[40px] flex justify-center items-center border-0 fixed bg-[#333333]">
        <div
          onClick={() => {
            handleLogin();
          }}
          className=" cursor-pointer text-xs flex gap-1 items-center text-neutral-50"
        >
          <span className=" !my-3">
            <Gift />
          </span>
          <span>Sign up for exclusive offers!</span>
        </div>
      </div>
      <div className="z-[50] h-[80px] top-8 fixed flex justify-center items-center bg-secondary w-full border-b-2 border-input">
        <Container className="flex justify-center flex-col h-full">
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-3">
            <p
              onClick={() => {
                setSearchInputValue("");
                router.push("/");
              }}
              className="lg:text-xl text-lg cursor-pointer font-semibold"
            >
              Boss Nation
            </p>
            {/* nav links */}
            <div className="hidden lg:flex justify-around">
              <p
                onClick={() => {
                  setSearchInputValue("");
                  router.push("/new-in?page=1");
                }}
                className="text-sm cursor-pointer uppercase"
              >
                New In
              </p>
              <p
                onClick={() => {
                  setSearchInputValue("");
                  router.push("/men?page=1");
                }}
                className="text-sm cursor-pointer uppercase"
              >
                Men
              </p>
              <p
                onClick={() => {
                  setSearchInputValue("");
                  router.push("/women?page=1");
                }}
                className="text-sm cursor-pointer uppercase"
              >
                Women
              </p>
              <p
                onClick={() => {
                  setSearchInputValue("");
                  router.push("/unisex?page=1");
                }}
                className="text-sm cursor-pointer uppercase"
              >
                Unisex
              </p>
            </div>

            {/* controls */}
            <div className="flex justify-end items-center">
              <div className="border-neutral-400 border w-[200px] rounded hidden lg:flex items-center">
                <Button
                  className="!h-8 border-0 -me-2 !p-0 !px-2 rounded-e-0"
                  variant="ghost"
                >
                  <Search size={20} color="#A3a3a3" />
                </Button>
                <Input
                  value={debouncedValue}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  className="w-[80%] border-none h-4 bg-transparent rounded-none focus:outline-none focus:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="block lg:hidden">
                <ControlSheet
                  buttonName={<Search />}
                  title=""
                  desc=""
                  closeRef={closeRef}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      closeRef.current && closeRef.current.click();
                    }}
                  >
                    <div className="border-input w-full rounded border flex items-center">
                      <Button
                        type="submit"
                        className="!h-8 border-0 -me-2 rounded-e-0"
                        variant="outline"
                      >
                        <Search />
                      </Button>
                      <Input
                        value={debouncedValue}
                        onChange={handleInputChange}
                        placeholder="Search..."
                        className="w-[80%] border-none h-9 bg-transparent rounded-none focus:outline-none focus:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </form>
                </ControlSheet>
              </div>
              <div className="hidden lg:block">
                {/* <ControlSheet
                buttonName={<Heart />}
                title="Wish List"
                desc="Your wishlist is here"
              >
                Wish list
              </ControlSheet> */}
              </div>

              <ControlSheet
                buttonName={<ShoppingCart />}
                title="Add to Cart"
                closeRef={closeRef}
                desc="Your Cart Items"
              >
                <Cart closeRef={closeRef} />
              </ControlSheet>

              <div className="hidden lg:block">
                <Button
                  onClick={() => {
                    setSearchInputValue("");
                    router.push("/profile/information");
                  }}
                  size="sm"
                  variant="ghost"
                  className="relative"
                >
                  <User />
                </Button>
              </div>
              <div className="block lg:hidden">
                <ControlSheet
                  buttonName={<HamburgerMenuIcon width={24} height={24} />}
                  title="Menu"
                >
                  <div className="space-y-3">
                    <p
                      onClick={() => {
                        setSearchInputValue("");
                        router.push("/new-in?page=1");
                      }}
                      className="text-sm cursor-pointer uppercase"
                    >
                      New In
                    </p>
                    <hr className="border-1.5 border-input" />
                    <p
                      onClick={() => {
                        setSearchInputValue("");
                        router.push("/men?page=1");
                      }}
                      className="text-sm cursor-pointer uppercase"
                    >
                      Men
                    </p>
                    <hr className="border-1.5 border-input" />
                    <p
                      onClick={() => {
                        setSearchInputValue("");
                        router.push("/women?page=1");
                      }}
                      className="text-sm cursor-pointer uppercase"
                    >
                      Women
                    </p>
                    <hr className="border-1.5 border-input" />
                    <p
                      onClick={() => {
                        setSearchInputValue("");
                        router.push("/unisex?page=1");
                      }}
                      className="text-sm cursor-pointer uppercase"
                    >
                      Unisex
                    </p>
                    <hr className="border-1.5 border-input" />
                    <p
                      onClick={() => {
                        setSearchInputValue("");
                        router.push("/profile/information");
                      }}
                      className="text-sm cursor-pointer uppercase"
                    >
                      Profile
                    </p>
                  </div>
                </ControlSheet>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
