import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { createJourney } from "~~/services/frames";
import { DEFAULT_SHOPIFY_URL, DEFAULT_SHOPIFY_ACCESS_TOKEN } from "~~/services/shopify/fetchProducts";
import { notification } from "~~/utils/scaffold-eth";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopifyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [storeName, setStoreName] = useState("");
  const [apiKey, setApiKey] = useState<string>("");

  const handleClose = () => {
    setStoreName("");
    setApiKey("");
    onClose();
  };

  React.useEffect(() => {
    setStoreName(DEFAULT_SHOPIFY_URL);
    setApiKey(DEFAULT_SHOPIFY_ACCESS_TOKEN);
  }, []);

  const onAddButton = async () => {
    try {
      const response = await fetch(`/api/shopify/products`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          storeName,
          apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const products = await response.json();
      if (!products || products.length === 0) {
        notification.error("No products found");
        return;
      }

      const createJourneyPromises = products.map((product: any) => {
        const { title, image, body_html, variants } = product;
        const variant = variants[0];
        console.log({ title, image: image.src, body_html, price: variant.price, productId: variant.product_id });

        return createJourney({
          name: title,
          price: variant.price,
          desc: body_html,
          image: image.src,
          quantity: 10,
        })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(`Error creating journey for product ${title}:`, error);
          });
      });

      await Promise.all(createJourneyPromises);
      notification.success("Products added successfully");
      handleClose();
      console.log("All createJourney calls completed");
    } catch (error) {
      console.error("Error in onAddButton:", error);
      notification.error("An error occurred while adding products");
    }
  };
  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed z-50 overflow-y-auto w-[100%]">
      <DialogTitle className="text-center">Shopify Connect</DialogTitle>
      <DialogContent className="flex flex-col gap-4 w-[600px]">
        <TextField
          label="Store URL"
          value={storeName}
          onChange={e => setStoreName(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
        <TextField
          label="API Key"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" className="text-gray-500 hover:text-gray-600">
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("Shopify Connect");
            onAddButton();
          }}
          color="primary"
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShopifyModal;
