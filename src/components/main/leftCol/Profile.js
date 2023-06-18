"use client";

import styles from "@/components/main/Main.module.css";
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Wallpaper } from "@/datalist/Wallpaper";
import ToggleContext from "@/context/ToggleContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="bottom" ref={ref} {...props} />;
});

const Profile = () => {
  const {setBgImage} = React.useContext(ToggleContext)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className=" d-flex col-3 justify-content-center pt-2 pointer">
        <Image
          src="/images/profile.jpeg"
          className={styles.profile}
          height={180}
          width={180}
          onClick={handleClickOpen}
        />
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
              style: {
                width: "250px",
                height: "440px",
                maxWidth: "90vw",
                maxHeight: "90vh",
                position: "absolute",
                left: 0,
              },
            }}
          >
            {/* <DialogTitle>انتخاب نصویر پس زمینه</DialogTitle> */}
            <DialogContent>
              <div className="d-flex flex-column">
                <div className="col-12 text-center">
                  <span className="fs-6 text-secondary">
                    انتخاب تصویر پس زمینه
                  </span>
                </div>
                <hr />
                <div className="row row-cols-2">
                  {Wallpaper.map((item, key) => (
                    <div className="col my-2 px-1 pointer" key={item.id}
                    onClick={()=>setBgImage(item.address)}
                    >
                      <Image src={item.address} height={80} width={100} />
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
            <DialogActions>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};
export default Profile;
