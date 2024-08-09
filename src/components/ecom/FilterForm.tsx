import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { ChevronDown } from "lucide-react";
import useSWR from "swr";
import { Backend_URL, getFetch, getFetchForEcom } from "@/lib/fetch";
import FilterItem from "./FilterItem";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const FilterForm = ({ closeRef }: any) => {
  const [isClient, setIsClient] = useState(false);
  const [genders, setGenders] = useState<string[]>([]);
  const [brands, setBrands] = useState<(string | number)[]>([]);
  const [type, setType] = useState<(string | number)[]>([]);
  const [range, setRange] = useState([0, 0]);
  const [open, setOpen] = useState<number[]>([1, 2, 3, 4]);

  const router = useRouter();

  // Load saved filter values from localStorage
  useEffect(() => {
    const savedFilters = isClient && localStorage.getItem("filters");
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      setGenders(filters.genders || []);
      setBrands(filters.brands || []);
      setType(filters.type || []);
      setRange(filters.range || [0, 0]);
      setOpen(filters.open || [1, 2, 3, 4]);
    }
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGenderChange = (value: string) => {
    setGenders((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleBrandChange = (value: string | number) => {
    setBrands((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleTypeChange = (value: string | number) => {
    setType((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const getData = (url: string) => {
    return getFetchForEcom(url);
  };

  const { data: brandData, isLoading: brandLoading } = useSWR(
    `${Backend_URL}/product-brands/all`,
    getData
  );

  const { data: typesData, isLoading: typesLoading } = useSWR(
    `${Backend_URL}/product-types/alls`,
    getData
  );

  console.log(typesData);

  // Function to handle input changes
  const handleInputChange = (index: number, value: string) => {
    const newRange = [...range];
    newRange[index] = value ? parseInt(value, 10) : 0;
    setRange(newRange);
  };

  const handleRangeChange = (value: any) => {
    setRange(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Save filter values to localStorage
    isClient &&
      localStorage.setItem(
        "filters",
        JSON.stringify({ genders, brands, type, range, open })
      );

    // Create an array to hold the query parameters
    const queryParams = [];

    // Add selected genders to the query parameters
    if (genders.length > 0) {
      queryParams.push(`sortGender=${genders.join(",").toLowerCase()}`);
    }

    // Add selected brands to the query parameters
    if (brands.length > 0) {
      queryParams.push(`sortBrand=${brands.join(",")}`);
    }

    // Add selected types to the query parameters
    if (type.length > 0) {
      queryParams.push(`sortType=${type.join(",")}`);
    }

    // Add range to the query parameters
    if (range[0] > 0 && range[1] > 0) {
      queryParams.push(`min=${range[0]}`);
      queryParams.push(`max=${range[1]}`);
    }

    // Create the URL with the query parameters
    const queryString =
      queryParams.length > 0 ? `/${queryParams.join("&")}` : "";
    router.push(`/products-filter${queryString}&page=1`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2.5">
        <div className="space-y-1.5">
          <div
            onClick={() => {
              if (open.includes(1)) {
                setOpen(open.filter((el) => el !== 1));
              } else {
                setOpen([...open, 1]);
              }
            }}
            className="flex justify-between"
          >
            <Label>Gender</Label>
            <ChevronDown />
          </div>
          {open.includes(1) && (
            <div className="grid grid-cols-2 gap-3">
              <FilterItem
                run={handleGenderChange}
                name="Men"
                value="Men"
                isChecked={genders.includes("Men")}
              />
              <FilterItem
                run={handleGenderChange}
                name="Women"
                value="Women"
                isChecked={genders.includes("Women")}
              />
              <FilterItem
                run={handleGenderChange}
                name="Unisex"
                value="Unisex"
                isChecked={genders.includes("Unisex")}
              />
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <div
            onClick={() => {
              if (open.includes(2)) {
                setOpen(open.filter((el) => el !== 2));
              } else {
                setOpen([...open, 2]);
              }
            }}
            className="flex justify-between"
          >
            <Label>Brands</Label>
            <ChevronDown />
          </div>
          {open.includes(2) && (
            <div className="grid grid-cols-2 gap-3">
              {!brandLoading &&
                brandData?.data?.map(
                  ({ id, name }: { id: number; name: string }) => (
                    <FilterItem
                      key={id}
                      run={handleBrandChange}
                      name={name}
                      value={id}
                      isChecked={brands.includes(id)}
                    />
                  )
                )}
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <div
            onClick={() => {
              if (open.includes(3)) {
                setOpen(open.filter((el) => el !== 3));
              } else {
                setOpen([...open, 3]);
              }
            }}
            className="flex justify-between"
          >
            <Label>Product Types</Label>
            <ChevronDown />
          </div>
          {open.includes(3) && (
            <div className="grid grid-cols-2 gap-3">
              {!typesLoading &&
                typesData?.data?.map(
                  ({ id, name }: { id: number; name: string }) => (
                    <FilterItem
                      key={id}
                      run={handleTypeChange}
                      name={name}
                      value={id}
                      isChecked={type.includes(id)}
                    />
                  )
                )}
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <div
            onClick={() => {
              if (open.includes(4)) {
                setOpen(open.filter((el) => el !== 4));
              } else {
                setOpen([...open, 4]);
              }
            }}
            className="flex justify-between"
          >
            <Label>Prices</Label>
            <ChevronDown />
          </div>
          {open.includes(4) && (
            <>
              <div className="flex gap-3 items-center">
                <Input
                  className="w-1/2"
                  value={range[0]}
                  onChange={(e) => handleInputChange(0, e.target.value)}
                  placeholder="Min"
                />
                <Input
                  className="w-1/2"
                  value={range[1]}
                  onChange={(e) => handleInputChange(1, e.target.value)}
                  placeholder="Max"
                />
              </div>
              <div className="pt-1.5">
                <Slider
                  minStepsBetweenThumbs={1}
                  max={5000000}
                  min={50000}
                  step={1}
                  value={range}
                  onValueChange={handleRangeChange}
                  formatLabel={(value) => `${value}`}
                />
              </div>
            </>
          )}
        </div>
        <div className=" flex justify-between">
          <Button
            onClick={() => closeRef.current && closeRef.current.click()}
            type="button"
            variant="link"
          >
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Save changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
