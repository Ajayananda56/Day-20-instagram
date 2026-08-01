import React, { useRef, useState } from "react";
import "../style/createpost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";
import { ImagePlus, X } from "lucide-react";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const postImageInputFieldRef = useRef(null);
  const { loading, handleCreatePost } = usePost();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    if (postImageInputFieldRef.current) {
      postImageInputFieldRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = postImageInputFieldRef.current?.files?.[0];
    await handleCreatePost(file, caption);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="create-post-page">
         <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="create-post-page">
      <div className="create-post-card">
        <div className="card-header">
          <h2>Create new post</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="card-body">
          {!preview ? (
            <div 
              className="upload-area"
              onClick={() => postImageInputFieldRef.current?.click()}
            >
              <ImagePlus size={48} className="upload-icon" />
              <h3>Drag photos and videos here</h3>
              <button type="button" className="select-btn">Select from computer</button>
            </div>
          ) : (
            <div className="preview-area">
              <button type="button" className="clear-btn" onClick={clearImage}>
                <X size={20} />
              </button>
              <img src={preview} alt="Preview" />
            </div>
          )}

          <input
            ref={postImageInputFieldRef}
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="postImage"
            id="postImage"
          />
          
          <div className="caption-area">
            <div className="user-snippet">
              <img src="https://i.pravatar.cc/150?u=current_user" alt="user" />
              <span>current_user</span>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows="4"
            />
          </div>

          <div className="card-footer">
            <button 
              type="submit" 
              className="share-btn"
              disabled={!preview}
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

