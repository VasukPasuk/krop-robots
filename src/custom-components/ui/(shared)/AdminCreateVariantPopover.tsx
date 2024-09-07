import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {toast} from "react-toastify";
import {
  ButtonGroup,
  IconButton,
  Input,
  Select,
  MenuItem,
  TextField,
  Tooltip,
  InputLabel,
  FormControl
} from "@mui/material";
import {FaPlus} from "react-icons/fa6";
import {MdAdd, MdCancel} from "react-icons/md";

interface IAdminCreateVariantPopoverProps {
  anchorRef: HTMLButtonElement
  setAnchorRef: (state: HTMLButtonElement) => HTMLButtonElement | void | null
  productName: string
}


const schema = zod.object({
  height: zod.number({coerce: true}).positive().min(1),
  width: zod.number({coerce: true}).positive().min(1),
  length: zod.number({coerce: true}).positive().min(1),
  weight: zod.number({coerce: true}).positive().min(1),
  price: zod.number({coerce: true}).positive().min(1),
  size_label: zod.string(),
})

type FormDataSchema = zod.infer<typeof schema>


const InputsMap:{label: string, name: keyof FormDataSchema, auto?: boolean}[] = [
  {label: "Висота", name: "height"},
  {label: "Ширина", name: "width"}, {label: "Довжина", name: "length"},
  {label: "Вага", name: "weight"}, {label: "Ціна", name: "price"},
  {label: "Назва", name: "size_label", auto: true}
]

export default function AdminCreateVariantPopover({anchorRef, setAnchorRef, productName}:IAdminCreateVariantPopoverProps) {
  const {control, reset, handleSubmit, formState: {errors}} = useForm<FormDataSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      size_label: "Стандарт"
    }
  })

  const client = useQueryClient()

  const onSubmit: SubmitHandler<FormDataSchema> = (data) => {
    const postData:{product_name: string} & FormDataSchema = {
      ...data,
      product_name: productName,
    }
    mutate.mutate(postData)
  }

  const mutate = useMutation({
    mutationFn: (data:{product_name: string} & FormDataSchema) => {
      return axiosWithAuth.post(`/variants`, data)
    },
    onSuccess: async () => {
      toast.success("Варіант успішно змінено!")
      setAnchorRef(null)
      await client.invalidateQueries({queryKey: ["variants", productName]})
    },
    onError: () => {
      toast.error("Щось не так")
      setAnchorRef(null)
    }
  })

  const open = Boolean(anchorRef);
  return (
    <Popover
      open={open}
      anchorEl={anchorRef}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      disableScrollLock
    >
      <form className={"m-4 w-full flex flex-row gap-x-4"} onSubmit={handleSubmit(onSubmit)}>
        {InputsMap.map(({label, name, auto}) => (
          <Controller
            name={name}
            control={control}
            render={({field}) => !auto ? (
              <TextField required className={"w-[10ch]"} label={label} {...field} />)
              :
              (
                <FormControl className={"w-[15ch]"}>
                  <InputLabel id="variant-name-label">Назва</InputLabel>
                  <Select
                    labelId="variant-name-label"
                    id="demo-select-small"
                    label="Назва"
                    {...field}
                  >
                    <MenuItem value={"Маленький"}>Маленький</MenuItem>
                    <MenuItem value={"Стандарт"}>Стандарт</MenuItem>
                    <MenuItem value={"Великий"}>Великий</MenuItem>
                  </Select>
                </FormControl>
              )
            }
          />
        ))}
        <div className="flex items-center">
          <ButtonGroup>
            <Tooltip title="Зберегти">
              <Button variant="contained" color={"primary"} type="submit">
                <MdAdd size={20}/>
              </Button>
            </Tooltip>
            <Tooltip title="Закрити">
              <Button onClick={() => setAnchorRef(null)} variant="contained" color={"warning"}>
                <MdCancel size={20}/>
              </Button>
            </Tooltip>
          </ButtonGroup>
        </div>
      </form>
    </Popover>
  );
}