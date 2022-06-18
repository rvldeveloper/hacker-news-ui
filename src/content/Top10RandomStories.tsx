import React, { useState, useEffect, useCallback } from "react";
import PageFrame from "../components/PageFrame";
import StoryCard from "../components/StoryCard";
import HackerNewsService from "../services/HackerNewsService";
import Item from "../types/Item";

const Top10RandomStories = () => {
  const [topStories, setTopStories] = useState<number[]>([]);
  const [top10RandomStories, setTop10RandomStories] = useState<Item[]>([]);
  const dummyActivityIndicators = [1, 2, 3, 4];

  useEffect(() => {
    retrieveTopStories();
  }, []);

  useEffect(() => {
    determineTop10RandomStories();
  }, [topStories]);

  const retrieveTopStories = () => {
    HackerNewsService.getAllTopStories()
      .then((response: any) => {
        setTopStories(response.data);
        console.log(response.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const refreshTopStories = () => {
    refreshTopStories();
  };

  const determineTop10RandomStories = async () => {
    try {
      const items: Item[] = [];

      if (topStories.length > 0) {
        for (let i = 0; i < 10; i++) {
          const randomStoryIndex = Math.floor(Math.random() * topStories.length);
          let randomGraphicIndex = Math.floor(Math.random() * 6);
          randomGraphicIndex = randomGraphicIndex === 0 ? 1 : randomGraphicIndex;

          const itemApiResponse = await HackerNewsService.findItemById(topStories[randomStoryIndex]);
          const item = itemApiResponse.data;
  
          const authorApiResponse = await HackerNewsService.findUserById(item.by);
          const author = authorApiResponse.data;

          item.author = author;
          item.graphic = `assets/hacker-img-${randomGraphicIndex}.jpg`;
          item.date = new Date(item.time * 1000).toLocaleString();
  
          items.push(item);
        }

        items.sort((itemA, itemB) => {
          return itemA.score - itemB.score;
        });

        setTop10RandomStories(items);
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <PageFrame>
      {
        top10RandomStories.length > 0 ?
          top10RandomStories.map((item, index) => (
            <StoryCard item={item}/>
          )) :
          dummyActivityIndicators.map((item, index) => (
            <div className="activity-indicator">
              <div className="load-wraper">
                <div className="activity"></div>
              </div>
            </div>
          ))
      }
    </PageFrame>
  );
};

export default Top10RandomStories;
