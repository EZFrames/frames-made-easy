import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import { APP_URL } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById } from "~~/services/frames";
import { Frame } from "~~/types/commontypes";
import { notification } from "~~/utils/scaffold-eth";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FarcasterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { productQuery, frame } = useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>(undefined);
  const [currentFrameId, setCurrentFrameId] = useState<string>(frame?._id as string);

  useEffect(() => {
    if (productQuery.data) {
      Promise.all(productQuery.data.frames.map(frame => getFrameById(frame)))
        .then(data => setFrames(data))
        .catch(error => console.error("Error fetching frames:", error));
    }
  }, [productQuery.data]);

  useEffect(() => {
    setCurrentFrameId(frame?._id as string);
  }, [frame]);

  const handleClose = () => {
    setFrames(undefined);
    setCurrentFrameId("");
    onClose();
  };
  return (
    <Dialog open={isOpen} onClose={handleClose} className="fixed z-50 overflow-y-auto w-[100%]">
      <DialogTitle className="text-center">Select Starting Frame</DialogTitle>
      <DialogContent className="flex flex-col gap-4 w-[600px]">
        <Select
          id="post"
          value={currentFrameId}
          onChange={e => setCurrentFrameId(e.target.value as string)}
          variant="outlined"
        >
          {frames?.map((frame, index) => (
            <MenuItem key={index} value={frame._id}>
              {frame.name}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" className="text-gray-500 hover:text-gray-600">
          Cancel
        </Button>
        <Button
          className="btn btn-success"
          variant="contained"
          onClick={() => {
            window.navigator.clipboard.writeText(`${APP_URL}/frame/${currentFrameId}`);
            notification.success("Link copied to clipboard");
          }}
        >
          Link For Warpcast
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FarcasterModal;
