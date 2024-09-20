"use client"


import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {Button, Paper, TextField, Typography} from "@mui/material";
import AuthFetcher from "@/services/fetchers/AuthFetcher";
import {toast} from "react-toastify";
import {useContext} from "react";
import {AuthContext} from "@/context/AuthContext";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {ADMIN_URLS, TOKEN_NAMES} from "@/constants/enums";


const schema = zod.object({
  login: zod.string().trim().min(6, { message: "Логін повинен містити 6 символів і більше."}),
  password: zod.string().trim().min(8, { message: "Пароль повинен містити 8 символів і більше."}),

})

type FormDataType = zod.infer<typeof schema>

export default function AdminLoginForm() {
  const {setToken, setUser} = useContext(AuthContext)
  const router = useRouter()
  const {control, handleSubmit} = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  })

  const onSubmit:SubmitHandler<FormDataType> = (data) => {
    const fetch = async () => {
      try {
        const result = await AuthFetcher.login({login: data.login, password: data.password})
        console.log(result.data)
        setToken(result.data.accessToken)
        setUser(result.data.user)
        localStorage.setItem("accessToken", result.data.accessToken)
        router.push(ADMIN_URLS.BASE_ADMIN_URL)
      } catch (e) {
        const error = e as AxiosError
        toast.error(error.response.status === 401 ? "Некоректні дані для входу." : "Помилка.")
      }
    }
    fetch()
  }


  return (
    <form className="min-w-96" onSubmit={handleSubmit(onSubmit)}>
      <Paper className="px-8 py-4 flex flex-1 flex-col gap-y-4 w-full">
        <Typography variant="h4" component="p" className={"mb-8 mt-4 text-center"}>
          Login
        </Typography>
        <Controller
          control={control}
          render={({field, fieldState, formState}) => (
            <TextField error={!!fieldState.error} helperText={fieldState?.error?.message} label="Логін" {...field}/>
          )}
          name={"login"}
        />
        <Controller
          control={control}
          render={({field, fieldState, formState}) => (
            <TextField error={!!fieldState.error} helperText={fieldState?.error?.message} label="Пароль" {...field}/>
          )}
          name={"password"}
        />
        <div className="flex justify-end">
          <Button className="normal-case mt-8" type="submit" variant="contained" color="success" size="large">
            Увійти
          </Button>
        </div>
      </Paper>
    </form>
  )
}