import { useEffect, useState } from "react";

import {
  getExamTypes,
} from "../../api/examTypeApi";

export default function useExamTypes() {
  const [examTypes, setExamTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadExamTypes = async () => {
    const res = await getExamTypes();

    setExamTypes(res.data.data);
  };

  const refresh = async () => {
    setLoading(true);

    await loadExamTypes();

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    examTypes,
    loading,
    refresh,
  };
}