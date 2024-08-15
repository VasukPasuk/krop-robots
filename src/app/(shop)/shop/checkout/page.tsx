"use client";

import React, {useEffect, useState} from 'react';
import {Button, Paper, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {clearProductCart, getAllCartItems, UserCartItemType} from "@/features/localStorageFunctions";
import CheckoutCartItem from "@/app/(shop)/shop/checkout/CheckoutCartItem";

const schema = z.object({
  phone_number: z
    .string()
    .trim()
    .refine((val) => val.startsWith("+380") && val.length === 13, {
      message: "Номер телефона повиненн починатися з +380 і мати 13 символів.",
    }),
  email: z.string().email({message: "Некоректна ел. пошта"}).trim().min(1, {message: "Поле ел. пошта не повинно бути пустим."}),
  name: z.string().min(1, {message: "Поле імені не повинно бути пустим."}).trim(),
  first_surname: z.string().min(1, {message: "Поле прізвище не повинно бути пустим."}).trim(),
  second_surname: z.string().min(1, {message: "Поле по-батькові не повинно бути пустим."}).trim(),
});

type FormData = z.infer<typeof schema>;

function OrderPage() {
  const [cartItems, setCartItems] = useState<{ [key: string]: UserCartItemType }>({})
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
    defaultValues: {
      phone_number: "+380",
      email: "",
      name: "",
      first_surname: "",
      second_surname: "",
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const sendData = async () => {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            items: Object.values(cartItems)
          })
        })
        if (!res.ok) {
          throw new Error("Error response")
        }
        setCartItems(clearProductCart())
        return res.json()
      } catch (e) {
      }
    }
    sendData()
  }

  useEffect(() => {
    setCartItems(getAllCartItems());
  }, []);

  const totalPrice = Object.entries(cartItems).reduce((prev, [key, data]) => prev + (data.variant.price * data.amount), 0)
  const totalItems = Object.keys(cartItems).length

  return (
    <form
      className="container min-h-dvh mx-auto mt-16 md:p-8 grid grid-cols-12 auto-rows-min gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-full">
        <Typography variant="h4">Оформлення замовлення</Typography>
      </div>
      <Paper
        className="col-span-full  min-[1000px]:col-start-1 min-[1000px]:col-end-9 p-4 grid grid-cols-12 auto-rows-min gap-y-8 gap-x-4"
        elevation={3}
        variant="outlined"
      >
        <Typography className="col-span-full" variant="h5">
          Контактні дані
        </Typography>

        <Controller
          name="phone_number"
          control={control}
          rules={{required: true}}
          render={({field}) => (
            <TextField
              helperText={errors.phone_number?.message}
              error={!!errors.phone_number}
              {...field}
              className="col-span-12 lg:col-span-6"
              variant="filled"
              size="small"
              label="Мобільний телефон"
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{required: true}}
          render={({field}) => (
            <TextField
              helperText={errors.email?.message}
              type="email"
              error={!!errors.email}
              {...field}
              className="col-span-12 lg:col-span-6"
              variant="filled"
              size="small"
              label="Електронна пошта"
              required
            />
          )}
        />
        {[
          {label: "Прізвище", field: "first_surname"},
          {label: "Ім'я", field: "name"},
          {label: "По-батькові", field: "second_surname"},
        ].map(({field, label}) => (
          <Controller
            key={field}
            name={field as keyof FormData}
            control={control}
            rules={{required: true}}
            render={({field: controllerField}) => (
              <TextField
                helperText={errors[field as keyof FormData]?.message}
                error={!!errors[field as keyof FormData]}
                {...controllerField}
                className="col-span-12 lg:col-span-4"
                variant="filled"
                size="small"
                label={label}
                required
              />
            )}
          />
        ))}
      </Paper>
      <Paper className="col-span-full min-[1000px]:col-span-4 p-4 flex flex-col gap-y-8" variant="outlined">
        <Typography variant="h6">Деталі</Typography>
        {!Object.keys(cartItems).length && (
          <div className={"flex items-center justify-center py-8 text-center"}>
            <Typography variant="subtitle1">Деталі про поточне замовлення відсутні.</Typography>
          </div>
        )}
        {!!Object.keys(cartItems).length && (
          <>

            <div className="flex flex-row justify-between items-center">
              <Typography variant="subtitle1">{totalItems} товарів на суму</Typography>
              <Typography variant="h6">{totalPrice} грн.</Typography>
            </div>
            <Paper variant="outlined" className="py-6 px-3 flex flex-row justify-between items-center">
              <Typography variant="subtitle1">До сплати</Typography>
              <Typography variant="h5">{totalPrice} грн.</Typography>
            </Paper>
            <div>
              <Button fullWidth type="submit" variant="contained" size="large" color="success" disabled={totalPrice < 300}>
                Підтвердити замовлення
              </Button>
            </div>
          </>
        )}
      </Paper>
      <Paper className="col-span-full min-[1000px]:col-start-1 mix-[1000px]:col-end-9 p-4 flex flex-col" variant="outlined">
        <Typography variant="h6">Товари для замовлення</Typography>
        <div className={"flex flex-col gap-y-4"}>
          {!totalItems && (
            <div className="flex  justify-center items-center py-24 text-neutral-500 ">
              <Typography variant="h6" className={"font-light"}>
                Ваша корзинка пустує
              </Typography>
            </div>
          )}
          {
            Object.entries(cartItems).map(([hashKey, data]) => (
              <CheckoutCartItem key={hashKey} hashKey={hashKey} updateCartStateFn={setCartItems} data={data} />
            ))
          }
        </div>
      </Paper>
    </form>
  );
}

export default OrderPage;
