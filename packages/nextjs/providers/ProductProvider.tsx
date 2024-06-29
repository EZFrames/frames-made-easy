import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { FrameMetadataType } from "@coinbase/onchainkit";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { DEFAULT_FRAME } from "~~/constants";
import { getFrameById } from "~~/services/frames";
import { Frame, Journey } from "~~/types/commontypes";

interface IProductJourney {
  productID: string;
  productQuery: UseQueryResult<Journey | null, Error>;
  updateProduct: UseMutationResult<Journey, Error, Partial<Journey>>;
  frame: Frame | null;
  setFrame: (frame: Frame) => void;
  journey: Journey | null;
  frames: FrameMetadataType[] | undefined;
}

const ProductJourney = createContext<IProductJourney | null>(null);

const useProduct = () => {
  const params = useParams();
  const productID = useMemo(() => {
    return params.productID as string;
  }, [params.productID]);
  const [journey, setJourney] = useState<Journey | null>(null);
  const [frame, setFrame] = useState<Frame | null>({
    _id: "",
    name: "",
    frameJson: DEFAULT_FRAME,
  });

  const frames = useMemo(() => {
    return journey?.frames.map(frame => {
      getFrameById(frame).then(frame => {
        return frame;
      });
    });
  }, [journey]);

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
      return response.json();
    },
    onSuccess: () => {
      productQuery.refetch();
    },
  });

  useEffect(() => {
    if (!productQuery.data) return;
    setJourney(productQuery.data);
    console.log(productQuery.data);
    getFrameById(productQuery.data.frames[0]).then(frame => {
      setFrame(frame);
    });
  }, [productQuery.data]);

  return {
    productID,
    productQuery,
    updateProduct,
    frame,
    setFrame,
    journey,
    frames,
  };
};

export function ProvideProduct({ children }: PropsWithChildren<any>) {
  const value = useProduct();
  return <ProductJourney.Provider value={value}>{children}</ProductJourney.Provider>;
}

export const useProductJourney = () => {
  const context = useContext(ProductJourney);
  if (context == null) {
    throw "Ensure that the component is wrapped inside ProductJourneyProvider";
  }
  return context;
};
