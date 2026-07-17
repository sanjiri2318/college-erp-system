import { useEffect, useState } from "react";

import API from "../../api/axios";

import {
  getSemesterGPAs,
} from "../../api/semesterGPAApi";

export default function useSemesterGPAs() {
  const [semesterGPAs, setSemesterGPAs] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadSemesterGPAs =
    async () => {
      const res =
        await getSemesterGPAs();

      setSemesterGPAs(
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
      loadSemesterGPAs(),
      loadStudents(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    semesterGPAs,
    students,
    loading,
    refresh,
  };
}