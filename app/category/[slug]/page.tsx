"use client";

import { Category, Product } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`/api/categories?parentId=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
    fetch(`/api/products?categoryId=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [slug]);

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">SubCategories</h1>
        <div className="flex gap-2">
          {data.map((item: Category) => (
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
