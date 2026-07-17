import { useEffect, useState } from "react";
import { getAllAuthors } from "../../api/authorApi";

function useAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    try {
      const res = await getAllAuthors();

      console.log("Authors API Response:", res.data);

      let authorData = [];

      if (Array.isArray(res.data)) {
        authorData = res.data;
      } else if (Array.isArray(res.data.data)) {
        authorData = res.data.data;
      } else if (Array.isArray(res.data.data?.data)) {
        authorData = res.data.data.data;
      } else if (Array.isArray(res.data.data?.authors)) {
        authorData = res.data.data.authors;
      }

      setAuthors(authorData);
    } catch (err) {
      console.error(err);
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return {
    authors,
    loading,
    fetchAuthors,
    setAuthors,
  };
}

export default useAuthors;