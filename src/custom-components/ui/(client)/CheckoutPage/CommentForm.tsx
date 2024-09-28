"use client"
import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";
import {useContext} from "react";
import {CheckoutContext} from "@/context/CheckoutContext";

function CommentForm() {
  const { control } = useContext(CheckoutContext);

  return (
    <div className="checkout_block">
      <Controller
        name="comment"
        control={control}
        render={({ field: { value, ...rest }, fieldState }) => (
          <TextField
            {...rest}
            fullWidth
            variant="outlined"
            label="Коментар"
            multiline
            rows={8}
            value={value ?? ""}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
          />
        )}
      />
    </div>
  )
}

export default CommentForm