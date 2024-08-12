"use client"
import * as React from 'react';
import {Suspense, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Category} from "@prisma/client";
import usePaginationSearchParams from "@/hooks/usePaginationSearchParams";
import {Button, Card, CircularProgress, IconButton, Input, Modal, Skeleton, TextField, Typography} from "@mui/material";
import {MdEdit} from "react-icons/md";
import {IoMdTrash} from "react-icons/io";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {createCategory, deleteCategory} from "@/services/actions/categoryActions";
import {useRouter} from "next/navigation";


function CategoriesListHead() {
  const [active, setActive] = useState(false)

  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      name: ""
    }
  })

  // const {mutate} = useMutation({
  //   mutationFn: async (data: { name: string }) => {
  //     return await fetch("/api/categories", {
  //       method: "POST",
  //       body: JSON.stringify(data)
  //     })
  //   }
  // })

  const onClickAddButtonHandler = () => {
    setActive(prev => true)
  }
  const onClickDeleteButtonHandler = () => {

  }

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    const result = await createCategory(data.name)
    console.log(result)
  }

  return (
    <>
      <div className="flex items-center justify-end gap-x-4">
        <Button variant={"contained"} onClick={onClickAddButtonHandler}>
          Додати нову категорію
        </Button>
        <Button variant={"contained"} color={"error"} onClick={onClickDeleteButtonHandler}>
          Видалити всі категорії
        </Button>
      </div>
      <Modal className={"flex justify-center items-center"} disableScrollLock open={active}
             onClose={() => setActive(false)}>
        <form className="w-1/5 flex flex-col gap-y-8 py-4 px-8 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant={"h6"} className={"text-center"}>
            Форма категорії
          </Typography>
          <Controller
            name={"name"}
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <Input {...field} required placeholder={"Назва категорії"}/>
            )}
          />
          <Button type={"submit"} variant={"contained"}>
            Додати категорію
          </Button>
        </form>
      </Modal>
    </>

  )
}

function CategoriesListBody({categories}: { categories: Category[] }) {
  const [dataList, setDataList] = useState<Category[]>(categories)

  return (
    <div className={"flex flex-col gap-y-8"}>
      {
        dataList.map((category) => (
          <CategoryItem category={category}/>
        ))
      }
    </div>
  )
}

function CategoryItem({category}: { category: Category }) {
  const [readonlyMode, setReadonlyMode] = useState<boolean>(true)
  const {data, isError, mutate} = useMutation({
    mutationKey: ["category"],
    mutationFn: deleteCategory,
  })

  const onClickEditButtonHandler = () => {
    setReadonlyMode(prev => !prev);
  }
  const onClickDeleteButtonHandler = async () => {
    mutate(category.name)
  }
  return (
    <>
      <Card variant={"outlined"} className={"py-6 px-16"}>
        <form action="" className={"flex gap-x-2 flex-row"}>
          <div className="w-full flex flex-row gap-x-16 ">
            <Input fullWidth defaultValue={category.id} readOnly={readonlyMode}/>
            <Input fullWidth defaultValue={category.name} readOnly={readonlyMode}/>
            <Input fullWidth defaultValue={category.created_at.toString()} readOnly={readonlyMode}/>
            <Input fullWidth defaultValue={category.updated_at.toString()} readOnly={readonlyMode}/>
          </div>
          <div className={"flex flex-row ml-auto w-fit"}>
            <IconButton onClick={onClickEditButtonHandler} color={readonlyMode ? "primary" : "secondary"}>
              <MdEdit/>
            </IconButton>
            <IconButton onClick={onClickDeleteButtonHandler}>
              <IoMdTrash/>
            </IconButton>
          </div>
        </form>
      </Card>
    </>

  )
}


export default function CategoriesList() {
  const {
    data, isFetched, isError, isLoading
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await (await fetch("/api/categories")).json();
    }
  })

  const {take, order_by, order, skip} = usePaginationSearchParams({take: 10, skip: 0, order: "ASC", order_by: ""});

  if (isLoading) {
    return (
      <div className={"w-full flex flex-col items-center justify-center gap-y-4"}>
        <Skeleton variant="rectangular" className={"rounded h-16 w-full mb-8"}/>
        <Skeleton variant="rectangular" className={"rounded h-16 w-full"}/>
        <Skeleton variant="rectangular" className={"rounded h-16 w-full"}/>
        <Skeleton variant="rectangular" className={"rounded h-16 w-full"}/>
        <Skeleton variant="rectangular" className={"rounded h-16 w-full"}/>
      </div>
    )
  }

  return (
    <>
      <CategoriesListHead/>
      <Suspense fallback={<CircularProgress/>}>
        <CategoriesListBody categories={data}/>
      </Suspense>
    </>
  );
}