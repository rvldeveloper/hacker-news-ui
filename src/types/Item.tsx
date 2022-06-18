import User from "./User";

/**
 * The Item object which represents a story.
 */
interface Item {
  id: number,
  title: string,
  url: string,
  score: number,
  time: number,
  date: string,
  by: string,
  author?: User,
  graphic: string
};

export default Item;