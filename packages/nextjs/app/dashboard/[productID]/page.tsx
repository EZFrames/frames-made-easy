"use client";

import { FrameMetadataType } from "@coinbase/onchainkit";
import type { NextPage } from "next";
import FrameEditor from "~~/components/FrameEditor";
import FrameRender from "~~/components/FrameRenderer";
import FrameSidebar from "~~/components/FramesSidebar";
import { APP_URL } from "~~/constants";
import { ProvideProduct } from "~~/providers/ProductProvider";

const FrameExample: FrameMetadataType = {
  buttons: [
    {
      label: `Vibes hai ye toh`,
    },
    {
      action: "link",
      label: "OnchainKit",
      target: "https://onchainkit.xyz",
    },
    {
      action: "post_redirect",
      label: "Dog pictures",
    },
  ],
  image: {
    src: `${APP_URL}/park-1.png`,
  },
  postUrl: `${APP_URL}/api/frame`,
  state: {
    time: new Date().toISOString(),
  },
};

const Product: NextPage = () => {
  return (
    <ProvideProduct>
      <div className="grid grid-cols-6 gap-4 pt-2 h-[100%]">
        <div className="col-span-1">
          <FrameSidebar frames={[FrameExample, FrameExample, FrameExample, FrameExample]} />
        </div>
        <div className="col-span-3">
          <FrameRender frame={FrameExample} />
        </div>
        <div className="col-span-2 h-[100%]">
          <FrameEditor />
        </div>
      </div>
    </ProvideProduct>
  );
};

export default Product;
