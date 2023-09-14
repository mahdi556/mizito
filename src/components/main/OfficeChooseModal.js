"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import QueContext from "@/context/QueContext ";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OfficeChooseModal() {
  const { officeChModal, setOfficeChModal, offices, setOffice } =
    React.useContext(QueContext);
  const [open, setOpen] = React.useState(officeChModal);
  const handleClose = () => setOfficeChModal(false);
  React.useEffect(() => {}, [officeChModal, offices]);
  const router = useRouter();
  return (
    <div>
      <Modal
        open={officeChModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          مطب را انتخاب نمایید
          <div className="d-flex flex-row justify-content-between py-2">
            {offices.map((item, key) => (
              <div className="   " key={item.id}>
                <button
                  className="btn btn-success"
                  type=""
                  onClick={() => {
                    setOffice(item.id);
                    setOfficeChModal(false);
                  }}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
