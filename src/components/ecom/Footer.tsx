"use client";

import React from "react";
import Container from "./Container";
import { Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppProvider } from "@/app/Provider/AppProvider";

const Footer = () => {
  const router = useRouter();
  const { searchInputValue, setSearchInputValue } = useAppProvider();
  return (
    <div className=" text-secondary/80 bg-primary">
      <Container>
        <div className=" grid lg:grid-cols-4 gap-12 grid-cols-2 p-5 lg:p-12">
          <div className=" lg:col-span-1 col-span-full space-y-2 lg:space-y-3">
            <p className="lg:text-lg text-base text-secondary/80 font-semibold">
              Boss Nation
            </p>
            <p className=" text-xs lg:text-sm text-secondary/50">
              Authentic Fashion
            </p>
          </div>
          <div className=" space-y-3">
            <p className=" text-secondary/60 text-[14px] lg:text-xs uppercase font-medium">
              Customer care
            </p>
            <ul className=" space-y-3 cursor-pointer text-xs lg:text-sm capitalize">
              <li>contact us</li>
              <li>about us</li>
              <li>FAQ</li>
              <li>Login</li>
            </ul>
          </div>
          <div className=" space-y-3">
            <p className=" text-secondary/60 cursor-pointer text-[14px] lg:text-xs uppercase font-medium">
              Shop with us
            </p>
            <ul className=" space-y-3 text-xs lg:text-sm capitalize">
              <li
                onClick={() => {
                  router.push("/new-in");
                  setSearchInputValue("");
                }}
                className=" cursor-pointer"
              >
                New in
              </li>
              <li
                onClick={() => {
                  router.push("/men?page=1");
                  setSearchInputValue("");
                }}
                className=" cursor-pointer"
              >
                Men
              </li>
              <li
                onClick={() => {
                  router.push("/women?page=1");
                  setSearchInputValue("");
                }}
                className=" cursor-pointer"
              >
                Women
              </li>
              <li
                onClick={() => {
                  router.push("/unisex?page=1");
                  setSearchInputValue("");
                }}
                className=" cursor-pointer"
              >
                Unisex
              </li>
            </ul>
          </div>
          <div className=" space-y-3">
            <p className=" text-secondary/60 text-[14px] lg:text-xs uppercase font-medium">
              Contact us
            </p>
            <div className=" flex text-secondary items-center">
              <div className=" p-3 ">
                <Mail />
              </div>
              <div className=" text-xs lg:text-xs text-secondary/70">
                <p>
                  E mail :<a className=" block">bossnation134@gmail.com</a>
                </p>
              </div>
            </div>
            <div className=" flex text-secondary  items-center">
              <div className=" p-3 ">
                <Phone />
              </div>
              <div className="text-secondary/70 text-xs lg:text-xs">
                <p>
                  Phone :
                  <a className=" block" href="tel:+95943179753">
                    +95943179753
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className=" border-3 border-secondary" />
        <p className=" text-xs font-medium text-center py-3">
          Copyright © 2024 BossNation | All Rights Reserved |{" "}
          <span className=" underline">Terms and Conditions</span> |{" "}
          <span className=" underline">Privacy Policy</span>
        </p>
      </Container>
    </div>
  );
};

export default Footer;
