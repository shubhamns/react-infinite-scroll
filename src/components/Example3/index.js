import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "../Card";

function Example3() {
  const observerRef = useRef(null);
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
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    }, options);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  useEffect(() => {
    if (stories.count === stories.list.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [stories.count, stories.list]);

  if (stories.loading && !stories.list.length) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex">
      <h1>Using Intersection Observer API</h1>
      {stories.list.map((story) => (
        <Card key={story.id} story={story} />
      ))}
      {hasMore && <p className="text-center">Loading...</p>}
      {!hasMore && !stories.loading && <p className="text-center">No more stories...</p>}
      <div ref={observerRef}></div>
    </div>
  );
}

export default Example3;
