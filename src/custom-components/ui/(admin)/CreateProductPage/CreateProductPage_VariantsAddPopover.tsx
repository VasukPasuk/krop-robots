import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import * as zod from "zod";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {
  ButtonGroup,
  Select,
  MenuItem,
  TextField,
  Tooltip,
  InputLabel,
  FormControl
} from "@mui/material";
import {MdAdd, MdCancel} from "react-icons/md";
import {useContext} from "react";
import {CreateProductContext} from "@/context/CreateProductContext";
import {IVariant} from "@/interfaces";

interface IAdminCreateVariantPopoverProps {
  anchorRef: HTMLButtonElement
  setAnchorRef: (state: HTMLButtonElement) => HTMLButtonElement | void | null
  productName: string
}


const schema = zod.object({
  height: zod.number({coerce: true}).positive(),
  width: zod.number({coerce: true}).positive(),
  length: zod.number({coerce: true}).positive(),
  weight: zod.number({coerce: true}).positive(),
  price: zod.number({coerce: true}).positive().min(1),
  size_label: zod.string(),
})

type FormDataSchema = zod.infer<typeof schema>


const InputsMap: { label: string, name: keyof FormDataSchema, auto?: boolean }[] = [
  // {label: "Висота", name: "height"},
  // {label: "Ширина", name: "width"}, {label: "Довжина", name: "length"},
  // {label: "Вага", name: "weight"},
  {label: "Ціна", name: "price"},
  {label: "Назва", name: "size_label", auto: true}
]

export default function CreateProductPage_VariantsAddPopover(
  {
    anchorRef, setAnchorRef, productName
  }: IAdminCreateVariantPopoverProps) {
  const {productData, stateFn, setProductData} = useContext(CreateProductContext)

  const {control, handleSubmit} = useForm<FormDataSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      size_label: "Стандарт",
      height: 1,
      length: 1,
      width: 1,
      weight: 1,
    }
  })

  const onSubmit: SubmitHandler<FormDataSchema> = (data) => {
    const haveSameLabel = productData.variants.some((variant) => variant.size_label === data.size_label);
    if (!haveSameLabel) {
      stateFn(prev => ({
        ...prev,
        variants: [...prev.variants, data as Omit<IVariant, "updated_at" | "created_at" | "id">]
      }));
    }
  }


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
                <TextField type="number" required className={"w-[10ch]"} label={label} {...field} />)
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