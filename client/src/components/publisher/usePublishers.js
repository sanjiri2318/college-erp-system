import { useEffect, useState } from "react";
import { getAllPublishers } from "../../api/publisherApi";

function usePublishers() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPublishers = async () => {
    try {
      const res = await getAllPublishers();

      console.log("Publishers API Response:", res.data);

      let publisherData = [];

      if (Array.isArray(res.data)) {
        publisherData = res.data;
      } else if (Array.isArray(res.data.data)) {
        publisherData = res.data.data;
      } else if (Array.isArray(res.data.data?.data)) {
        publisherData = res.data.data.data;
      } else if (Array.isArray(res.data.data?.publishers)) {
        publisherData = res.data.data.publishers;
      }

      setPublishers(publisherData);
    } catch (err) {
      console.error(err);
      setPublishers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  return {
    publishers,
    loading,
    fetchPublishers,
    setPublishers,
  };
}

export default usePublishers;