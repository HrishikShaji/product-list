import axios from "axios";
import Link from "next/link";
import { Category, Product } from "@/types/types";

const origin = process.env.ORIGIN;

const getCategories = async () => {
  const categories = await axios.get(`${origin}/api/categories`);
  return categories.data;
};

const getProducts = async () => {
  const products = await axios.get(`${origin}/api/products`);
  return products.data;
};
export default async function Home() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <main className="p-10 flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <div className="flex  gap-2">
          {categories?.map((item: Category) => (
            <Link key={item.id} href={`/category/${item.id}`}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="flex flex-col gap-2">
          {products?.map((item: Product) => (
            <Link key={item.id} href={`/product/${item.id}`}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
