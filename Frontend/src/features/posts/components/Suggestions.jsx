import React, { useState } from "react";
import "../style/feed.scss";
import { useUser } from "../../shared/hooks/useUser";

const initialSuggestions = [
  { id: 1, user: "new_friend", image: "https://i.pravatar.cc/150?u=new_friend", status: "Suggested for you", isFollowing: false },
  { id: 2, user: "react_dev", image: "https://i.pravatar.cc/150?u=react_dev", status: "Follows you", isFollowing: false },
  { id: 3, user: "design_guru", image: "https://i.pravatar.cc/150?u=design_guru", status: "Suggested for you", isFollowing: false },
  { id: 4, user: "js_ninja", image: "https://i.pravatar.cc/150?u=js_ninja", status: "New to Instagram", isFollowing: false },
];

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const { handleFollowToggle } = useUser();

  const onFollowClick = async (suggestion) => {
    // Optimistic UI update
    setSuggestions(prev => prev.map(s => {
      if (s.id === suggestion.id) {
        return { ...s, isFollowing: !s.isFollowing };
      }
      return s;
    }));

    try {
      await handleFollowToggle(suggestion.user, suggestion.isFollowing);
    } catch (error) {
      // Revert if API fails
      setSuggestions(prev => prev.map(s => {
        if (s.id === suggestion.id) {
          return { ...s, isFollowing: !s.isFollowing };
        }
        return s;
      }));
    }
  };

  return (
    <div className="suggestions-container">
      <div className="user-profile-snippet">
        <img src="https://i.pravatar.cc/150?u=current_user" alt="current user" />
        <div className="user-info">
          <span className="username">current_user</span>
          <span className="fullname">Your Name</span>
        </div>
        <button className="switch-btn">Switch</button>
      </div>

      <div className="suggestions-header">
        <span>Suggested for you</span>
        <button>See All</button>
      </div>

      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-item">
            <img src={suggestion.image} alt={suggestion.user} />
            <div className="suggestion-info">
              <span className="username">{suggestion.user}</span>
              <span className="status">{suggestion.status}</span>
            </div>
            <button 
              className="follow-btn" 
              onClick={() => onFollowClick(suggestion)}
              style={{ color: suggestion.isFollowing ? "var(--text-secondary)" : "var(--accent-color)" }}
            >
              {suggestion.isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
      
      <div className="footer-links">
        <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p className="copyright">© 2026 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default Suggestions;

