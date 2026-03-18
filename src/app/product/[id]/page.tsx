// import ProductDetail from "@/components/product/ProductDetails";

// export default async function ProductPage({ params }: c) {
//   const { id } = await params;

//   return (
//     <div className="bg-white min-h-screen">
//       <ProductDetail productId={Number(id)} />
//     </div>
//   );
// }

import ProductDetail from "@/components/product/ProductDetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <div className="bg-white min-h-screen">
      <ProductDetail productId={productId} />
    </div>
  );
}
