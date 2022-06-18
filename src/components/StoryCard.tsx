import React, { useState, useEffect } from "react";
import Item from "../types/Item";

export interface StoryCardProps {
  item: Item
};

const StoryCard = (props: StoryCardProps) => {
  const { item } = props;

  return (
    <div className="card">
      <img src={item.graphic}/>
      <div className="content">
        <div className="content-header">
          <a href={item.url}>
            <h2>{item.title}</h2>
          </a>
          <p className="story-score">{item.score} points</p>
        </div>
        <div className="content-body">
          <p className="content-author">
            by <span className="author">{item.by}</span> <span className="karma"> ({item.author?.karma} karma points)</span>
          </p>
          <p className="content-timestampt">{item.date}</p>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
