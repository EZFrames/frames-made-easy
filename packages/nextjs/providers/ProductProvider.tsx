import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useParams } from "next/navigation";
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { Journey } from "~~/types/commontypes";

interface IProductJourney {
  productID: string;
  productQuery: UseQueryResult<Journey | null, Error>;
  updateProduct: UseMutationResult<Journey, Error, Partial<Journey>>;
}

const ProductJourney = createContext<IProductJourney | null>(null);

const useProduct = () => {
  const params = useParams();
  const productID = useMemo(() => {
    return params.productID as string;
  }, [params.productID]);

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

  return {
    productID,
    productQuery,
    updateProduct,
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
