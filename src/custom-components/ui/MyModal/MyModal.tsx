"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import {Modal} from "@mui/material";


interface IMyModalProps {
  children: React.ReactNode
  containerClassname?: string
  onClose?: () => void
}

function MyModal(props: IMyModalProps) {
  const {children,onClose, containerClassname} = props;
  const router = useRouter()
  const onCloseModalHandler = () => {
    router.back()
    onClose && onClose()
  }

  return (
    // <div className="w-dvw h-dvh bg-black fixed top-0 left-0 z-[5000] backdrop-opacity-90 flex items-center justify-center" onClick={onCloseModalHandler}>
    //   <div className={containerClassname} onClick={(e) => e.preventDefault()}>
    //     {children}
    //   </div>
    // </div>
    <Modal
      open={true}
      onClose={onCloseModalHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
      className="flex justify-center items-center"
    >
      <div className={containerClassname + " outline-0"}>
        {children}
      </div>
    </Modal>
  )
}

export default MyModal