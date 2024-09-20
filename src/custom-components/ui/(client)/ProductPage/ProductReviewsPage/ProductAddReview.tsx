"use client"
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, TextField} from "@mui/material";

const schema = zod.object({
  name: zod.string().min(1).trim(),
  surname: zod.string().min(1).trim(),
  body: zod.string().min(1).trim(),
})

type TypeSchema = zod.infer<typeof schema>

interface IProductAddReviewProps {
  product_name: string
}

function ProductAddReview({product_name}: IProductAddReviewProps) {
  const {control, handleSubmit} = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<TypeSchema> = (formData) => {

  }

  return (
    <form className="flex flex-col flex-1">
      <div>
        <Controller control={control} name={"surname"} render={({field}) => (
          <TextField
            {...field}
            label={"Прізвище"}
          />)}/>
        <Controller control={control} name={"name"} render={({field}) => (
          <TextField
            {...field}
            label={"Ім'я"}
          />)}/>
      </div>
      <Controller control={control} name={"body"} render={({field}) => (
        <TextField
          {...field}
          label={"Текст"}
        />)}/>
      <Button
        type="submit"
        color="success"
        variant="contained"
        className="normal-case"
      >
        Створити
      </Button>

    </form>
  )
}

export default ProductAddReview;