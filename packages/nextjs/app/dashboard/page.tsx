"use client";

import { useState } from "react";
import type { NextPage } from "next";
import ProductCard, { cardData } from "~~/components/ProductCard";
import ProductModal from "~~/components/ProductModal";
import ShopifyModal from "~~/components/ShopifyModal";

const Dashboard: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [shopify, setShopify] = useState(false);
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
          {cardData.map((journey: any) => (
            <ProductCard
              key={journey.key}
              id={journey.id}
              name={journey.name}
              image={journey.image}
              description={journey.desc}
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
