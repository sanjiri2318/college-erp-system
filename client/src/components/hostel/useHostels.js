import { useEffect, useState } from "react";

import {
  getAllHostels,
} from "../../api/hostelApi";

function useHostels() {
  const [hostels, setHostels] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchHostels = async () => {
    try {
      const res =
        await getAllHostels();

      setHostels(
        res.data.data || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  return {
    hostels,
    loading,
    fetchHostels,
    setHostels,
  };
}

export default useHostels;