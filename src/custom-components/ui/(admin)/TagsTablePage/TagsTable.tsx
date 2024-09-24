// "use client"
// import {useRouter, useSearchParams} from "next/navigation";
// import React from "react";
// import queryString from "query-string";
// import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
// import {axiosWithAuth} from "@/services/axios/axios.interceptors";
// import {
//   Button,
//   CircularProgress,
//   Pagination,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow, TextField
// } from "@mui/material";
// import NoDataBlock from "@/custom-components/ui/(shared)/NoDataBlock";
// import {ITag} from "@/interfaces";
// import {Controller, SubmitHandler, useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";
// import * as zod from "zod";
// import TagsTableRow from "@/custom-components/ui/(admin)/TagsTablePage/TagsTableRow";
// import {toast} from "react-toastify";
//
//
// export default function TagsTable() {
//   const searchParams = useSearchParams();
//   const searchParamsObj = {
//     page: searchParams.get("page") || 1,
//   }
//
//   const router = useRouter();
//
//   const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
//     router.push(location.pathname + "?" + queryString.stringify({page: newPage}), {scroll: false}
//     );
//   };
//
//
//   const {isError, error, isFetched, isLoading, data} = useQuery({
//     queryKey: ["tags", searchParamsObj.page],
//     queryFn: async () => {
//       try {
//         const result = await axiosWithAuth.get<{
//           items: ITag[];
//           count: number
//         }>("/tags?" + queryString.stringify({page: searchParamsObj.page}));
//         return result.data;
//       } catch (e) {
//         throw new Error(e.message || "Unknown error occurred");
//       }
//     },
//   });
//
//   if (isLoading) return (
//     <div className="mt-96 mx-auto">
//       <CircularProgress/>
//     </div>
//   );
//
//   if (isError) return <p>Error: {error.message}</p>;
//   if (!data || !data.items) return <p>No data available</p>;
//
//
//   return (
//     <>
//       {data.items.length > 0 && <div className={"flex flex-col gap-y-4 items-center"}>
// 				<TableContainer sx={{width: 1200}} className="rounded border-[1px] border-neutral-100 border-solid">
// 					<Table sx={{minWidth: 1200}}>
// 						<TableHead>
// 							<TableRow>
// 								<TableCell align="left">ID</TableCell>
// 								<TableCell align="left">Назва</TableCell>
// 								<TableCell align="left">Опис</TableCell>
// 								<TableCell align="left">Дата створення</TableCell>
// 								<TableCell align="left">Дата оновлення</TableCell>
// 								<TableCell align="left"></TableCell>
// 							</TableRow>
// 						</TableHead>
// 						<TableBody>
//               {data.items.map((tag) => (
//                 <TagsTableRow key={tag.name} data={tag}/>
//               ))}
// 						</TableBody>
// 					</Table>
// 				</TableContainer>
// 				<Pagination
// 					count={Math.ceil(data.count / 10)}
// 					page={Number(searchParams.get("page")) || 1}
// 					onChange={handlePageChange}
// 					size="large"
// 					shape="rounded"
// 					siblingCount={1}
// 					boundaryCount={1}
// 				/>
// 			</div>}
//       {!data.items.length && <NoDataBlock children={"Тегів поки що не створено"}/>}
//       <CreateTagForm/>
//     </>
//   )
// }
//
//






"use client"

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import queryString from 'query-string';
import {CircularProgress, Pagination}
  from "@mui/material";
import React, {useContext} from "react";
import TagFetcher from "@/services/fetchers/TagFetcher";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";
import {CategoriesTableForm} from "@/custom-components/ui/(admin)/CategoriesTablePage/CategoriesTableForm";
import {AdminLayoutContext} from "@/context/AdminLayoutContext";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {ICategory, IColor, ITag} from "@/interfaces";
import {IoTrashBin} from "react-icons/io5";
import clsx from "clsx";
import useQueryFilters from "@/hooks/useQueryFilters";
import TagsTableForm from "@/custom-components/ui/(admin)/TagsTablePage/TagsTableForm";




export default function CategoryTable() {
  const {drawerState, match} = useContext(AdminLayoutContext)
  const {appendSearchQuery} = useQueryFilters()
  const {page} = useSpecialQueries()

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    appendSearchQuery({page: newPage})
  };

  const queryClient = useQueryClient()

  const tagsMutation = useMutation({
    mutationFn: (func: any) => func(),
    onSuccess: ({config}:AxiosResponse) => {
      queryClient.invalidateQueries({queryKey: ["tags"]})
      const method = config.method;
      switch (method) {
        case "patch":
          toast.success("Дані оновлено.")
          break
        default:
          toast.success("Рядок успішно видалено!")
          break
      }
    },
    onError: () => toast.error("Сталася проблема")
  })

  const {isError, error, isLoading, data} = useQuery({
    queryKey: ["tags", page],
    queryFn: async () => {
      return TagFetcher.getAllTags(queryString.stringify({page: page, limit: 10}));
    },
  });

  if (isLoading) return (
    <div className="mt-96 mx-auto">
      <CircularProgress/>
    </div>
  );
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || !data.items) return <p>No data available</p>;


  const columns: GridColDef<ICategory>[] = [
    {
      field: 'id',
      headerName: 'ID',
      type: 'number',
      width: 50,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: 'name',
      headerName: 'Назва',
      type: 'string',
      width: 120,
      editable: true,
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'description',
      headerName: 'Опис',
      type: 'string',
      width: 120,
      editable: true,
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: 'created_at',
      headerName: 'Дата оновлення',
      type: 'dateTime',
      width: 120,
      editable: false,
      flex: 1,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => {
        return new Date(value)
      },
    },
    {
      field: 'updated_at',
      headerName: 'Дата створення',
      type: "dateTime",
      sortable: true,
      width: 120,
      editable: false,
      flex: 1,
      align: "right",
      headerAlign: "right",
      valueGetter: (value) => {
        return new Date(value)
      },
    },
    {
      field: "actions",
      headerName: "Дії",
      type: "actions",
      cellClassName: "actions",
      getActions: ({row}) => {
        return [
          <GridActionsCellItem
            icon={<IoTrashBin/>}
            label="Видалити"
            onClick={() => tagsMutation.mutate(() => TagFetcher.deleteOneByName(row.name))}
            color="inherit"
          />,
        ]
      },
    }
  ];


  const processRowUpdate = (newRow: ITag, oldRow: ITag) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
      return newRow
    }
    tagsMutation.mutate(() => TagFetcher.updateOneByName(newRow.name, newRow))
    return newRow
  }


  return (
    <div className="w-full flex min-[900px]:flex-row p-4 min-[900px]:gap-x-4 flex-col gap-y-4">
      <div className={clsx("flex flex-col flex-1 border-solid border-neutral-200 border-[1px] rounded p-4", {
        "w-[85%]": drawerState && !match,
        "w-[100%]": !drawerState && match
      })}>
        <DataGrid
          rows={data.items}
          columns={columns}
          disableRowSelectionOnClick
          processRowUpdate={processRowUpdate}
          hideFooterPagination
        />
        <div className="flex items-center justify-center p-2">
          <Pagination
            count={Math.ceil(data.count / 10)}
            page={page}
            onChange={handlePageChange}
            size="large"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </div>
      </div>
      <TagsTableForm/>
    </div>
  )
}
