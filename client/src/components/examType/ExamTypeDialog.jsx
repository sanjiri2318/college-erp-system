import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";

function ExamTypeDialog({
  open,
  onClose,
  formData,
  onChange,
  onSubmit,
  isEdit,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {isEdit
          ? "Edit Exam Type"
          : "Add Exam Type"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={onChange}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            label="Internal Marks"
            name="maxInternalMarks"
            type="number"
            value={formData.maxInternalMarks}
            onChange={onChange}
            fullWidth
          />

          <TextField
            label="External Marks"
            name="maxExternalMarks"
            type="number"
            value={formData.maxExternalMarks}
            onChange={onChange}
            fullWidth
          />

          <TextField
            label="Pass Marks"
            name="passMarks"
            type="number"
            value={formData.passMarks}
            onChange={onChange}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.isFinalExam}
                onChange={(e) =>
                  onChange({
                    target: {
                      name: "isFinalExam",
                      value: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Final Exam"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
        >
          {isEdit ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExamTypeDialog;