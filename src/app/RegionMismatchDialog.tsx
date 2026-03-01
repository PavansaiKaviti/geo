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

  const lookingFor = userRegion === "us" ? "US" : "Canada";
  const visitUrl = userRegion === "us" ? US_STORE_URL : CA_STORE_URL;
  const visitLabel = userRegion === "us" ? "Visit US" : "Visit Canada";

  const handleStayHere = () => {
    document.cookie = `site_preference=${siteRegion}; path=/; max-age=31536000`;
    setOpen(false);
  };

  const handleVisitOther = () => {
    document.cookie = `site_preference=${userRegion}; path=/; max-age=31536000`;
    setOpen(false);
    window.open(visitUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onClose={handleStayHere} maxWidth="sm" fullWidth>
      <DialogTitle>Looking for {lookingFor}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Click here to visit {lookingFor} or stay here.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleVisitOther}>{visitLabel}</Button>
        <Button onClick={handleStayHere} variant="contained">
          Stay here
        </Button>
      </DialogActions>
    </Dialog>
  );
}
