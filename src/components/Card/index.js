import React from "react";

function Card({ story }) {
  return (
    <div className="flex card">
      <img src={story.avatar} alt="Card" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{`${story.first_name} ${story.last_name}`}</h2>
        <p className="card-description">{story.email}</p>
      </div>
    </div>
  );
}

export default Card;
