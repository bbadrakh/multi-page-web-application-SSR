import Link from "next/link";
import { Product } from "@/app/types/data";

interface Props {
  params: { id: string };
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  // Server‑side fetch on every request
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store", // disable caching for fresh data
  });

  const product: Product = await res.json();

  if (!res.ok) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-red-500">Error while fetching the data</p>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-gray-500">Product not found.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Link href={"../.."} className="self-start mb-4 text-indigo-600 hover:text-indigo-800 cursor-pointer transition">
        ← Back to Products
      </Link>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
            <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            <div className="mt-auto">
              <p className="text-indigo-600 font-bold text-2xl mb-2">${product.price}</p>
              <p className="text-gray-500 mb-1">Category: {product.category}</p>
              <p className="text-gray-500">
                Rating: <span className="font-medium text-gray-800">{product.rating.rate} / 5</span> ({product.rating.count} reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
