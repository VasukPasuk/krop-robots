import {IVariant} from "@/interfaces";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {IconButton, Input, TableCell, TableRow, TextField, Tooltip} from "@mui/material";
import {MdEdit, MdSave} from "react-icons/md";
import {IoMdTrash} from "react-icons/io";
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import formatDate from "@/features/formatDate";
import clsx from "clsx";


const schema = zod.object({
  height: zod.number({coerce: true}).positive().min(1),
  width: zod.number({coerce: true}).positive().min(1),
  length: zod.number({coerce: true}).positive().min(1),
  weight: zod.number({coerce: true}).positive().min(1),
  price: zod.number({coerce: true}).positive().min(1),
  size_label: zod.string(),
})

type FormDataSchema = zod.infer<typeof schema>

type IVariantMap = {
  name: keyof IVariant,
  editable: boolean,
}


export default function AdminManageVariantBar({data}: { data: IVariant }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const {control, reset, handleSubmit, formState: {errors}} = useForm<FormDataSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      height: data.height,
      width: data.width,
      length: data.length,
      price: data.price,
      size_label: data.size_label,
      weight: data.weight
    }
  })
  const client = useQueryClient()

  const variantsMap: IVariantMap[] = Object.keys(data).map((name, index) => ({
    name: name as keyof FormDataSchema,
    editable: !name.match(/id$|product_name$|created_at$|updated_at$/)
  }), {})


  // const setModeHandler = (mode: boolean) => () => {
  //   if (!isEditMode && !mode) toast.warn("Для збереження результатів потрібно увійти у режим редагування", {autoClose: 2500})
  //   if (!isEditMode && mode) {
  //     setIsEditMode(true)
  //     toast.warn("Ви увійшли у режим редагування", {autoClose: 2500})
  //   }
  // }

  const mutate = useMutation({
    mutationFn: ({body, method}:{method: "patch" | "delete", body?: FormDataSchema}) => {
      if (method === "delete") return axiosWithAuth.delete(`/variants/${data.id}`)
      return axiosWithAuth.patch(`/variants/${data.id}`, body)
    },
    onSuccess: async ({data: conf_data, config}) => {
      if (config.method === "patch") toast.success(`Варіант з ID ${data.id} успішно змінено`)
      await client.invalidateQueries({queryKey: ["variants", data.product_name]})
    },
    onError: () => {
      toast.error("Сталася помилка.")
    }
  })


  const onSubmit: SubmitHandler<FormDataSchema> = (data) => {
    mutate.mutate({method: "patch", body: data})
  }

  return (
    <TableRow
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
      className={clsx({"bg-neutral-100/50": isEditMode})}
    >
      {variantsMap
        .map((variant) => (
          <TableCell>
            {variant.editable ? (
              <Controller
                name={variant.name as keyof FormDataSchema}
                control={control}
                render={({field}) => (
                  <Input className="col-span-full w-[10ch]" required
                         placeholder={variant.name} {...field} />
                )}
              />
            ) : (
              <span className="text-nowrap">
                {formatDate(data[variant.name])}
              </span>
            )}
          </TableCell>
        ))
      }
      <TableCell align="center">
        <form className={"flex"} onSubmit={handleSubmit(onSubmit)}>
          {/*<Tooltip title={"Режим редагування"}>*/}
          {/*  <IconButton onClick={setModeHandler(true)}>*/}
          {/*    <MdEdit/>*/}
          {/*  </IconButton>*/}
          {/*</Tooltip>*/}
          <Tooltip title={"Видалити"}>
            <IconButton onClick={() => mutate.mutate({method: "delete"})}>
              <IoMdTrash/>
            </IconButton>
          </Tooltip>
          <Tooltip title={"Зберегти"}>
            <IconButton type="submit">
              <MdSave/>
            </IconButton>
          </Tooltip>
        </form>
      </TableCell>
    </TableRow>
  )
}