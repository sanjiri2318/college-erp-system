import {
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

function StudentFormFields({
  formData,
  departments,
  onChange,
  isEdit = false,
}) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Student Name"
          name="name"
          value={formData.name || ""}
          onChange={onChange}
          required
        />
      </Grid>

      {!isEdit && (
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={onChange}
            required
          />
        </Grid>
      )}

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone || ""}
          onChange={onChange}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          select
          label="Semester"
          name="semester"
          value={formData.semester || ""}
          onChange={onChange}
          required
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <MenuItem
              key={sem}
              value={sem}
            >
              Semester {sem}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={12}>
        <TextField
          fullWidth
          select
          label="Department"
          name="departmentId"
          value={formData.departmentId || ""}
          onChange={onChange}
          required
        >
          {departments.map((dept) => (
            <MenuItem
              key={dept.id}
              value={dept.id}
            >
              {dept.name} ({dept.code})
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

export default StudentFormFields;