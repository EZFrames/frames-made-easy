"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PencilIcon } from "@heroicons/react/20/solid";
interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  id: string;
}
const ProductCard: React.FC<ProductCardProps> = ({ name, image, description, id }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="w-[20vw] h-[30vh] relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-8 shadow-lg bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/40 rounded-t-2xl">
        <PencilIcon className="absolute top-4 right-4 w-6 h-6 text-black" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover rounded-t-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/40 rounded-t-2xl"></div>
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h3>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{description}</div>
    </article>
  );
};

export default ProductCard;
