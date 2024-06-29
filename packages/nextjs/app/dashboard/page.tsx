"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import ProductCard, { cardData } from "~~/components/ProductCard";
import ProductModal from "~~/components/ProductModal";
import ShopifyModal from "~~/components/ShopifyModal";
import { Journey } from "~~/types/commontypes";

const Dashboard: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [shopify, setShopify] = useState(false);
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await fetch(`/api/journey`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getAllProducts().then(data => {
      setProducts(data);
    });
  }, []);
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="flex justify-end my-2 gap-4">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="btn btn-primary"
        >
          Add Product
        </button>
        <button
          onClick={() => {
            setShopify(!shopify);
          }}
          className="btn btn-success"
        >
          Load using Shopify
        </button>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {products.map((journey: Journey) => (
            <ProductCard
              key={journey._id}
              id={journey._id}
              name={journey.name}
              image={journey.image as string}
              description={journey.desc as string}
            />
          ))}
        </div>
      </div>
      {open && <ProductModal isOpen={open} onClose={() => setOpen(false)} />}
      {shopify && <ShopifyModal isOpen={shopify} onClose={() => setShopify(false)} />}
    </div>
  );
};

export default Dashboard;
