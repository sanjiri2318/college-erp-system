import API from "./axios";

/* ===========================
   MARK ENTRIES
=========================== */

export const getMarkEntries = async (
  params = {}
) => {
  const res = await API.get(
    "/mark-entries",
    {
      params,
    }
  );

  return res.data;
};

export const getMarkEntryById =
  async (id) => {
    const res = await API.get(
      `/mark-entries/${id}`
    );

    return res.data;
  };

export const createMarkEntry =
  async (data) => {
    const res = await API.post(
      "/mark-entries",
      data
    );

    return res.data;
  };

export const updateMarkEntry =
  async (id, data) => {
    const res = await API.put(
      `/mark-entries/${id}`,
      data
    );

    return res.data;
  };

export const deleteMarkEntry =
  async (id) => {
    const res = await API.delete(
      `/mark-entries/${id}`
    );

    return res.data;
  };