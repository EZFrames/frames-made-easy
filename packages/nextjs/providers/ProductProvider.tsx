import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { FrameMetadataType } from "@coinbase/onchainkit";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { getFrameById } from "~~/services/frames";
import { Frame, Journey } from "~~/types/commontypes";

interface IProductJourney {
  productID: string;
  productQuery: UseQueryResult<Journey | null, Error>;
  updateProduct: UseMutationResult<Journey, Error, Partial<Journey>>;
  frame: Frame | null;
  setFrame: (frame: Frame) => void;
  journey: Journey | null;
  setCurrentFrame: (frame: FrameMetadataType) => void;
  currentFrame: FrameMetadataType | null;
  createFrame: UseMutationResult<Frame, Error, Omit<Frame, "_id">>;
  saveFrame: UseMutationResult<Frame, Error, Frame>;
  deleteFrame: UseMutationResult<Frame, Error, string>;
  htmlToImage: UseMutationResult<{ image: string }, Error, { html: string }>;
  frames: string[] | undefined;
}

const ProductJourney = createContext<IProductJourney | null>(null);

const useProduct = () => {
  const params = useParams();
  const productID = useMemo(() => {
    return params.productID as string;
  }, [params.productID]);
  const [journey, setJourney] = useState<Journey | null>(null);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [currentFrame, setCurrentFrame] = useState<FrameMetadataType | null>(null);

  const productQuery = useQuery({
    queryKey: ["product", productID],
    queryFn: async () => {
      const response = await fetch(`/api/journey/${productID}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (updateData: Partial<Journey>) => {
      if (!productID) return;
      const response = await fetch(`/api/journey/${productID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      productQuery.refetch();
    },
    onSettled: data => {
      setJourney(data);
    },
  });

  useEffect(() => {
    if (!productQuery.data) return;
    setJourney(productQuery.data);
    if (frame || !productQuery.data.frames) return;
    getFrameById(productQuery.data.frames[0]).then(frame => {
      setFrame(frame);
      setCurrentFrame(frame.frameJson);
    });
  }, [frame, productQuery.data]);

  const createFrame = useMutation({
    mutationFn: async (frame: Omit<Frame, "_id">) => {
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
      const data = await response.json();
      return data;
    },
    onSettled: data => {
      journey?.frames.push(data._id);
      updateProduct.mutateAsync(journey as Journey);
      setFrame(data);
      setCurrentFrame(data.frameJson);
    },
  });

  const saveFrame = useMutation({
    mutationFn: async (frame: Frame) => {
      console.log({ frame });
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
      const data = await response.json();
      return data;
    },
    onSettled: data => {
      setFrame(data);
      setCurrentFrame(data.frameJson);
      productQuery.refetch();
    },
  });

  const deleteFrame = useMutation({
    mutationFn: async (frameId: string) => {
      const response = await fetch(`/api/frame/${frameId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newFrames = journey?.frames.filter(f => f !== frameId);
      if (!newFrames || !journey) return;
      journey.frames = newFrames;
      await updateProduct.mutateAsync(journey);
      const data = await response.json();
      return data;
    },
    onSettled: () => {
      setFrame(null);
      setCurrentFrame(null);
    },
  });

  const htmlToImage = useMutation({
    mutationFn: async (html: string) => {
      const response = await fetch(`/api/htmlToImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    },
  });
  const frames = useMemo(() => {
    return journey?.frames;
  }, [journey]);
  return {
    productID,
    productQuery,
    updateProduct,
    frame,
    setFrame,
    currentFrame,
    setCurrentFrame,
    journey,
    createFrame,
    saveFrame,
    deleteFrame,
    htmlToImage,
    frames,
  };
};

export function ProvideProduct({ children }: PropsWithChildren<any>) {
  const value = useProduct();
  return <ProductJourney.Provider value={value}> {children}</ProductJourney.Provider>;
}

export const useProductJourney = () => {
  const context = useContext(ProductJourney);
  if (context == null) {
    throw "Ensure that the component is wrapped inside ProductJourneyProvider";
  }
  return context;
};
