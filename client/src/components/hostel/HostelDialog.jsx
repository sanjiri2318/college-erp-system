import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

function HostelDialog({
  open,
  onClose,
  formData,
  onChange,
  onSubmit,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Hostel Details
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            fullWidth
            label="Hostel Name"
            name="name"
            value={formData.name}
            onChange={onChange}
          />

          <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={onChange}
          >
            <MenuItem value="BOYS">
              Boys
            </MenuItem>

            <MenuItem value="GIRLS">
              Girls
            </MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Capacity"
            name="capacity"
            value={formData.capacity}
            onChange={onChange}
          />

          <TextField
            fullWidth
            label="Warden Name"
            name="wardenName"
            value={formData.wardenName}
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default HostelDialog;