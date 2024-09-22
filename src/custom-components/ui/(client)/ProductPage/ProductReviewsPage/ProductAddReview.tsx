"use client"
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, TextField} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ReviewService} from "@/services/review.service";
import {IReview} from "@/interfaces";
import {toast} from "react-toastify";

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
  const {control, handleSubmit, reset} = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      body: ""
    }
  })

  const client = useQueryClient()

  const reviewMutation = useMutation({
    mutationFn: (data:  Pick<IReview, "name" | "surname" | "body" | "product_name">) => ReviewService.create(data),
    onSuccess: () => {
      toast.success(`Коментар до продукту ${product_name} успішно створено!`)
      client.invalidateQueries({
        queryKey: ["products"]
      })
      reset()
    },
    onError: () => {
      toast.error("Створити коментар не вдалося!")
    }
  })

  const onSubmit: SubmitHandler<TypeSchema> = (formData) => {
    reviewMutation.mutate({
      product_name: product_name,
      name: formData.name,
      body: formData.body,
      surname: formData.surname,
    })
  }

  return (
    <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 text-2xl">
        Створити відгук
      </div>
      <div className="flex gap-x-4">
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
          className="mt-4"
          multiline
          rows={6}

        />)}/>
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          color="success"
          variant="contained"
          className="normal-case"
        >
          Створити
        </Button>
      </div>
    </form>
  )
}

export default ProductAddReview;