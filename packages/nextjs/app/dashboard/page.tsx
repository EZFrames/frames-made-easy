"use client";

import type { NextPage } from "next";
import ProductCard, { cardData } from "~~/components/ProductCard";

const Dashboard: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="flex justify-end my-2">
        <button
          onClick={() => {
            console.log("HEREEE");
          }}
          className="btn btn-primary"
        >
          Add Product
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
    </div>
  );
};

export default Dashboard;
