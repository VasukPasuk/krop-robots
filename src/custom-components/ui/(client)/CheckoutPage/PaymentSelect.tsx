"use client"
import React, {useContext, useEffect, useState} from "react";
import {CheckoutContext} from "@/context/CheckoutContext";
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Radio, TextField, Tooltip} from "@mui/material";
import {Controller} from "react-hook-form";
import {MdInfo, MdInfoOutline} from "react-icons/md";
import {CustomerCartContext} from "@/context/CustomerCartContext";

export type PAYMENT_TYPE = "Предоплата" | "Повна оплата" | "Рахунок для юридичних осіб"

function PaymentSelect() {
  const {control, setValue} = useContext(CheckoutContext);
  const {cartItems} = useContext(CustomerCartContext)
  const [paymentType, setPaymentType] = useState<PAYMENT_TYPE | false>(false);

  const handleAccordionChange =
    (_paymentType: PAYMENT_TYPE) => (event: React.SyntheticEvent, _isExpanded: boolean) => {
      const isOpened = isExpanded(_paymentType)
      setPaymentType(_isExpanded || isOpened ? _paymentType : false);
    };


  const isExpanded = (_paymentType: PAYMENT_TYPE) => _paymentType === paymentType


  const totalPrice = Object.values(cartItems).reduce((prev, item) => prev + item.amount * item.variant.price, 0)


  useEffect(() => {
    if (paymentType) {
      setValue("payment_type", paymentType)
    }
  }, [paymentType])

  return (
    <div className="checkout_block">
      <div className="text-2xl">
        Оплата
      </div>
      <div>
        <div className="flex flex-col gap-y-2">
          {totalPrice >= 70 && <Accordion
						className="rounded"
						variant="outlined"
						expanded={isExpanded("Предоплата")}
						onChange={handleAccordionChange("Предоплата")}
					>
						<AccordionSummary>
							<div className="flex items-center w-full">
								<Radio
									checked={isExpanded("Предоплата")}
								/>
								<span>
                  Предоплата
                </span>
								<div className="ml-auto ">
									<Tooltip title="Lorem ipsum">
										<IconButton>
											<MdInfoOutline/>
										</IconButton>
									</Tooltip>
								</div>
							</div>

						</AccordionSummary>
					</Accordion>}


          <Accordion
            className="rounded"
            variant="outlined"
            expanded={isExpanded("Повна оплата")}
            onChange={handleAccordionChange("Повна оплата")}
          >
            <AccordionSummary>
              <div className="flex justify-start items-center">
                <Radio
                  checked={isExpanded("Повна оплата")}
                />
                <span>
                Повна оплата
              </span>
              </div>
            </AccordionSummary>
          </Accordion>


          <Accordion
            className="rounded"
            variant="outlined"
            expanded={isExpanded("Рахунок для юридичних осіб")}
            onChange={handleAccordionChange("Рахунок для юридичних осіб")}
          >
            <AccordionSummary>
              <div className="flex justify-start items-center">
                <Radio
                  checked={isExpanded("Рахунок для юридичних осіб")}
                />
                <span>
                  Рахунок для юридичних осіб
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails className="flex gap-x-4">
              <Controller
                name="EDRPOY_CODE"
                control={control}
                render={({field: {value, ...rest}, formState, fieldState}) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Код ЄДРПОУ"
                    value={value ?? ""}
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    {...rest}
                  />
                )}
              />
              <Controller
                name="legal_entity"
                control={control}
                render={({field: {value, ...rest}, formState, fieldState}) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Повна назва юридичної особи"
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
    </div>
  )
}

export default PaymentSelect