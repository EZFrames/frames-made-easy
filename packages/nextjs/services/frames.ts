import { DEFAULT_FRAME } from "~~/constants";
import { Frame, Journey } from "~~/types/commontypes";

export const getFrameById = async (id: string) => {
  try {
    const response = await fetch(`/api/frame/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
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
    frameJson: DEFAULT_FRAME,
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
