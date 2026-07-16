import { useEffect, useState } from "react";

import API from "../../api/axios";

import {
  getResults,
} from "../../api/resultApi";

export default function useResults() {
  const [results, setResults] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [examTypes, setExamTypes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadResults =
    async () => {
      const res =
        await getResults();

      setResults(
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

  const loadSubjects =
    async () => {
      const res =
        await API.get("/subjects");

      setSubjects(
        res.data.data.subjects
      );
    };

  const loadExamTypes =
    async () => {
      const res =
        await API.get("/exam-types");

      setExamTypes(
        res.data.data.data
      );
    };

  const refresh = async () => {
    setLoading(true);

    await Promise.all([
      loadResults(),
      loadStudents(),
      loadSubjects(),
      loadExamTypes(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    results,
    students,
    subjects,
    examTypes,
    loading,
    refresh,
  };
}