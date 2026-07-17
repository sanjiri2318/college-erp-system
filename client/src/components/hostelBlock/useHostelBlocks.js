import { useEffect, useState } from "react";

import {
  getAllHostelBlocks,
} from "../../api/hostelBlockApi";

function useHostelBlocks() {
  const [hostelBlocks, setHostelBlocks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchHostelBlocks =
    async () => {
      try {
        const res =
          await getAllHostelBlocks();

        setHostelBlocks(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchHostelBlocks();
  }, []);

  return {
    hostelBlocks,
    loading,
    fetchHostelBlocks,
    setHostelBlocks,
  };
}

export default useHostelBlocks;