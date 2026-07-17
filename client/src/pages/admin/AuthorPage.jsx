import { useMemo, useState } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../../api/authorApi";

import useAuthors from "../../components/author/useAuthors";

import AuthorPageHeader from "../../components/author/AuthorPageHeader";
import AuthorStats from "../../components/author/AuthorStats";
import AuthorTable from "../../components/author/AuthorTable";
import AuthorDialog from "../../components/author/AuthorDialog";
import AuthorDeleteDialog from "../../components/author/AuthorDeleteDialog";

function AuthorPage() {
  const {
    authors,
    loading,
    fetchAuthors,
  } = useAuthors();

  const [search, setSearch] =
    useState("");

  const [openDialog, setOpenDialog] =
    useState(false);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [selectedAuthor, setSelectedAuthor] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      biography: "",
    });

  const filteredAuthors =
    useMemo(() => {
      return authors.filter((author) =>
        author.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [authors, search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd = () => {
    setSelectedAuthor(null);

    setFormData({
      name: "",
      biography: "",
    });

    setOpenDialog(true);
  };

  const handleEdit = (author) => {
    setSelectedAuthor(author);

    setFormData({
      name: author.name || "",
      biography:
        author.biography || "",
    });

    setOpenDialog(true);
  };

  const handleSubmit =
    async () => {
      try {
        if (selectedAuthor) {
          await updateAuthor(
            selectedAuthor.id,
            formData
          );
        } else {
          await createAuthor(
            formData
          );
        }

        setOpenDialog(false);

        fetchAuthors();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            err.message
        );
      }
    };

  const handleDeleteClick =
    (author) => {
      setSelectedAuthor(author);

      setDeleteDialog(true);
    };

  const handleDelete =
    async () => {
      try {
        await deleteAuthor(
          selectedAuthor.id
        );

        setDeleteDialog(false);

        fetchAuthors();
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
      <AuthorPageHeader
        search={search}
        onSearchChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        onAdd={handleAdd}
      />

      <AuthorStats
        authors={filteredAuthors}
      />

      <AuthorTable
        authors={filteredAuthors}
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      <AuthorDialog
        open={openDialog}
        onClose={() =>
          setOpenDialog(false)
        }
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={!!selectedAuthor}
      />

      <AuthorDeleteDialog
        open={deleteDialog}
        author={selectedAuthor}
        onClose={() =>
          setDeleteDialog(false)
        }
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default AuthorPage;