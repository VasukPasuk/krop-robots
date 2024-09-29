import {Menu, MenuItem} from "@mui/material";
import React from "react";

interface ICustomActionMenu {
  options: {
    [key: string]: {
      label: string
      func: () => void
    }
  },
  handleClose: () => void
  anchorEl:  Element
  open: boolean
}

export default function CustomActionMenu({options, anchorEl, handleClose, open}: ICustomActionMenu) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      disableScrollLock
    >
      {Object.values(options).map(({label, func}) => (
        <MenuItem onClick={func}>
          {label}
        </MenuItem>
      ))}
    </Menu>
  )
}