import {IReview} from "@/interfaces";
import formatDate from "@/features/formatDate";

interface IProductReviewProps {
  review: IReview;
}

function ProductReview({review}: IProductReviewProps) {
  return (
    <li className="flex flex-col flex-1 p-4 min-h-[64px]">
      <div className="flex flex-row justify-between items-center">
        <span>{review.surname} {review.name}</span>
        <span>{formatDate(review.created_at)}</span>
      </div>
      <div>
        {review.body}
      </div>
    </li>
  )
}

export default ProductReview;