import { useEffect, useState } from "react";

import {
  getAllFeeStructures,
} from "../../api/feeStructureApi";

function useFeeStructures() {
  const [
    feeStructures,
    setFeeStructures,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchFeeStructures =
    async () => {
      try {
        const res =
          await getAllFeeStructures();

        setFeeStructures(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchFeeStructures();
  }, []);

  return {
    feeStructures,
    loading,
    fetchFeeStructures,
    setFeeStructures,
  };
}

export default useFeeStructures;