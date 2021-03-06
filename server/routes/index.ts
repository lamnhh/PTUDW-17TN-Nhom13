import express from "express";
import { Book } from "../entities/Book";
import { Category } from "../entities/Category";
import EntityHelpers from "../entities/helpers";
import renderTemplate from "../utils/renderTemplate";
import { getRedirectOption } from "./helpers";
import News from "../entities/News";

let router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const options = getRedirectOption(req);
    const books: Book[] = await Book.getMany(10);
    const categories: Category[] = await EntityHelpers.getAll(Category);
    let newsList = await News.find({
      order: { date: "DESC" },
      take: 5,
    });
    renderTemplate(req, res, "index", {
      title: "Homepage",
      books,
      categories,
      newsList,
      ...options,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/guide", function (req, res) {
  renderTemplate(req, res, "guide.html", {
    title: "Hướng dẫn sử dụng",
  });
});

export default router;
