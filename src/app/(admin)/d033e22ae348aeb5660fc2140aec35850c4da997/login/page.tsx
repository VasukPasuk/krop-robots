"use client"

import React from 'react';
import {Button, Paper, TextField, Typography} from "@mui/material";
import * as zod from "zod"
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";



const schema = zod.object({
  login: zod.string().min(6).max(64).refine((login: string) => Boolean(login.trim())),
  password: zod.string().min(6).max(128).refine((login: string) => Boolean(login.trim())),
})

type FormData = zod.infer<typeof schema>;

function Page() {
  const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-dvh bg-gradient-to-tr from-indigo-600 to-blue-900">
      <Paper elevation={10} className="px-8 py-6 rounded overflow-hidden w-1/4">
        <form
          className="flex flex-col gap-y-4 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" className="mb-8 text-neutral-700">
            Вхід до адмінки
          </Typography>
          <Controller
            name="login"
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <TextField required helperText={errors.login?.message} error={!!errors.login?.message} fullWidth {...field} variant={"filled"} label={"Логін"}/>
            )}/>
          <Controller
            name="password"
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <TextField required helperText={errors.password?.message} error={!!errors.password?.message} fullWidth {...field} variant={"filled"} label={"Пароль"}/>
            )}/>
          <Button size={"large"} type={"submit"} fullWidth variant="contained" className="mt-8">
            Увійти
          </Button>
        </form>
      </Paper>

    </main>
  )
}

export default Page