"use client";

import Container from "@/components/Container.components";
import NavHeader from "@/components/pos/NavHeader";
import { Button } from "@/components/ui/button";
import { Backend_URL, getFetch } from "@/lib/fetch";
import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import useSWR from "swr";
import * as z from "zod";

// Register any necessary plugins for FilePond (if required)
import "filepond/dist/filepond.min.css";

// Define the Zod schema for validation
const imageSchema = z.object({
  desktop: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "Max file size is 5MB"),
  mobile: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "Max file size is 5MB"),
});

// Define a type for the image state keys
type Place = "place1" | "place2" | "place3" | "place4";

const SliderPage = () => {
  const getData = (url: string) => {
    return getFetch(url);
  };
  const { data } = useSWR(`${Backend_URL}/slider/all`, getData);

  const [images, setImages] = useState<
    Record<Place, { desktop: File | null; mobile: File | null }>
  >({
    place1: { desktop: null, mobile: null },
    place2: { desktop: null, mobile: null },
    place3: { desktop: null, mobile: null },
    place4: { desktop: null, mobile: null },
  });

  const handleUpdateFiles =
    (place: Place, type: "desktop" | "mobile") => (fileItems: any) => {
      const file = fileItems[0]?.file || null;
      setImages((prev) => ({
        ...prev,
        [place]: {
          ...prev[place],
          [type]: file,
        },
      }));

      // Validate the file using Zod schema
      const result = imageSchema.safeParse({
        desktop: type === "desktop" ? file : images[place].desktop,
        mobile: type === "mobile" ? file : images[place].mobile,
      });

      if (!result.success) {
        console.error("Validation Error:", result.error);
        // Handle validation errors (e.g., show a message to the user)
      }
    };

  console.log(data);

  return (
    <Container>
      <div className="space-y-4">
        <NavHeader parentPage="Slider" path="Ecommerce" currentPage="Slider" />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="text-lg font-semibold">Upload Photo</p>
            <p className="text-sm text-primary/60">
              Banner photos for your ecommerce
            </p>
          </div>
          <Button size={"sm"}>Upload</Button>
        </div>
        <hr className="my-3" />
        <div className="grid grid-cols-2 gap-12">
          {(["place1", "place2", "place3", "place4"] as Place[]).map(
            (place) => (
              <div key={place} className="space-y-2">
                <p className="text-lg font-semibold">{`Place ${place.slice(
                  -1
                )}`}</p>
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-1">
                    <p className="text-sm text-primary/60">
                      Add image for Desktop
                    </p>
                    <FilePond
                      onupdatefiles={handleUpdateFiles(place, "desktop")}
                    />
                    {images[place].desktop && (
                      <img
                        src={URL.createObjectURL(images[place].desktop)}
                        alt="Desktop Preview"
                        className="mt-2 w-full h-32 object-cover"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-primary/60">
                      Add image for Mobile
                    </p>
                    <FilePond
                      onupdatefiles={handleUpdateFiles(place, "mobile")}
                    />
                    {images[place].mobile && (
                      <img
                        src={URL.createObjectURL(images[place].mobile)}
                        alt="Mobile Preview"
                        className="mt-2 w-full h-32 object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Container>
  );
};

export default SliderPage;
