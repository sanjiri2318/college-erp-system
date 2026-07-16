import { useEffect, useState } from "react";

import API from "../../api/axios";

import {
  getMarkEntries,
} from "../../api/markEntryApi";

export default function useMarkEntries() {
  const [markEntries, setMarkEntries] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [faculties, setFaculties] =
    useState([]);

  const [examTypes, setExamTypes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadMarkEntries =
    async () => {
      const res =
        await getMarkEntries();

      setMarkEntries(
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

  const loadFaculties =
    async () => {
      const res =
        await API.get("/faculty");

      setFaculties(
        res.data.data.faculty
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
      loadMarkEntries(),
      loadStudents(),
      loadSubjects(),
      loadFaculties(),
      loadExamTypes(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    markEntries,
    students,
    subjects,
    faculties,
    examTypes,
    loading,
    refresh,
  };
}