import { useEffect, useState } from "react";
import API from "../../api/axios";

import {
  getExamSchedules,
} from "../../api/examScheduleApi";

export default function useExamSchedules() {
  const [examSchedules, setExamSchedules] =
    useState([]);

  const [examTypes, setExamTypes] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [faculties, setFaculties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadExamSchedules =
    async () => {
      const res =
        await getExamSchedules();

      setExamSchedules(
        res.data.data
      );
    };

  const loadExamTypes =
    async () => {
      const res =
        await API.get(
          "/exam-types"
        );

      setExamTypes(
        res.data.data.data
      );
    };

  const loadSubjects =
    async () => {
      const res =
        await API.get(
          "/subjects"
        );

      setSubjects(
        res.data.data.subjects
      );
    };

  const loadFaculties =
    async () => {
      const res =
        await API.get(
          "/faculty"
        );

      setFaculties(
        res.data.data.faculty
        );
    };

  const refresh = async () => {
    setLoading(true);

    await Promise.all([
      loadExamSchedules(),
      loadExamTypes(),
      loadSubjects(),
      loadFaculties(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    examSchedules,
    examTypes,
    subjects,
    faculties,
    loading,
    refresh,
  };
}