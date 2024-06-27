import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopifyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState<string>("");

  const handleClose = () => {
    setImageUrl("");
    setProductName("");
    setProductDescription("");
    setQuantity(0);
    setPrice("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed z-50 overflow-y-auto w-[100%]">
      <DialogTitle className="text-center">Shopify Connect</DialogTitle>
      <DialogContent className="flex flex-col gap-4 w-[600px]">
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
        <TextField
          label="Product Name"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
        />
        <TextField
          label="Product Description"
          value={productDescription}
          onChange={e => setProductDescription(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          className="bg-gray-100"
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value))}
          variant="outlined"
          fullWidth
          className="bg-gray-100"
          inputProps={{ min: 1 }}
        />
        <TextField
          label="Price"
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
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
