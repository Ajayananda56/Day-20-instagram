import React, { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Trash2 } from "lucide-react";
import "../style/post.scss";
import { usePost } from "../hooks/usePost";

const Post = ({ user, post }) => {
  const { handleToggleLike, handleDeletePost } = usePost();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const profileImage = user?.profileImage || "https://i.pravatar.cc/150?u=" + (user?.username || "unknown");
  const username = user?.username || "unknown_user";
  const caption = post?.caption || "";
  const imageUrl = post?.imgUrl || "";
  const isLiked = post?.isLiked || false;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLikeClick = () => {
    if(post?._id) {
      handleToggleLike(post._id);
    }
  }

  const onDeleteClick = () => {
    setIsMenuOpen(false);
    if(post?._id && window.confirm("Are you sure you want to delete this post?")) {
      handleDeletePost(post._id);
    }
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <img src={profileImage} alt={username} className="avatar" />
          <span className="username">{username}</span>
          <span className="time">• 2h</span>
        </div>
        <div className="options-container" ref={menuRef}>
          <button className="more-options" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MoreHorizontal size={20} />
          </button>
          
          {isMenuOpen && (
            <div className="post-dropdown-menu">
              <button className="menu-item delete" onClick={onDeleteClick}>
                <Trash2 size={16} />
                <span>Delete Post</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {imageUrl && (
        <div className="post-image-container">
          <img src={imageUrl} alt="Post content" />
        </div>
      )}

      <div className="post-actions">
        <div className="left-actions">
          <button className={`action-btn ${isLiked ? "liked" : ""}`} onClick={onLikeClick}>
            <Heart size={24} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2} />
          </button>
          <button className="action-btn">
            <MessageCircle size={24} />
          </button>
          <button className="action-btn">
            <Send size={24} />
          </button>
        </div>
        <div className="right-actions">
          <button className="action-btn">
            <Bookmark size={24} />
          </button>
        </div>
      </div>

      <div className="post-likes">
        1,234 likes
      </div>

      <div className="post-caption">
        <span className="username">{username}</span>
        {caption}
      </div>

      <div className="view-comments">
        View all 124 comments
      </div>

      <div className="add-comment">
        <input type="text" placeholder="Add a comment..." />
        <button className="post-btn">Post</button>
      </div>
    </div>
  );
};

export default Post;
