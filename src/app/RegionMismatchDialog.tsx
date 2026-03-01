"use client";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const US_STORE_URL = "https://geo-two-xi.vercel.app/?site_region=us";
const CA_STORE_URL = "https://geo-two-xi.vercel.app/?site_region=ca";

interface RegionMismatchDialogProps {
  userRegion: string;
  siteRegion: string;
}

export default function RegionMismatchDialog({
  userRegion,
  siteRegion,
}: RegionMismatchDialogProps) {
  const [open, setOpen] = useState(true);

  // On CA site → offer US. On US site → offer Canada. (Derive from site so it’s correct even if user header is wrong.)
  const lookingFor = siteRegion === "ca" ? "US" : "Canada";
  const visitUrl = siteRegion === "ca" ? US_STORE_URL : CA_STORE_URL;
  const visitLabel = siteRegion === "ca" ? "Visit US" : "Visit Canada";

  const handleStayHere = () => {
    document.cookie = `site_preference=${siteRegion}; path=/; max-age=31536000`;
    setOpen(false);
  };

  const handleVisitOther = () => {
    setOpen(false);
    window.location.href = visitUrl;
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
