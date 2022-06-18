/**
 * Convenience functions for Hacker News API Service.
 */
import axios from "axios";
import Item from '../types/Item';
import User from '../types/User';

const http = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0",
  headers: {
    "Content-type": "application/json"
  }
});

const getAllTopStories = () => {
  return http.get<Array<number>>("/topstories.json");
};

const findItemById = (id: number) => {
  return http.get<Item>(`/item/${id}.json`);
};

const findUserById = (id: string) => {
  return http.get<User>(`user/${id}.json`);
}

const HackerNewsService = {
  getAllTopStories,
  findItemById,
  findUserById
};

export default HackerNewsService;
