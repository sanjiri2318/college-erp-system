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

function HostelBedDialog({
  open,
  onClose,
  formData,
  hostelRooms,
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
        Hostel Bed Details
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            fullWidth
            label="Bed Number"
            name="bedNumber"
            value={formData.bedNumber}
            onChange={onChange}
          />

          <TextField
            select
            fullWidth
            label="Hostel Room"
            name="hostelRoomId"
            value={formData.hostelRoomId}
            onChange={onChange}
          >
            {hostelRooms.map((room) => (
              <MenuItem
                key={room.id}
                value={room.id}
              >
                {room.roomNumber}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={onChange}
          >
            <MenuItem value="AVAILABLE">
              Available
            </MenuItem>

            <MenuItem value="OCCUPIED">
              Occupied
            </MenuItem>

            <MenuItem value="MAINTENANCE">
              Maintenance
            </MenuItem>
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

export default HostelBedDialog;