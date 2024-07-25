"use client";
import { useProductProvider } from "@/app/pos/app/products/Provider/ProductProvider";
import ConfirmBox from "@/components/ConfirmBox";
import {
  AddProductControlBar,
  EditProductControlBar,
} from "@/components/pos/products";
import {
  Backend_URL,
  deleteFetch,
  deleteSingleFetch,
  postMediaFetch,
  putMediaFetch,
} from "@/lib/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudFog, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FilePond } from "react-filepond";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

const EditProductPageThree = () => {
  const { editProductFormData, setEditProductFormData } = useProductProvider();

  // to display
  const [images, setImages] = useState<File[]>([]);
  const [alreadyAddedImages, setAlreadyAddedImages] = useState<{ file: any }[]>(
    []
  );

  useEffect(() => {
    setAlreadyAddedImages(editProductFormData.medias);
  }, []);

  const handleFileUpdate = (fileItems: any) => {
    const validFiles = fileItems.map((fileItem: any) => fileItem.file);

    // Update state or perform other operations with validFiles array
    setImages(validFiles);
  };

  const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

  const schema = z.object({
    images: z
      .array(
        z.object({
          file: z
            .instanceof(File)
            .refine((file) => validImageTypes.includes(file.type), {
              message: "Invalid file type",
            }),
        })
      )
      .min(1, { message: "At least one image is required" })
      .max(5, { message: "No more than 5 images are allowed" }),
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
      images: [],
    },
  });

  const [dropImageId, setDropImageId] = useState();

  const deleteFetcher = async (url: string) => {
    return deleteSingleFetch(url);
  };

  const { trigger: drop } = useSWRMutation(
    `${Backend_URL}/products/media/${dropImageId}`,
    deleteFetcher,
    {
      onSuccess: () =>
        setAlreadyAddedImages(
          alreadyAddedImages.filter(({ id }: any) => id !== dropImageId)
        ),
    }
  );

  const handleDelete = async (id: any) => {
    await setDropImageId(id);
    const res = await drop();
    console.log(res);
    if (res) {
      console.log("this is run");
    }
  };

  const postFetcher = async (url: string, { arg }: { arg: any }) => {
    return putMediaFetch(url, arg);
  };

  const {
    data,
    error,
    isMutating,
    trigger: add,
  } = useSWRMutation(
    `${Backend_URL}/products/${editProductFormData.id}`,
    postFetcher
  );

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const res = await add(data);
    console.log(res);
  };

  console.log(error);

  return (
    <div className="space-y-4 ">
      <EditProductControlBar run={handleSubmit(onSubmit)} />

      <div className="w-1/2">
        <FilePond
          className="!bg-white !rounded-md"
          allowMultiple={true}
          onupdatefiles={(fileItems: any) => {
            handleFileUpdate(fileItems);
            const validFiles = fileItems.map((fileItem: any) => ({
              file:
                fileItem.file instanceof File
                  ? fileItem.file
                  : (fileItem.file.file as File),
            }));
            setValue("images", validFiles, { shouldValidate: true });
          }}
          allowDrop={true}
          maxFiles={5}
          server={null}
          instantUpload={false}
        />
        {errors.images && (
          <p className="text-sm text-red-500">{errors.images.message}</p>
        )}
      </div>

      <div className=" space-y-2.5">
        <div className=" space-y-2">
          <p className=" text-lg font-semibold">Already Added Photos</p>
          <div className=" w-full overflow-auto">
            <div className=" flex gap-3 justify-start items-center">
              {alreadyAddedImages.map(({ url, id }: any, index) => (
                <div key={index} className="relative">
                  <div className="right-0 absolute">
                    <ConfirmBox
                      confirmTitle="Are you sure you want to delete?"
                      confirmButtonText="Yes,Delete"
                      confirmDescription="You can't undone this action!"
                      buttonName={<X color="red" />}
                      buttonVariant={"link"}
                      run={() => handleDelete(id)}
                      buttonSize={"icon"}
                    />
                  </div>
                  <img className="h-[400px] w-full object-cover" src={url} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" w-full overflow-x-auto space-y-2">
          <p className=" text-lg font-semibold">New Photos</p>
          <div className=" flex gap-3 justify-start items-center">
            {images.map((file: any, index) => (
              <img
                key={index}
                className="h-[400px] object-cover"
                src={URL.createObjectURL(file)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPageThree;
