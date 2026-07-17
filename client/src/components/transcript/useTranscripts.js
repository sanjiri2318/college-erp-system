import { useEffect, useState } from "react";

import API from "../../api/axios";

export default function useTranscript() {
  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadStudents =
    async () => {
      const res =
        await API.get("/students");

      setStudents(
        res.data.data.students
      );
    };

  const refresh = async () => {
    setLoading(true);

    await loadStudents();

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    students,
    loading,
    refresh,
  };
}