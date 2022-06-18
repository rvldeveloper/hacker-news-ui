import React, { useState, useEffect } from "react";
import PageFrame from "../components/PageFrame";
import StoryCard from "../components/StoryCard";
import HackerNewsService from "../services/HackerNewsService";
import Item from "../types/Item";

/**
 * Component that displays the top 10 random hacker news stories.
 *
 * @returns React Component
 */
const Top10RandomStories = () => {
  // Stores the response from the Hacker News
  // topstories endpoint.
  const [topStories, setTopStories] = useState<number[]>([]);

  // Stores the top 10 random stories.
  const [top10RandomStories, setTop10RandomStories]
    = useState<Item[]>([]);
  
  // A value that indicates if something went wrong
  // while retrieving the response.
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  // A placeholder to mimic for activity
  // indicators when the service is loading
  const dummyActivityIndicators = [1, 2, 3, 4];

  /**
   * When this page loads, it will automatically attempt
   * to call the Hacker News topstories endpoint.
   */
  useEffect(() => {
    retrieveTopStories();
  }, []);

  /**
   * When the result from the topstories API loads,
   * it will attempt to determine a random 10 ids of
   * topstories. Will call each using the item endpoint
   */
  useEffect(() => {
    determineTop10RandomStories();
  }, [topStories]);

  /**
   * Function that calls the topstories endpoint
   * to retrieve the list of item ids.
   */
  const retrieveTopStories = () => {
    HackerNewsService.getAllTopStories()
      .then((response: any) => {
        setTopStories(response.data);
        console.log(response.data);
      })
      .catch((e: any) => {
        console.log(e);
        setIsSuccess(false);
      });
  };

  /**
   * Refreshes the top 10 stories.
   */
  const refreshTopStories = () => {
    retrieveTopStories();
  };

  /**
   * Choose a random 10 from the result of topstories endpoint.
   * It does the following:
   * 
   * 1. Randomly choose 10 item ids.
   * 2. Calls the item endpoint to retrieve the Item object for
   *    each item id.
   * 3. Calls the user endpoint to get the User object.
   * 4. Choose a random graphic from the assets public folder
   * 5. Convert the timestamp to a date string
   * 6. Store all needed information to the Item object
   * 7. Push it to the Items array.
   * 8. Sort Items array by story score.
   * 9. Set state to refresh the page.
   */
  const determineTop10RandomStories = async () => {
    try {
      const items: Item[] = [];

      if (topStories.length > 0) {
        for (let i = 0; i < 10; i++) {
          const randomStoryIndex =
            Math.floor(Math.random() * topStories.length);
          let randomGraphicIndex =
            Math.floor(Math.random() * 6);
          randomGraphicIndex =
            randomGraphicIndex === 0 ? 1 : randomGraphicIndex;

          const itemApiResponse =
            await HackerNewsService.findItemById(
              topStories[randomStoryIndex]
            );
          const item = itemApiResponse.data;
  
          const authorApiResponse =
            await HackerNewsService.findUserById(item.by);
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
      setIsSuccess(false);
    }
  }

  return (
    <PageFrame>
      {
        isSuccess ?
          top10RandomStories.length > 0 ?
            top10RandomStories.map((item, index) => (
              <StoryCard item={item}/>
            ))
            :
            dummyActivityIndicators.map((item, index) => (
              <div className="activity-indicator">
                <div className="load-wraper">
                  <div className="activity"></div>
                </div>
              </div>
            ))
          :
          <div className="error">
            <h3>Oops! Something went wrong. Try to refresh this page.</h3>
          </div>
      }
    </PageFrame>
  );
};

export default Top10RandomStories;
