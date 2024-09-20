"use client"

import {useQuery} from "@tanstack/react-query";
import queryString from 'query-string';
import {useRouter} from "next/navigation";
import {CircularProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow}
  from "@mui/material";
import React from "react";
import NoDataBlock from "@/custom-components/ui/(shared)/NoDataBlock";
import CategoryFetcher from "@/services/fetchers/CategoryFetcher";
import {useSpecialQueries} from "@/hooks/useSpecialQueries";
import {CategoryTableRow} from "@/custom-components/ui/(admin)/CategoriesTablePage/CategoriesTableRow";
import {CategoriesTableForm} from "@/custom-components/ui/(admin)/CategoriesTablePage/CategoriesTableForm";




export default function CategoryTable() {
  const {page} = useSpecialQueries()
  const router = useRouter();

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    router.push(location.pathname + "?" + queryString.stringify({page: newPage}), {scroll: false}
    );
  };

  const {isError, error, isLoading, data} = useQuery({
    queryKey: ["categories", page],
    queryFn: () => CategoryFetcher.getMany(queryString.stringify({page: page})),
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
				<TableContainer sx={{width: 1200}} className={"border-solid border-neutral-200 border-[1px] rounded"}>
					<Table sx={{minWidth: 1200}}>
						<TableHead>
							<TableRow>
								<TableCell align="left">Номер</TableCell>
								<TableCell align="left">Назва</TableCell>
								<TableCell align="left">Опис</TableCell>
								<TableCell align="left">Дата створення</TableCell>
								<TableCell align="left">Дата оновлення</TableCell>
								<TableCell align="left"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
              {data.items.map((category) => (
                <CategoryTableRow key={category.name} data={category}/>
              ))}
						</TableBody>
					</Table>
				</TableContainer>
				<Pagination
					count={Math.ceil(data.count / 10)}
					page={page}
					onChange={handlePageChange}
					size="large"
					shape="rounded"
					siblingCount={1}
					boundaryCount={1}
				/>
			</div>}

      {!data.items.length && <NoDataBlock children={"Категорій в наявності немає"}/>}
      <CategoriesTableForm/>
    </>
  )
}
