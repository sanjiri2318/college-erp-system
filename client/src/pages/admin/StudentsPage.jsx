import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";

import {
  updateStudent,
  deleteStudent,
} from "../../api/studentApi";

import useStudents from "../../components/student/useStudents";

import StudentPageHeader from "../../components/student/StudentPageHeader";
import StudentTable from "../../components/student/StudentTable";
import StudentEditDialog from "../../components/student/StudentEditDialog";
import StudentDeleteDialog from "../../components/student/StudentDeleteDialog";

function StudentsPage() {
  const {
    students,
    departments,
    loading,
    refresh,
  } = useStudents();

  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [departmentId, setDepartmentId] =
    useState("");

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      semester: "",
      departmentId: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const openEdit = (student) => {
    setSelectedStudent(student);

    setFormData({
      name: student.name,
      phone: student.phone || "",
      semester: student.semester,
      departmentId:
        student.departmentId,
    });

    setEditOpen(true);
  };

  const openDelete = (student) => {
    setSelectedStudent(student);
    setDeleteOpen(true);
  };

  const handleUpdate =
    async () => {
      try {
        await updateStudent(
          selectedStudent.id,
          formData
        );

        setEditOpen(false);

        refresh();
      } catch (err) {
        alert(
          err.response?.data?.message
        );
      }
    };

  const handleDelete =
    async () => {
      try {
        await deleteStudent(
          selectedStudent.id
        );

        setDeleteOpen(false);

        refresh();
      } catch (err) {
        alert(
          err.response?.data?.message
        );
      }
    };

  const filteredStudents =
    students.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        student.regNumber
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesSemester =
        semester === "" ||
        Number(student.semester) ===
          Number(semester);

      const matchesDepartment =
        departmentId === "" ||
        Number(
          student.departmentId
        ) ===
          Number(departmentId);

      return (
        matchesSearch &&
        matchesSemester &&
        matchesDepartment
      );
    });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }
    return (
    <Box p={3}>
      <StudentPageHeader
        students={students}
        departments={departments}
        search={search}
        semester={semester}
        departmentId={departmentId}
        onSearchChange={(e) =>
          setSearch(e.target.value)
        }
        onSemesterChange={(e) =>
          setSemester(e.target.value)
        }
        onDepartmentChange={(e) =>
          setDepartmentId(
            e.target.value
          )
        }
      />

      <StudentTable
        students={filteredStudents}
        onEdit={openEdit}
        onDelete={(id) => {
          const student =
            students.find(
              (s) => s.id === id
            );

          openDelete(student);
        }}
      />

      <StudentEditDialog
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        formData={formData}
        departments={departments}
        onChange={handleChange}
        onUpdate={handleUpdate}
      />

            <StudentDeleteDialog
        open={deleteOpen}
        student={selectedStudent}
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={handleDelete}
      />
    </Box>
  );
}

export default StudentsPage;