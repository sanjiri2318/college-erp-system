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

function HostelBlockDialog({
  open,
  onClose,
  formData,
  hostels,
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
        Hostel Block Details
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            fullWidth
            label="Block Name"
            name="name"
            value={formData.name}
            onChange={onChange}
          />

          <TextField
            select
            fullWidth
            label="Hostel"
            name="hostelId"
            value={formData.hostelId}
            onChange={onChange}
          >
            {hostels.map((hostel) => (
              <MenuItem
                key={hostel.id}
                value={hostel.id}
              >
                {hostel.name}
              </MenuItem>
            ))}
          </TextField>
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

export default HostelBlockDialog;