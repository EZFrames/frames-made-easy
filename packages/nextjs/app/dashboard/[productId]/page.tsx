"use client";

import { FrameMetadataType } from "@coinbase/onchainkit";
import type { NextPage } from "next";
import FrameEditor from "~~/components/FrameEditor";
import FrameRender from "~~/components/FrameRenderer";
import { APP_URL } from "~~/constants";

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
    <div className="grid grid-cols-3 gap-4 pt-2 h-[100%]">
      <div className="col-span-1"></div>
      <div className="col-span-1">
        <FrameRender frame={FrameExample} />
      </div>
      <div className="col-span-1 h-[100%]">
        <FrameEditor frame={FrameExample} />
      </div>
    </div>
  );
};

export default Product;
