import type { NextPage } from "next";
import { Banner } from "~~/components/Banner";

const Product: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <Banner />
      </div>
    </>
  );
};

export default Product;
