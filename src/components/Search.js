import React, { useEffect, useState } from "react";
import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

function Search({ searchTerms }) {
  const [pins, setPins] = useState(null);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    if (searchTerms) {
      setLoading(true);
      const query = searchQuery(searchTerms.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerms]);
  return (
    <div>
      {laoding && <Spinner message="Searching for pins..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerms !== "" && !laoding && (
        <div className="mt-10 text text-center text-xl">No pins Found!.</div>
      )}
    </div>
  );
}

export default Search;
