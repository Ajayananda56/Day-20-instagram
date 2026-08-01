import React from "react";
import "../style/feed.scss";

// Mock data for stories
const mockStories = [
  { id: 1, user: "your_story", image: "https://i.pravatar.cc/150?u=your_story", isUser: true },
  { id: 2, user: "alice", image: "https://i.pravatar.cc/150?u=alice" },
  { id: 3, user: "bob_ross", image: "https://i.pravatar.cc/150?u=bob_ross" },
  { id: 4, user: "charlie_chaplin", image: "https://i.pravatar.cc/150?u=charlie_chaplin" },
  { id: 5, user: "david_bowie", image: "https://i.pravatar.cc/150?u=david_bowie" },
  { id: 6, user: "eve_smith", image: "https://i.pravatar.cc/150?u=eve_smith" },
  { id: 7, user: "frank_sinatra", image: "https://i.pravatar.cc/150?u=frank_sinatra" },
];

const Stories = () => {
  return (
    <div className="stories-container">
      {mockStories.map((story) => (
        <div key={story.id} className="story-item">
          <div className={`story-ring ${story.isUser ? "user-story" : ""}`}>
            <img src={story.image} alt={story.user} />
          </div>
          <span className="story-username">
            {story.isUser ? "Your story" : story.user}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
