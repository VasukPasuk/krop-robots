"use client"
import {Accordion, AccordionDetails, AccordionSummary, Checkbox, Radio, TextField, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {CheckoutContext} from "@/context/CheckoutContext";
import {Controller} from "react-hook-form";

type DELIVERY_UNION = "Доставка Нова Пошта" | "Доставка УКРПОШТА" | "Кур'єром з Нової Пошти"

function DeliveryForm() {
  const {control, setValue} = useContext(CheckoutContext);
  const [delivery, setDelivery] = useState<DELIVERY_UNION | false>(false);

  const handleAccordionChange =
    (_delivery: DELIVERY_UNION) => (event: React.SyntheticEvent, _isExpanded: boolean) => {
      const isOpened = isExpanded(_delivery)
      setDelivery(_isExpanded || isOpened ? _delivery : false);
    };


  useEffect(() => {
    if (delivery) {
      setValue("delivery_type", delivery)
    }
  }, [delivery])

  const isExpanded = (_delivery: DELIVERY_UNION) => _delivery === delivery

  return (
    <div className="checkout_block">
      <div className="text-2xl">
        Доставка
      </div>
      <div className="flex flex-col gap-y-2">
        <Accordion
          className="rounded"
          variant="outlined"
          expanded={isExpanded("Доставка УКРПОШТА")}
          onChange={handleAccordionChange("Доставка УКРПОШТА")}
        >
          <AccordionSummary>
            <div className="flex justify-between items-center w-full">
              <div>
                <Radio
                  checked={isExpanded("Доставка УКРПОШТА")}
                />
                <span>
                  Доставка УКРПОШТА
                </span>
              </div>
              <div>
                від 35 ₴
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Controller
              name="department_address"
              control={control}
              render={({field: {value, ...rest}, formState, fieldState}) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Адрес"
                  placeholder="Приклад: №1, вул. Шевченка, 97"
                  value={value ?? ""}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...rest}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>


        <Accordion
          className="rounded"
          variant="outlined"
          expanded={isExpanded("Доставка Нова Пошта")}
          onChange={handleAccordionChange("Доставка Нова Пошта")}
        >
          <AccordionSummary>
            <div className="flex justify-between items-center w-full">
              <div>
                <Radio
                  checked={isExpanded("Доставка Нова Пошта")}
                />
                <span>
                  Доставка Нова Пошта
                </span>
              </div>
              <div>
                від 50 ₴
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Controller
              name="department_address"
              control={control}
              render={({field: {value, ...rest}, formState, fieldState}) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Адрес"
                  placeholder="Приклад: №1, вул. Шевченка, 97"
                  value={value ?? ""}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...rest}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>


        <Accordion
          className="rounded"
          variant="outlined"
          expanded={isExpanded("Кур'єром з Нової Пошти")}
          onChange={handleAccordionChange("Кур'єром з Нової Пошти")}
        >
          <AccordionSummary>
            <div className="flex justify-between items-center w-full">
              <div>
                <Radio
                  checked={isExpanded("Кур'єром з Нової Пошти")}
                />
                <span>
                  Кур'єром з Нової Пошти
                </span>
              </div>
              <div>
                від 85 ₴
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="grid grid-cols-2 grid-rows-2 gap-4">
            <Controller
              name="street"
              control={control}
              render={({field: {value, ...rest}, formState, fieldState}) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Вулиця"
                  value={value ?? ""}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...rest}
                />
              )}
            />
            <Controller
              name="house"
              control={control}
              render={({field: {value, ...rest}, formState, fieldState}) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Будинок"
                  value={value ?? ""}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...rest}
                />
              )}
            />
            <Controller
              name="appartment"
              control={control}
              render={({field: {value, ...rest}, formState, fieldState}) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Квартира"
                  value={value ?? ""}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...rest}
                />
              )}
            />
            <Controller
              name="floor"
              control={control}
              render={({field: {value, ...rest}, formState, fieldState}) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Поверх"
                  value={value ?? ""}
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...rest}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default DeliveryForm