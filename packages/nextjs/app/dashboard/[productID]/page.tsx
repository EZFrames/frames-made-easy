"use client";

import type { NextPage } from "next";
import FrameEditor from "~~/components/FrameEditor";
import FrameRender from "~~/components/FrameRenderer";
import FrameSidebar from "~~/components/FramesSidebar";
import { ProvideProduct } from "~~/providers/ProductProvider";

const Product: NextPage = () => {
  return (
    <ProvideProduct>
      <div className="grid grid-cols-6 gap-4 ">
        <div className="col-span-1">
          <FrameSidebar />
        </div>
        <div className="col-span-3 mt-4">
          <FrameRender />
        </div>
        <div className="col-span-2 ">
          <FrameEditor />
        </div>
      </div>
    </ProvideProduct>
  );
};

export default Product;
