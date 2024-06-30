import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { getShopifyProducts } from "~~/services/shopify/fetchProducts";

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

  const onAddButton = async () => {
    const products = await getShopifyProducts(storeName, apiKey);
    console.log(products);
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
