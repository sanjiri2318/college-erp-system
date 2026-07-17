import { useEffect, useState } from "react";

import {
  getAllAllocations,
} from "../../api/hostelAllocationApi";

function useHostelAllocations() {
  const [
    hostelAllocations,
    setHostelAllocations,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchHostelAllocations =
    async () => {
      try {
        const res =
          await getAllAllocations();

        setHostelAllocations(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchHostelAllocations();
  }, []);

  return {
    hostelAllocations,
    loading,
    fetchHostelAllocations,
    setHostelAllocations,
  };
}

export default useHostelAllocations;