import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Card";

function Example2() {
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

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (stories.loading && !stories.list.length) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex">
      <h1>Using Infinite Scroll Component</h1>
      <InfiniteScroll
        dataLength={stories.list.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<p className="text-center">Loading...</p>}
        endMessage={<p className="text-center">No more stories...</p>}
      >
        {stories.list.map((story) => (
          <Card key={story.id} story={story} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Example2;
