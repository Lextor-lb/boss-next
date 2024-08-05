"use client";
import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
  ChevronRight,
  BadgeCheck,
  FlipHorizontal2,
  Ruler,
  Shirt,
} from "lucide-react";
import { RulerSquareIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface OtherAnalysisData {
  id: number;
  icon: JSX.Element;
  type: string;
  path: string;
}

const otherAnalysisData: OtherAnalysisData[] = [
  {
    id: 1,
    icon: <BadgeCheck />,
    type: "Brand",
    path: "pos/app/brand-report",
  },
  {
    id: 2,
    icon: <Shirt />,
    type: "Product Type",
    path: "pos/app/type-report",
  },
  {
    id: 3,
    icon: <FlipHorizontal2 />,
    type: "Product Category",
    path: "pos/app/category-report",
  },
  {
    id: 4,
    icon: <Ruler />,
    type: "Fitting",
    path: "pos/app/fitting-report",
  },
  {
    id: 5,
    icon: <RulerSquareIcon width={23} height={23} />,
    type: "Size",
    path: "pos/app/sizing-report",
  },
];

const SaleReportChartComponent = ({ chartData }: any) => {
  const [finalData, setFinalData] = useState<any>({});
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (chartData) {
      console.log("here");
      setFinalData({
        labels: chartData.map((data: any) => data.period),
        datasets: [
          {
            label: "Sale Report",
            data: chartData.map((data: any) => data.totalAmount),
            backgroundColor: ["#00DA30"],
            borderColor: "#00DA30",
            borderWidth: 1.03,
          },
        ],
      });
      setIsReady(true);
    }
  }, [chartData]);

  return (
    <>
      {!isReady ? (
        <p>Please Wait... just a moment</p>
      ) : (
        <>
          <div className="bg-white p-5 grid grid-cols-12">
            <div className="col-span-8">
              <p className="text-lg font-semibold">Sale Analysis</p>
              <div className="w-[800px]">
                <Line data={finalData} />
              </div>
            </div>
            <div className="col-span-4">
              <div>
                <p className="text-end text-lg font-semibold">Other Analysis</p>
                <ul className="p-4 space-y-4">
                  {otherAnalysisData.map(({ id, icon, type, path }) => (
                    <li onClick={() => router.push(`/${path}`)} key={id}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="border-2 rounded border-primary bg-slate-50 p-3">
                            {icon}
                          </span>
                          <div>
                            <p className="text-sm tracking-wider font-medium">
                              {type}
                            </p>
                          </div>
                        </div>
                        <div>
                          <ChevronRight />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SaleReportChartComponent;
