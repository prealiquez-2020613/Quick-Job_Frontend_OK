import { useState, useEffect } from 'react';
import { getReviewsByWorkerId } from '../../../services/api';

export const useGetReviews = (workerId) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getReviewsByWorkerId(workerId);
      if (response.error) {
        setError(response.message);
      } else {
        setReviews(response.reviews);
      }
      setIsLoading(false);
    };

    fetchReviews();
  }, [workerId]);

  return { reviews, isLoading, error };
};