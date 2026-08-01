import { createPost, getFeed, toggleLike, deletePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  };

  useEffect(()=>{
    handleGetFeed()
  },[])

  const handleCreatePost = async(imageFile, caption)=>{
    setLoading(true)
    const data = await createPost(imageFile, caption)
    setFeed([data.post, ...feed])
    setLoading(false)
  }

  const handleToggleLike = async (postId) => {
    // Optimistic update
    setFeed(currentFeed => 
      currentFeed.map(p => {
        if (p._id === postId) {
          return { ...p, isLiked: !p.isLiked };
        }
        return p;
      })
    );
    
    try {
      await toggleLike(postId);
    } catch (error) {
      // Revert on failure
      console.error("Failed to toggle like", error);
      setFeed(currentFeed => 
        currentFeed.map(p => {
          if (p._id === postId) {
            return { ...p, isLiked: !p.isLiked }; // revert back
          }
          return p;
        })
      );
    }
  }

  const handleDeletePost = async (postId) => {
    const previousFeed = [...feed];
    // Optimistic update
    setFeed(currentFeed => currentFeed.filter(p => p._id !== postId));
    
    try {
      await deletePost(postId);
    } catch (error) {
      // Revert on failure
      console.error("Failed to delete post", error);
      setFeed(previousFeed);
    }
  }

  return { loading, feed, post, handleGetFeed, handleCreatePost, handleToggleLike, handleDeletePost };
};

