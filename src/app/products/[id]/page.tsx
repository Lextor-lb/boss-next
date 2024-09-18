// app/products/[id]/page.tsx

import ProductDetail from "@/components/ecom/ProductDetail";
import { Backend_URL } from "@/lib/fetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = params;

  // Fetch product data from your backend
  const product = await fetch(`${Backend_URL}/ecommerce-products/${id}`).then(
    (res) => res.json()
  );

  console.log(product);

  if (!product) {
    notFound(); // Handle not found
  }

  return {
    title: `Boss Nation - ${product.name} ` || `Product ${product.productCode}`, // Dynamic title based on product data
    description:
      product.description || `Details about Product ${product.productCode}`,
    keywords: [product.description, `Boss ${product.productCode}`],
    openGraph: {
      title: product.name || `Product ${product.productCode}`,
      description: product.description || `Details about Product ${id}`,
      url: `https://bossn-nation/products/${id}`, // Dynamic URL
      images: [
        {
          url: product.mediaUrls[0].url,
          width: 1920,
          height: 1080,
          alt: "Boss Nation",
        },
      ],
    },
  };
}

const ProductPage = ({ params }: { params: Params }) => {
  const { id } = params;

  // Fetch product data on the server side or client side
  return <ProductDetail id={id} />;
};

export default ProductPage;
