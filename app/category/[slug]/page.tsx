import { Category, Product } from "@/types/types";
import axios from "axios";
import Link from "next/link";

const origin = process.env.ORIGIN;

const getCategories = async (slug: string) => {
  const categories = await axios.get(
    `${origin}/api/categories?parentId=${slug}`,
  );
  return categories.data;
};

const getProducts = async (slug: string) => {
  const products = await axios.get(`${origin}/api/products?categoryId=${slug}`);
  return products.data;
};
const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const categories = await getCategories(slug);
  const products = await getProducts(slug);

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">SubCategories</h1>
        <div className="flex gap-2">
          {categories.map((item: Category) => (
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
    </div>
  );
};

export default Page;
