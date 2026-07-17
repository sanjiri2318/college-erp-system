import { useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  getStudentTranscript,
} from "../../api/transcriptApi";

import useTranscripts from "../../components/transcript/useTranscripts";

import TranscriptPageHeader from "../../components/transcript/TranscriptPageHeader";
import TranscriptTable from "../../components/transcript/TranscriptTable";

function TranscriptPage() {
  const {
    students,
    loading,
  } = useTranscripts();

  const [studentId, setStudentId] =
    useState("");

  const [transcript, setTranscript] =
    useState(null);

  const handleStudentChange =
    async (e) => {
      const id = e.target.value;

      setStudentId(id);

      if (!id) {
        setTranscript(null);
        return;
      }

      try {
        const res =
          await getStudentTranscript(
            id
          );

        setTranscript(
          res.data
        );
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

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
      <TranscriptPageHeader
        students={students}
        studentId={studentId}
        onStudentChange={
          handleStudentChange
        }
      />

      <TranscriptTable
        transcript={transcript}
      />
    </Box>
  );
}

export default TranscriptPage;