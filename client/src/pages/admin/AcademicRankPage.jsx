import { useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  generateAcademicRanks,
} from "../../api/academicRankApi";

import useAcademicRanks from "../../components/academicRank/useAcademicRanks";

import AcademicRankToolbar from "../../components/academicRank/AcademicRankToolbar";
import AcademicRankFilters from "../../components/academicRank/AcademicRankFilters";
import AcademicRankStats from "../../components/academicRank/AcademicRankStats";
import AcademicRankTable from "../../components/academicRank/AcademicRankTable";

function AcademicRankPage() {
  const {
    academicRanks,
    loading,
    refresh,
  } = useAcademicRanks();

  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [academicYear, setAcademicYear] =
    useState("");

  const handleGenerate =
    async () => {
      if (!academicYear) {
        alert(
          "Please enter Academic Year."
        );
        return;
      }

      try {
        await generateAcademicRanks({
          academicYear,
        });

        alert(
          "Academic ranks generated successfully."
        );

        refresh();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const filteredRanks =
    academicRanks.filter((rank) => {
      const matchesSearch =
        !search ||
        rank.student?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        rank.student?.regNumber
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesDepartment =
        !department ||
        rank.student?.department?.name
          ?.toLowerCase()
          .includes(
            department.toLowerCase()
          );

      const matchesAcademicYear =
        !academicYear ||
        rank.academicYear
          ?.toLowerCase()
          .includes(
            academicYear.toLowerCase()
          );

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesAcademicYear
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
      <AcademicRankToolbar
        onGenerate={
          handleGenerate
        }
      />

      <AcademicRankFilters
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        department={department}
        onDepartmentChange={(e) =>
          setDepartment(
            e.target.value
          )
        }
        academicYear={
          academicYear
        }
        onAcademicYearChange={(e) =>
          setAcademicYear(
            e.target.value
          )
        }
      />

      <AcademicRankStats
        ranks={filteredRanks}
      />

      <AcademicRankTable
        ranks={filteredRanks}
      />
    </Box>
  );
}

export default AcademicRankPage;