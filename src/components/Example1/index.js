import React, { useState, useEffect, useCallback } from "react";
import Card from "../Card";

function Example1() {
  const [stories, setStories] = useState({
    loading: true,
    list: [],
    count: 0,
  });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 5;

  const getUsers = useCallback(async () => {
    setStories((prev) => ({ ...prev, loading: true }));
    try {
      const resp = await fetch(
        `https://reqres.in/api/users?page=${page}&per_page=${limit}`
      );
      const data = await resp.json();
      setStories((prev) => ({
        loading: false,
        list: [...prev.list, ...data.data],
        count: data.total,
      }));
    } catch {
      setStories((prev) => ({ ...prev, loading: false }));
    }
  }, [page]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (stories.count === stories.list.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [stories.count, stories.list]);

  const scrollListener = useCallback(() => {
    const scrollHeight = window.innerHeight + window.scrollY;
    const bottomHeight = document.documentElement.offsetHeight;
    if (scrollHeight >= bottomHeight) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  if (stories.loading && !stories.list.length) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex">
      <h1>Using Window Scroll Event</h1>
      {stories.list.map((story) => (
        <Card key={story.id} story={story} />
      ))}
      {hasMore && <p className="text-center">Loading...</p>}
      {!hasMore && !stories.loading && <p className="text-center">No more stories...</p>}
    </div>
  );
}

export default Example1;
