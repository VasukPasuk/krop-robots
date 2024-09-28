'use client';
import React, {createContext, FC, useState, ReactNode, SetStateAction, Dispatch} from "react";
import {IVariant} from "@/interfaces";
import {useMutation} from "@tanstack/react-query";
import ProductService from "@/services/product.service";
import {toast} from "react-toastify";
import {Control, FieldValues, UseFormSetValue} from "react-hook-form";


interface ICheckoutContext {
  control:  Control<FieldValues, any>,
  setValue:  UseFormSetValue<FieldValues>
}

export const CheckoutContext = createContext<ICheckoutContext | undefined>(undefined);
