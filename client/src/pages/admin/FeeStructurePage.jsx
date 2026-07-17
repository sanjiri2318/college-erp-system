import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
} from "../../api/feeStructureApi";

import useFeeStructures from "../../components/feeStructure/useFeeStructures";
import useFeeCategories from "../../components/feeCategory/useFeeCategories";

import FeeStructurePageHeader from "../../components/feeStructure/FeeStructurePageHeader";
import FeeStructureStats from "../../components/feeStructure/FeeStructureStats";
import FeeStructureTable from "../../components/feeStructure/FeeStructureTable";
import FeeStructureDialog from "../../components/feeStructure/FeeStructureDialog";
import FeeStructureDeleteDialog from "../../components/feeStructure/FeeStructureDeleteDialog";

function FeeStructurePage() {
  const {
    feeStructures,
    loading,
    fetchFeeStructures,
  } = useFeeStructures();

  const {
    feeCategories,
  } = useFeeCategories();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedStructure, setSelectedStructure] =
    useState(null);

  const [formData, setFormData] =
    useState({
      feeCategoryId: "",
      amount: "",
      academicYear: "",
    });

  const filteredStructures =
    useMemo(() => {
      return feeStructures.filter(
        (structure) =>
          structure.feeCategory?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [
      feeStructures,
      search,
    ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {
    setSelectedStructure(null);

    setFormData({
      feeCategoryId: "",
      amount: "",
      academicYear: "",
    });

    setOpenDialog(true);
  };

  const handleEdit = (
    structure
  ) => {
    setSelectedStructure(
      structure
    );

    setFormData({
      feeCategoryId:
        structure.feeCategoryId || "",
      amount:
        structure.amount || "",
      academicYear:
        structure.academicYear ||
        "",
    });

    setOpenDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (
          selectedStructure
        ) {
          await updateFeeStructure(
            selectedStructure.id,
            formData
          );
        } else {
          await createFeeStructure(
            formData
          );
        }

        setOpenDialog(false);

        fetchFeeStructures();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const handleDeleteClick = (
    structure
  ) => {
    setSelectedStructure(
      structure
    );

    setDeleteDialog(true);
  };

  const handleDelete =
    async () => {
      try {
        await deleteFeeStructure(
          selectedStructure.id
        );

        setDeleteDialog(false);

        fetchFeeStructures();
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
      <FeeStructurePageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <FeeStructureStats
        feeStructures={
          filteredStructures
        }
      />

      <FeeStructureTable
        feeStructures={
          filteredStructures
        }
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      <FeeStructureDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        feeCategories={
          feeCategories
        }
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={
          !!selectedStructure
        }
      />

      <FeeStructureDeleteDialog
        open={deleteDialog}
        feeStructure={
          selectedStructure
        }
        onClose={() =>
          setDeleteDialog(false)
        }
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default FeeStructurePage;