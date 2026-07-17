import { useEffect, useState } from "react";

import API from "../../api/axios";

import {
  getCGPAs,
} from "../../api/cgpaApi";

export default function useCGPAs() {
  const [cgpas, setCGPAs] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadCGPAs =
    async () => {
      const res =
        await getCGPAs();

      setCGPAs(
        res.data.data
      );
    };

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

    await Promise.all([
      loadCGPAs(),
      loadStudents(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    cgpas,
    students,
    loading,
    refresh,
  };
}
