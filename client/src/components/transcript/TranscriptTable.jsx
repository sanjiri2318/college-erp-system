import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
} from "@mui/material";

function TranscriptTable({
  transcript,
}) {
  if (!transcript) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography>
          Select a student to view the transcript.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>

      <Paper
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Typography variant="h6">
          {transcript.student.name}
        </Typography>

        <Typography>
          Register No :
          {" "}
          {transcript.student.registerNumber}
        </Typography>

        <Typography>
          Department :
          {" "}
          {transcript.student.department}
        </Typography>

        <Typography
          variant="h5"
          mt={2}
        >
          CGPA :
          {" "}
          {transcript.cgpa}
        </Typography>
      </Paper>

      {transcript.semesters.map(
        (semester) => (
          <Paper
            key={semester.semester}
            sx={{
              mb: 4,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 2,
                background:
                  "#1976d2",
                color: "white",
              }}
            >
              <Typography
                variant="h6"
              >
                Semester{" "}
                {semester.semester}
                {" "}
                | GPA :
                {" "}
                {semester.gpa}
              </Typography>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Code
                  </TableCell>

                  <TableCell>
                    Subject
                  </TableCell>

                  <TableCell>
                    Credits
                  </TableCell>

                  <TableCell>
                    Total
                  </TableCell>

                  <TableCell>
                    %
                  </TableCell>

                  <TableCell>
                    Grade
                  </TableCell>

                  <TableCell>
                    Result
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {semester.subjects.map(
                  (
                    subject
                  ) => (
                    <TableRow
                      key={
                        subject.code
                      }
                    >
                      <TableCell>
                        {
                          subject.code
                        }
                      </TableCell>

                      <TableCell>
                        {
                          subject.name
                        }
                      </TableCell>

                      <TableCell>
                        {
                          subject.credits
                        }
                      </TableCell>

                      <TableCell>
                        {
                          subject.totalMarks
                        }
                      </TableCell>

                      <TableCell>
                        {
                          subject.percentage
                        }
                        %
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={
                            subject.grade
                          }
                          color="primary"
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={
                            subject.resultStatus
                          }
                          color={
                            subject.resultStatus ===
                            "PASS"
                              ? "success"
                              : "error"
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Paper>
        )
      )}
    </Box>
  );
}

export default TranscriptTable;