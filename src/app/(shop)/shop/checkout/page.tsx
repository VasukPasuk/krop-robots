"use client";

import React, {useEffect, useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {clearProductCart, getAllCartItems, UserCartItemType} from "@/features/localStorageFunctions";
import CheckoutCartItem from "@/app/(shop)/shop/checkout/CheckoutCartItem";
import {useRouter} from "next/navigation";
import {MdExpandMore} from "react-icons/md";
import {toast} from "react-toastify";

const schema = z.object({
  phone_number: z
    .string()
    .trim()
    .refine((val) => val.startsWith("380") && val.length === 12, {
      message: `Номер телефона повиненн починатися з 380 і мати 12 символів.`,
    }),
  email: z.string().email({message: "Некоректна ел. пошта"}).trim().min(1, {message: "Поле ел. пошта не повинно бути пустим."}),
  name: z.string().min(1, {message: "Поле імені не повинно бути пустим."}).trim(),
  first_surname: z.string().min(1, {message: "Поле прізвище не повинно бути пустим."}).trim(),
  second_surname: z.string().min(1, {message: "Поле по-батькові не повинно бути пустим."}).trim(),
  payment_type: z.string(),
  commentary: z.string().default(""),
  mail_index: z.string().optional(),
  department_index: z.string().optional(),
  delivery_type: z.string().min(1).default("У відділення"),
  locality: z.string().min(1),
  house: z.string().optional(),
  floor: z.string().optional(),
  street: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function OrderPage() {
  const [cartItems, setCartItems] = useState<{ [key: string]: UserCartItemType }>({})
  const [expanded, setExpanded] = React.useState<"NEW_POST_MAIL" | "URK_MAIL" | false>(false);
  const handleChange =
    (panel: "NEW_POST_MAIL" | "URK_MAIL") => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      setValue("delivery_type", "У відділення")
    };

  const router = useRouter()
  const {control, handleSubmit, watch, setValue, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all"
  })


  const onSubmit: SubmitHandler<FormData> = (data) => {
    const sendData = async () => {
      try {
        let deliveryData = {};
        switch (expanded) {
          case "NEW_POST_MAIL":
            deliveryData = {
              locality: data.locality,
              department_index: Number(data.department_index),
            }
            break;
          case "URK_MAIL":
            deliveryData = {
              mail_index: Number(data.mail_index),
              locality: data.locality,
            }
            break;
          default:
            return toast.warn("Ви не обрали доставку.")
        }

        const preparedData = {
          items: Object.values(cartItems),
          phone_number: data.phone_number,
          email: data.email,
          name: data.name,
          first_surname: data.first_surname,
          second_surname: data.second_surname,

          dataJSON: JSON.stringify({
            delivery_company: expanded,
            payment_type: data.payment_type,
            commentary: data.commentary,
            house: data.house,
            floor: data.floor,
            street: data.street,
            delivery_type: data.delivery_type,
            locality: data.locality,
            department_index: Number(data.department_index) || 1,
            mail_index: Number(data.mail_index) || 1,
          })
        }

        console.log(preparedData)
        const res = await fetch("/api/orders", {
          method: "POST",
          body: JSON.stringify(
            preparedData
          )
        })
        // if (!res.ok) {
        //   throw new Error("Error response")
        // }

        // setCartItems(clearProductCart())
        // toast.success("Ваше замовлення успішно оформлено!", {position: "bottom-center", autoClose: false})
        // router.push("/shop/products")
        return res.json()
        // return ""
      } catch (e) {
        toast.error("Ваше замовлення неуспішно оформлено!", {position: "bottom-center", autoClose: false})
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
              type={"tel"}
              defaultValue={"380"}
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
              <Button fullWidth type="submit" variant="contained" size="large" color="success"
                      disabled={totalPrice < 300}>
                Підтвердити замовлення
              </Button>
            </div>
          </>
        )}
      </Paper>


      <Typography variant="h5" className={"col-span-full lg:col-start-1 lg:col-end-9"}>Доставка</Typography>


      <Accordion expanded={expanded === "NEW_POST_MAIL"} variant={"outlined"}
                 onChange={handleChange("NEW_POST_MAIL")}
                 className="rounded overflow-hidden col-span-full lg:col-start-1 lg:col-end-9">
        <AccordionSummary
          expandIcon={<MdExpandMore/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6">Нова Пошта</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name={"delivery_type"}
            control={control}
            render={({field}) => (
              <FormControl className={"w-full"}>
                <InputLabel>Тип доставки</InputLabel>
                <Select {...field} defaultValue={"У відділення"} MenuProps={{disableScrollLock: true}} label={"Спосіб оплати"}>
                  <MenuItem value={"У відділення"}>
                    У відділення
                  </MenuItem>
                  <MenuItem value={"У поштомат"}>
                    У поштомат
                  </MenuItem>
                  <MenuItem value={"Кур'єром"}>
                    Кур'єром
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name={"locality"}
            control={control}
            render={({field}) => (
              <TextField {...field} label={"Населений пункт(область)"} className={"mt-4 w-full"}/>
            )}
          />
          {!(watch("delivery_type") === "Кур'єром") && <Controller
		        name={"department_index"}
		        control={control}
		        render={({field}) => (
              <TextField {...field} type={"number"} label={"Номер відділення"} className={"mt-4 w-full"}/>
            )}
	        />}

          {watch("delivery_type") === "Кур'єром" && <div className={"flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 mt-4 w-full"}>
            {[
              {label: "Будинок", field: "house"},
              {label: "Квартира", field: "floor"},
              {label: "Вулиця", field: "street"},
            ].map(({field, label}) => (
              <Controller
                key={field}
                name={field as keyof FormData}
                control={control}
                render={({field: controllerField}) => (
                  <TextField
                    // helperText={errors[field as keyof FormData]?.message}
                    // error={!!errors[field as keyof FormData]}
                    {...controllerField}
                    variant="outlined"
                    className={"w-full"}
                    size="medium"
                    label={label}
                  />
                )}
              />
            ))}
	        </div>}
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === "URK_MAIL"} variant={"outlined"}
                 onChange={handleChange("URK_MAIL")}
                 className="rounded overflow-hidden col-span-full lg:col-start-1 lg:col-end-9">
        <AccordionSummary
          expandIcon={<MdExpandMore/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6">Укрпошта</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name={"delivery_type"}
            control={control}
            render={({field}) => (
              <FormControl  className={"w-full"}>
                <InputLabel>Тип доставки</InputLabel>
                <Select {...field} defaultValue={"У відділення"} MenuProps={{disableScrollLock: true}} label={"Спосіб оплати"}>
                  <MenuItem value={"У відділення"}>
                    У відділення
                  </MenuItem>
                  <MenuItem value={"Кур'єром"}>
                    Кур'єром
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name={"locality"}
            control={control}
            render={({field}) => (
              <TextField {...field} placeholder={"Населений пункт(область)"} className={"mt-4 w-full"}/>
            )}
          />
          {!(watch("delivery_type") === "Кур'єром") && <Controller
		        name={"mail_index"}
		        control={control}
		        render={({field}) => (
              <TextField {...field} type={"number"} label={"Поштовий індекс"} className={"mt-4 w-full"}/>
            )}
	        />}

          {watch("delivery_type") === "Кур'єром" && <div className={"flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 mt-4 w-full"}>
            {[
              {label: "Будинок", field: "house"},
              {label: "Квартира", field: "floor"},
              {label: "Вулиця", field: "street"},
            ].map(({field, label}) => (
              <Controller
                key={field}
                name={field as keyof FormData}
                control={control}
                render={({field: controllerField}) => (
                  <TextField
                    // helperText={errors[field as keyof FormData]?.message}
                    // error={!!errors[field as keyof FormData]}
                    {...controllerField}
                    variant="outlined"
                    className={"w-full"}
                    size="medium"
                    label={label}
                  />
                )}
              />
            ))}
	        </div>}
        </AccordionDetails>
      </Accordion>

      <Paper className="col-span-full lg:col-start-1 lg:col-end-9 p-4 flex flex-col" variant="outlined">
        <Typography variant="h6">Спосіб оплати та коментар</Typography>
        <div className={"flex flex-col gap-y-4"}>
          <Controller
            name={"payment_type"}
            control={control}
            render={({field}) => (
              <FormControl className={"w-full mt-4"}>
                <InputLabel>Спосіб оплати</InputLabel>
                <Select {...field} MenuProps={{disableScrollLock: true}} label={"Спосіб оплати"}>
                  <MenuItem value={"Предоплата (200 грн.)"}>
                    Предоплата (200 грн.)
                  </MenuItem>
                  <MenuItem value={"Наложний"}>
                    Наложний
                  </MenuItem>
                  <MenuItem value={"Повна оплата"}>
                    Повна оплата
                  </MenuItem>
                  <MenuItem value={"Рахунок для юридичних осіб"}>
                    Рахунок для юридичних осіб
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name={"commentary"}
            control={control}
            render={({field}) => (
              <TextField {...field} multiline label={"Коментар"} rows={5}/>
            )}
          />
        </div>
      </Paper>


      <Paper className="col-span-full min-[1000px]:col-start-1 mix-[1000px]:col-end-9 p-4 flex flex-col"
             variant="outlined">
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
              <CheckoutCartItem key={hashKey} hashKey={hashKey} updateCartStateFn={setCartItems} data={data}/>
            ))
          }
        </div>
      </Paper>
    </form>
  );
}

export default OrderPage;
