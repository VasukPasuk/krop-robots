"use client"
import { TextField } from "@mui/material";
import { useContext } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import { Controller } from "react-hook-form";

function ContactsForm() {
  const { control } = useContext(CheckoutContext);

  return (
    <div className="p-4 shadow rounded flex flex-col gap-y-4">
      <div className="text-2xl">
        Контактні дані
      </div>
      <div className="w-full flex sm:flex-row sm:gap-x-4 flex-col gap-y-4">
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, ...rest }, fieldState }) => (
            <TextField
              required
              {...rest}
              fullWidth
              variant="filled"
              label="Телефон"
              value={value ?? ""}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { value, ...rest }, fieldState }) => (
            <TextField
              required
              {...rest}
              fullWidth
              variant="filled"
              label="Ел. пошта"
              value={value ?? ""}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />
      </div>
      <div className="w-full flex sm:flex-row sm:gap-x-4 flex-col gap-y-4">
        <Controller
          name="surname"
          control={control}
          render={({ field: { value, ...rest }, fieldState }) => (
            <TextField
              required
              {...rest}
              fullWidth
              variant="filled"
              label="Прізвище"
              value={value ?? ""}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field: { value, ...rest }, fieldState }) => (
            <TextField
              required
              {...rest}
              fullWidth
              variant="filled"
              label="Ім'я"
              value={value ?? ""}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />
      </div>

      <div className="text-xl">
        Локація
      </div>

      <div className="w-full flex sm:flex-row sm:gap-x-4 flex-col gap-y-4">
        <Controller
          name="region"
          control={control}
          render={({ field: { value, ...rest }, fieldState }) => (
            <TextField
              required
              {...rest}
              fullWidth
              variant="filled"
              label="Область"
              value={value ?? ""}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />

        <Controller
          name="locality"
          control={control}
          render={({ field: { value, ...rest }, fieldState }) => (
            <TextField
              required
              {...rest}
              fullWidth
              variant="filled"
              label="Населений пункт"
              value={value ?? ""}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />
      </div>
    </div>
  );
}

export default ContactsForm;
