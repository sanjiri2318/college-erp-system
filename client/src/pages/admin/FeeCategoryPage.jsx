import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createFeeCategory,
  updateFeeCategory,
  deleteFeeCategory,
} from "../../api/feeCategoryApi";

import useFeeCategories from "../../components/feeCategory/useFeeCategories";

import FeeCategoryPageHeader from "../../components/feeCategory/FeeCategoryPageHeader";
import FeeCategoryStats from "../../components/feeCategory/FeeCategoryStats";
import FeeCategoryTable from "../../components/feeCategory/FeeCategoryTable";
import FeeCategoryDialog from "../../components/feeCategory/FeeCategoryDialog";
import FeeCategoryDeleteDialog from "../../components/feeCategory/FeeCategoryDeleteDialog";

function FeeCategoryPage() {
  const {
    feeCategories,
    loading,
    fetchFeeCategories,
  } = useFeeCategories();

  const [search, setSearch] = useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
    });

  const filteredCategories =
    useMemo(() => {
      return feeCategories.filter((category) =>
        category.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [feeCategories, search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setSelectedCategory(null);

    setFormData({
      name: "",
      description: "",
    });

    setOpenDialog(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);

    setFormData({
      name: category.name || "",
      description:
        category.description || "",
    });

    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    try {
      if (selectedCategory) {
        await updateFeeCategory(
          selectedCategory.id,
          formData
        );
      } else {
        await createFeeCategory(
          formData
        );
      }

      setOpenDialog(false);

      fetchFeeCategories();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.message
      );
    }
  };

  const handleDeleteClick = (
    category
  ) => {
    setSelectedCategory(category);

    setDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      await deleteFeeCategory(
        selectedCategory.id
      );

      setDeleteDialog(false);

      fetchFeeCategories();
    } catch (err) {
      alert(
        err.response?.data?.message ||
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
      <FeeCategoryPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(e.target.value)
        }
        onAdd={handleAdd}
      />

      <FeeCategoryStats
        feeCategories={filteredCategories}
      />

      <FeeCategoryTable
        feeCategories={filteredCategories}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <FeeCategoryDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={!!selectedCategory}
      />

      <FeeCategoryDeleteDialog
        open={deleteDialog}
        category={selectedCategory}
        onClose={() =>
          setDeleteDialog(false)
        }
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default FeeCategoryPage;