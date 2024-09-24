import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import React from "react";
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Paper, TextField} from "@mui/material";
import TagFetcher from "@/services/fetchers/TagFetcher";


const CreateTagSchema = zod.object({
  name: zod.string().min(1).trim(),
  description: zod.string().min(1).trim(),
})

type TypeCreateTagSchema = zod.infer<typeof CreateTagSchema>


function TagsTableForm() {
  const {control, handleSubmit, formState} = useForm({
    resolver: zodResolver(CreateTagSchema)
  })

  const onSubmit: SubmitHandler<Required<TypeCreateTagSchema>> = (data) => {
    tagMutation.mutate(data)
  }


  const client = useQueryClient();

  const tagMutation = useMutation({
    mutationFn: async (data: Required<TypeCreateTagSchema>) => {
      return TagFetcher.create(data)
    },
    onSuccess: async () => {
      await client.invalidateQueries({queryKey: ["tags"]})
    },
    onError: () => toast.error("Сталася помилка!")
  })


  return (
    <Paper variant="outlined" className={"lg:w-1/3 sm:w-1/2 w-full"}>
      <form className="flex flex-col p-6 flex-1 gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({field, fieldState: {error}}) => (
            <TextField
              {...field}
              error={!!error}
              label={"Назва"}
              helperText={error?.message}
              required
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({field, fieldState: {error}}) => (
            <TextField
              {...field}
              error={!!error}
              label={"Опис"}
              helperText={error?.message}
              multiline
              rows={6}
              required
            />
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="normal-case" variant="contained">
            Створити
          </Button>
        </div>
      </form>
    </Paper>
  )
}


export default TagsTableForm