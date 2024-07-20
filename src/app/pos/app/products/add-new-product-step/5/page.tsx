"use client";

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Camera, Check, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Backend_URL } from "@/lib/api";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getFetch } from "@/lib/fetch";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useProductProvider } from "@/app/pos/app/products/Provider/ProductProvider";
import useSWR from "swr";
import FormInput from "@/components/FormInput.components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ProductVariantTable } from "@/components/pos/products";
import { Label } from "@/components/ui/label";

type ProductVariant = {
  id: number;
  shopCode: string;
  productCode: string;
  colorCode: string;
  barcode: string;
  productSizingId: number;
  image: File;
};

const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

const AddProductPageFive = () => {
  const {
    navigateForward,
    navigateBackward,
    addProductFormData,
    setAddProductFormData,
  } = useProductProvider();

  const inputRef = useRef<HTMLInputElement>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<string>("");
  const [editMode, setEditMode] = useState({
    status: false,
    id: "",
  });

  const getData = async (url: string) => {
    const response = await getFetch(url);
    return response;
  };

  const { data } = useSWR(`${Backend_URL}/product-sizings/all`, getData);

  const schema = z.object({
    image: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => validImageTypes.includes(files?.[0]?.type),
        ".jpg, .jpeg and .png files are accepted."
      ),
    shopCode: z.string().min(3, { message: "This field cannot be empty!" }),
    colorCode: z.string().min(3, { message: "This field cannot be empty!" }),
    barcode: z.string().min(3, { message: "This field cannot be empty!" }),
    productSizingId: z
      .number()
      .min(1, { message: "This field cannot be empty!" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: "",
      shopCode: "",
      colorCode: "",
      barcode: "",
    },
  });

  const { onChange, onBlur, name, ref } = register("image");

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <div className="space-y-4">
      <div>
        <div className="pb-4 flex justify-between items-center">
          <div className="space-y-2">
            <p className="font-bold text-xl">Add Product</p>
            <p className="font-normal text-primary/60 text-sm">
              Products Information placed across your store.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigateBackward()} type="button" size="sm">
              <ArrowLeft size={24} />
            </Button>
            <Button onClick={() => navigateForward(6)} type="button" size="sm">
              <ArrowRight size={24} />
            </Button>
          </div>
        </div>

        <hr className="py-3" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex gap-3  justify-start"
            style={{ alignItems: "flex-end" }}
          >
            <div className=" block basis-1/12">
              <div className="flex justify-center items-center cursor-pointer h-10 w-10 bg-white rounded-full">
                <Camera />
              </div>
              <div className="hidden">
                <input type="file" name="image" id="image" />
              </div>
            </div>
            <FormInput
              className={"basis-3/12"}
              label={"Shop Code"}
              id={"shopCode"}
              type="text"
              {...register("shopCode")}
            />

            <FormInput
              className={"basis-3/12"}
              label={"Color Code"}
              id={"color_code"}
              type="text"
              {...register("colorCode", {
                required: " This field cannot be empty!",
              })}
            />

            <div className=" space-y-1.5 basis-2/12">
              <Label>Select Size</Label>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between  !rounded-md "
                  >
                    {size ? size : "Sizes"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command defaultValue={""}>
                    <CommandInput
                      placeholder="Search Size..."
                      className="h-9"
                    />
                    <CommandEmpty>No sizes found!</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {data?.data.map(({ id, name }: any) => (
                          <CommandItem
                            className={cn(size === name ? "bg-accent" : "")}
                            key={`${id}`}
                            value={name}
                            onSelect={(e) => {
                              setSize(e);
                              setValue("productSizingId", parseInt(id));
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                size === name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <FormInput
              className={"basis-3/12"}
              label={"Barcode"}
              id={"barcode"}
              {...register("barcode")}
              type="text"
            />
            <Button>
              <Plus />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPageFive;

{
  /*  */
}
