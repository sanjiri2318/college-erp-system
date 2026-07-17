import { useEffect, useState } from "react";

import {
  getAllFeeCategories,
} from "../../api/feeCategoryApi";

function useFeeCategories() {
  const [
    feeCategories,
    setFeeCategories,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchFeeCategories =
    async () => {
      try {
        const res =
          await getAllFeeCategories();

        setFeeCategories(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchFeeCategories();
  }, []);

  return {
    feeCategories,
    loading,
    fetchFeeCategories,
    setFeeCategories,
  };
}

export default useFeeCategories;