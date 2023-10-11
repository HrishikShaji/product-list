"use client";
import Link from "next/link";
import { Category, Product } from "@/types/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <main className="p-20 flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <div className="flex  gap-2">
          {data?.map((item: Category) => (
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
