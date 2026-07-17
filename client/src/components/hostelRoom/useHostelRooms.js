import { useEffect, useState } from "react";

import {
  getAllHostelRooms,
} from "../../api/hostelRoomApi";

function useHostelRooms() {
  const [hostelRooms, setHostelRooms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchHostelRooms =
    async () => {
      try {
        const res =
          await getAllHostelRooms();

        setHostelRooms(
          res.data.data || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchHostelRooms();
  }, []);

  return {
    hostelRooms,
    loading,
    fetchHostelRooms,
    setHostelRooms,
  };
}

export default useHostelRooms;