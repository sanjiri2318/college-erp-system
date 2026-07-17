import { useEffect, useState } from "react";

import {
  getAllPayments,
} from "../../api/feePaymentApi";

function useFeePayments() {
  const [
    feePayments,
    setFeePayments,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchFeePayments =
    async () => {
      try {
        const res =
          await getAllPayments();

        setFeePayments(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchFeePayments();
  }, []);

  return {
    feePayments,
    loading,
    fetchFeePayments,
    setFeePayments,
  };
}

export default useFeePayments;