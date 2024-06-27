import React from "react";
import satori from "next/dist/compiled/@vercel/og/satori";
import { FrameMetadataType } from "@coinbase/onchainkit";
import { Omit } from "viem/chains";
import { Frame, Journey } from "~~/types/commontypes";

export const getFrameById = (id: number) => {
  return {
    buttons: [
      {
        action: "post",
        target: "http://localhost:3000/api/orchestrator/1",
        label: `Home ${id}`,
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
      src: `https://w7.pngwing.com/pngs/666/150/png-transparent-messi-world-cup-2023-thumbnail.png`,
    },
    state: {
      time: new Date().toISOString(),
      journey_id: "1",
      frame_id: "2",
    },
    input: {
      text: "Type here",
    },
  } as FrameMetadataType;
};

export const createFrame = async (frame: Omit<Frame, "_id">) => {
  try {
    const response = await fetch(`/api/frame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frame),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createJourney = async (journey: Partial<Journey>) => {
  const frame = await createFrame({
    frameJson: getFrameById(1),
    name: "Frame 1",
  });
  journey.frames = [frame._id];
  try {
    const response = await fetch(`/api/journey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journey),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const saveFrame = async (frame: Frame) => {
  try {
    const response = await fetch(`/api/frame/${frame._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frame),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const createImageFromHtml = async (html: string) => {
  const svg = await satori(React.createElement("div", { dangerouslySetInnerHTML: { __html: html } }), {
    width: 600,
    height: 400,
    fonts: [],
  });
  return svg;
};
