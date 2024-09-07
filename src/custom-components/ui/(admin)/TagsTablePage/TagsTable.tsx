"use client"
import {useRouter, useSearchParams} from "next/navigation";
import React from "react";
import queryString from "query-string";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosWithAuth} from "@/services/axios/axios.interceptors";
import {
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField
} from "@mui/material";
import NoDataBlock from "@/custom-components/ui/(shared)/NoDataBlock";
import {ITag} from "@/interfaces";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import TagsTableRow from "@/custom-components/ui/(admin)/TagsTablePage/TagsTableRow";
import {toast} from "react-toastify";


export default function TagsTable() {
  const searchParams = useSearchParams();
  const searchParamsObj = {
    page: searchParams.get("page") || 1,
  }

  const router = useRouter();

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    router.push(location.pathname + "?" + queryString.stringify({page: newPage}), {scroll: false}
    );
  };


  const {isError, error, isFetched, isLoading, data} = useQuery({
    queryKey: ["tags", searchParamsObj.page],
    queryFn: async () => {
      try {
        const result = await axiosWithAuth.get<{
          items: ITag[];
          count: number
        }>("/tags?" + queryString.stringify({page: searchParamsObj.page}));
        return result.data;
      } catch (e) {
        throw new Error(e.message || "Unknown error occurred");
      }
    },
  });

  if (isLoading) return (
    <div className="mt-96 mx-auto">
      <CircularProgress/>
    </div>
  );

  if (isError) return <p>Error: {error.message}</p>;
  if (!data || !data.items) return <p>No data available</p>;


  return (
    <>
      {data.items.length > 0 && <div className={"flex flex-col gap-y-4 items-center"}>
				<TableContainer sx={{width: 1200}} className="rounded border-[1px] border-neutral-100 border-solid">
					<Table sx={{minWidth: 1200}}>
						<TableHead>
							<TableRow>
								<TableCell align="left">ID</TableCell>
								<TableCell align="left">Назва</TableCell>
								<TableCell align="left">Опис</TableCell>
								<TableCell align="left">Дата створення</TableCell>
								<TableCell align="left">Дата оновлення</TableCell>
								<TableCell align="left"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
              {data.items.map((tag) => (
                <TagsTableRow key={tag.name} data={tag}/>
              ))}
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination
					count={Math.ceil(data.count / 10)}
					page={Number(searchParams.get("page")) || 1}
					onChange={handlePageChange}
					size="large"
					shape="rounded"
					siblingCount={1}
					boundaryCount={1}
				/>
			</div>}
      {!data.items.length && <NoDataBlock children={"Тегів поки що не створено"}/>}
      <CreateTagForm/>
    </>
  )
}


const CreateTagSchema = zod.object({
  name: zod.string().min(1).trim(),
  description: zod.string().min(1).trim(),
})

type TypeCreateTagSchema = zod.infer<typeof CreateTagSchema>

function CreateTagForm() {
  const {control, handleSubmit, formState} = useForm({
    resolver: zodResolver(CreateTagSchema)
  })

  const onSubmit: SubmitHandler<TypeCreateTagSchema> = (data) => {
    tagMutation.mutate(data)
  }


  const client = useQueryClient();

  const tagMutation = useMutation({
    mutationFn: async (data: TypeCreateTagSchema) => {
      return axiosWithAuth.post(`/tags`, data)
    },
    onSuccess: async () => {
      await client.invalidateQueries({queryKey: ["tags"]})
    },
    onError: () => toast.error("Сталася помилка!")
  })


  return (
    <Paper variant="outlined" className={"flex w-1/3 h-fit"}>
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