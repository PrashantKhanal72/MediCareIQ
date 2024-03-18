import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius : "16px",
  p: 2,
};

const AddModal = function ({ open, onClose, children,title }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <p className="font-bold text-center text-[17px] leading-[22px] tracking-[-0.408px]">{title}</p>
          {children}
      </Box>
    </Modal>
  );
};

export default AddModal;
