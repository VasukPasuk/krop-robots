import {useSearchParams} from "next/navigation";

type Order = "ASC" | "DESC";

type ParamsType = {
  skip: number
  take: number
  order: Order
  order_by: string
}

function usePaginationSearchParams({skip = 0, order = "DESC", order_by = "", take = 10}:ParamsType) {

  const currentParams = useSearchParams()

  const schema:ParamsType = {
    skip: Number(currentParams.get("skip")) || skip,
    take: Number(currentParams.get("take")) || take,
    order: (currentParams.get("order")) as Order || order,
    order_by: currentParams.get("order_by") || order_by,
  }

  return {
    ...schema
  }
}


export default usePaginationSearchParams