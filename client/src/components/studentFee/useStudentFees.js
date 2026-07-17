import { useEffect, useState } from "react";

import {
  getAllStudentFees,
} from "../../api/studentFeeApi";

function useStudentFees() {
  const [
    studentFees,
    setStudentFees,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchStudentFees =
    async () => {
      try {
        const res =
          await getAllStudentFees();

        setStudentFees(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchStudentFees();
  }, []);

  return {
    studentFees,
    loading,
    fetchStudentFees,
    setStudentFees,
  };
}

export default useStudentFees;