"use client";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const US_STORE_URL =
  "https://myecommerce-bahy2mt3k-pavansai-kavitis-projects.vercel.app/";
const CA_STORE_URL = "https://myecommerce-sigma.vercel.app/";

interface RegionMismatchDialogProps {
  userRegion: string;
  siteRegion: string;
}

export default function RegionMismatchDialog({
  userRegion,
  siteRegion,
}: RegionMismatchDialogProps) {
  const [open, setOpen] = useState(true);

  const isUserUS = userRegion === "us";
  const lookingFor = siteRegion === "ca" ? "Canada" : "US";
  const visitUrl = siteRegion === "ca" ? CA_STORE_URL : US_STORE_URL;
  const visitLabel = siteRegion === "ca" ? "Visit Canada" : "Visit US";

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Looking for {lookingFor}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Click here to visit {lookingFor} or stay here.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button href={visitUrl} target="_blank" rel="noopener noreferrer">
          {visitLabel}
        </Button>
        <Button onClick={handleClose} variant="contained">
          Stay here
        </Button>
      </DialogActions>
    </Dialog>
  );
}
