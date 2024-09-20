import {IReview} from "@/interfaces";
import formatDate from "@/features/formatDate";
import {BiSolidUserCircle} from "react-icons/bi";

interface IProductReviewProps {
  review: IReview;
}

function ProductReview({review}: IProductReviewProps) {
  return (
    <li className="flex flex-col flex-1 p-4 h-fit shadow gap-y-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-x-2 items-center justify-start">
          <BiSolidUserCircle className="text-4xl"/>
          <span className="text-xl font-bold">{review.surname}</span>
          <span className="text-xl font-bold">{review.name}</span>
        </div>
        <span className="text-neutral-500/85">{formatDate(review.created_at)}</span>
      </div>
      <div>
        {review.body}
      </div>
    </li>
  )
}

export default ProductReview;