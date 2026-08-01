import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Stories from "../components/Stories";
import Suggestions from "../components/Suggestions";

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main className="feed-page">
        <div className="feed-container">
          <div className="main-feed">
             <div className="loading-spinner"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="feed-page">
      <div className="feed-container">
        <div className="main-feed">
          <Stories />
          <div className="posts">
            {feed.map(post => {
              return <Post key={post._id || Math.random()} user={post.user} post={post}/>
            })}
          </div>
        </div>
        <div className="right-sidebar">
          <Suggestions />
        </div>
      </div>
    </main>
  );
};

export default Feed;

