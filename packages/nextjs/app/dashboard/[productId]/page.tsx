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
    <div className="flex items-center flex-col flex-grow pt-10">
      <FrameRender frame={FrameExample} />
      <FrameEditor frame={FrameExample} />
    </div>
  );
};

export default Product;
