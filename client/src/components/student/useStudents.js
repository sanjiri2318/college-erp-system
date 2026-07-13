import { useEffect, useState } from "react";
import {
  getStudents,
} from "../../api/studentApi";
import API from "../../api/axios";

export default function useStudents() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data.students);
  };

  const loadDepartments = async () => {
    const res = await API.get("/departments");
    setDepartments(res.data.data.departments);
  };

  const refresh = async () => {
    setLoading(true);
    await Promise.all([
      loadStudents(),
      loadDepartments(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    students,
    departments,
    loading,
    refresh,
  };
}