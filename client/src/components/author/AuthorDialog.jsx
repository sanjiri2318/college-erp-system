import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

function AuthorDialog({
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
      maxWidth="md"
    >
      <DialogTitle>
        {isEdit
          ? "Edit Author"
          : "Add Author"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            fullWidth
            label="Author Name"
            name="name"
            value={formData.name}
            onChange={onChange}
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Biography"
            name="biography"
            value={formData.biography}
            onChange={onChange}
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
          {isEdit
            ? "Update"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AuthorDialog;