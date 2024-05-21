import { Rating } from 'flowbite-react';
import { GetReviews } from '../hooks/useReviews';

export function Reviews() {
  const reviews = GetReviews();
  
  if (!reviews || reviews.length === 0) {
    return <div>No reviews available</div>;
  }
  
  const sortedReviews = [...reviews].sort((a, b) => b.rating - a.rating);
  
  const topFiveReviews = sortedReviews.slice(0, 5);

  return (
    <div className="container mx-auto my-10 rounded-xl py-5  md:w-2/3 lg:w-1/2 flex flex-col items-center  bg-yellow-300">
    <h2 className="text-4xl font-medium mt-10 text-black text-center mb-5">Latest Reviews</h2>
      <ul className="list-none w-1/2 p-0">
        {topFiveReviews.map((review, index) => (
          <li key={index} className="mb-6 p-7 shadow-xl bg-gray-200 text-gray-700 border border-gray-200 flex flex-col items-center rounded-xl"> {/* Added margin bottom for spacing */}
            <strong>{review.name}</strong>
            <Rating>
              {[...Array(5)].map((_, i) => (
                <Rating.Star key={i} filled={i < review.rating} />
              ))}
            </Rating>
            <p> {review.rating} out of 5. </p>
            <br />
            {review.comments}
          </li>
        ))}
      </ul>
    </div>
  );
}
