"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  id: string;
}
export const cardData: ProductCardProps[] = [
  {
    id: "1",
    name: "Mountain View",
    image: "https://picsum.photos/200/300?random=1",
    description: "A breathtaking view of the mountains.",
  },
  {
    id: "2",
    name: "City Skyline",
    image: "https://picsum.photos/200/300?random=2",
    description: "The beautiful skyline of a bustling city.",
  },
  {
    id: "3",
    name: "Forest Trail",
    image: "https://picsum.photos/200/300?random=3",
    description: "A peaceful trail through the dense forest.",
  },
  {
    id: "4",
    name: "Ocean Waves",
    image: "https://picsum.photos/200/300?random=4",
    description: "Waves crashing on the beach at sunset.",
  },
  {
    id: "5",
    name: "Desert Dunes",
    image: "https://picsum.photos/200/300?random=5",
    description: "Golden sand dunes in the heart of the desert.",
  },
  {
    id: "6",
    name: "Lush Garden",
    image: "https://picsum.photos/200/300?random=6",
    description: "A colorful and vibrant garden in full bloom.",
  },
  {
    id: "7",
    name: "Snowy Peak",
    image: "https://picsum.photos/200/300?random=7",
    description: "A snow-covered peak under a clear blue sky.",
  },
  {
    id: "8",
    name: "Countryside",
    image: "https://picsum.photos/200/300?random=8",
    description: "Rolling hills and fields in the countryside.",
  },
  {
    id: "9",
    name: "Tropical Beach",
    image: "https://picsum.photos/200/300?random=9",
    description: "A serene tropical beach with palm trees.",
  },
  {
    id: "10",
    name: "Autumn Leaves",
    image: "https://picsum.photos/200/300?random=10",
    description: "Vibrant autumn leaves on a crisp day.",
  },
];
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover rounded-t-2xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/40 rounded-t-2xl"></div>
      <h3 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h3>
      <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{description}</div>
    </article>
  );
};

export default ProductCard;
