import { useEffect, useState } from "react";

import { getAcademicRanks } from "../../api/academicRankApi";

export default function useAcademicRanks() {
  const [academicRanks, setAcademicRanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAcademicRanks = async (params = {}) => {
    try {
      const res = await getAcademicRanks(params);

      setAcademicRanks(
        Array.isArray(res.data?.data)
          ? res.data.data
          : []
      );
    } catch (error) {
      console.error(error);
      setAcademicRanks([]);
    }
  };

  const refresh = async (params = {}) => {
    setLoading(true);

    await loadAcademicRanks(params);

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    academicRanks,
    loading,
    refresh,
  };
}