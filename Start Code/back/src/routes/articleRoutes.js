import { Router } from "express";
import { getArticles,getAllArticleById, getArticleById, createArticle, updateArticle, deleteArticle } from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/", getArticles);
articleRouter.get("/journalists/:id/articles", getAllArticleById);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;
