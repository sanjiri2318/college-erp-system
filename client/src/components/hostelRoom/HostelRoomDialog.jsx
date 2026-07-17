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

function HostelRoomDialog({
  open,
  onClose,
  formData,
  hostelBlocks,
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
        Hostel Room Details
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            fullWidth
            label="Room Number"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={onChange}
          />

          <TextField
            select
            fullWidth
            label="Hostel Block"
            name="hostelBlockId"
            value={formData.hostelBlockId}
            onChange={onChange}
          >
            {hostelBlocks.map((block) => (
              <MenuItem
                key={block.id}
                value={block.id}
              >
                {block.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            type="number"
            label="Capacity"
            name="capacity"
            value={formData.capacity}
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

export default HostelRoomDialog;