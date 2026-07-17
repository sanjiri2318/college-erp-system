import { useEffect, useState } from "react";

import {
  getAllHostelBeds,
} from "../../api/hostelBedApi";

function useHostelBeds() {
  const [hostelBeds, setHostelBeds] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchHostelBeds =
    async () => {
      try {
        const res =
          await getAllHostelBeds();

        setHostelBeds(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchHostelBeds();
  }, []);

  return {
    hostelBeds,
    loading,
    fetchHostelBeds,
    setHostelBeds,
  };
}

export default useHostelBeds;