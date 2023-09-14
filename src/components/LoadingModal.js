"use client";
import * as React from "react";
import Modal from "@mui/material/Modal";
import AuthContext from "@/context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "transparent",
  // border: "2px solid #000",
  // boxShadow: 24,
  // p: 4,
  border: "none !important",
};

export default function LoadingModal({ show }) {
  const [open, setOpen] = React.useState(show);
  const { loading, setLoading } = React.useContext(AuthContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setLoading(false);
  };
  React.useEffect(() => {}, [loading]);
  return (
    <div>
      <Modal
        open={loading}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="d-flex flex-column h-100 align-items-center justify-content-center">
          <span className="    mx-auto  loader"></span>
          <h6 className="mt-3 text-white fw-bold">درحال پردازش ...</h6>
        </div>
      </Modal>
    </div>
  );
}
