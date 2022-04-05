import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

function Feed() {
  const [loading, setLoading] = useState(true);
  if (loading)
    return <Spinner message="We are adding new ideas to you feeds!" />;
  return <div>Feed</div>;
}

export default Feed;
