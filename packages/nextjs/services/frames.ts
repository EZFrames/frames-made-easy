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
      src: `https://proxy.wrpcd.net/?url=https%3A%2F%2Ffal.media%2Ffiles%2Fkangaroo%2FpCG1MdbuiVonnhx0TLi5Q.jpeg&s=2ccf08f7863c7af641ddaa906919ce073607aa92ed98b2a16320d91e7bc12646`,
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

export const createJourney = async (journey: Omit<Journey, "_id">) => {
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
