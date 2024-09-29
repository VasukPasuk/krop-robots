import {Button, Snackbar} from "@mui/material";
import React from "react";

interface ICustomSnackbarProps {
  title: string
  active: boolean
  onYes: Function
  closeFn: () => void
  onNo?: Function
  onClose?: Function
}


export default function CustomSnackbar({closeFn, onYes, active, title, onNo, onClose}: ICustomSnackbarProps) {
  return (
    <Snackbar
      open={active}
      onClose={() => {
        closeFn()
        onNo && onNo()
        onClose && onClose()
      }}
      message={title}
      action={(<div className="flex gap-2">
        <Button onClick={() => {
          onYes()
          closeFn()
        }} variant="contained" color="success"> Так </Button>
        <Button onClick={() => {
          closeFn()
          onNo && onNo()
        }} variant="contained" color="error"> Ні </Button>
      </div>)}
    />
  )
}