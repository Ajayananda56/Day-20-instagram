import { useState } from "react";
import { followUser, unfollowUser } from "../services/user.api";

export const useUser = () => {
  const [loading, setLoading] = useState(false);

  const handleFollowToggle = async (username, isFollowing) => {
    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(username);
      } else {
        await followUser(username);
      }
    } catch (error) {
      console.error("Error toggling follow status", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFollowToggle };
};
