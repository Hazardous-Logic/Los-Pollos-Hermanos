import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../libs/firebase";

 export interface ReviewData {
    name: string;
    email: string;
    comments: string;
    rating: number;
  }

export function GetReviews() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  
  useEffect(() => {
    async function fetchReviews() {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      const reviewData = querySnapshot.docs.map((doc) => doc.data() as ReviewData);
      setReviews(reviewData);
    }
    fetchReviews();
  }, [db]);

  return reviews;
}
