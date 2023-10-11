"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <main className="p-10 flex flex-col gap-20">
      <div className="flex gap-2">
        {data.map((item) => (
          <Link key={item.id} href={`/category/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {products?.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
