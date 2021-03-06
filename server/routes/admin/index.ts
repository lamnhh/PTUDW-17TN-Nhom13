import { Router } from "express";

import authRouter from "./auth";
import bookRouter from "./book";
import borrowRouter from "./borrow";
import readerRouter from "./reader";
import teacherRouter from "./teacher";
import returnRouter from "./return";
import categoryRouter from "./category";
import bookRequestRouter from "./book-request";
import updatePasswordRouter from "./update-password";
import createLibrarianRouter from "./create-librarian";

import { requireAdmin } from "../../middlewares/auth";
import { Environment } from "nunjucks";

let router = Router();

router.get("/", function (_, res) {
  res.redirect("/admin/login");
});

router.use(function (_, res, next) {
  let engine: Environment | null = res.app.get("engine");
  engine?.addFilter("activeRoute", function (routes: string[], url: string) {
    return routes.map((route) => "/admin" + route).includes(url) ? "active" : "";
  });
  next();
});

router.use("/", authRouter);

router.use(requireAdmin);
router.use("/book", bookRouter);
router.use("/borrow", borrowRouter);
router.use("/reader", readerRouter);
router.use("/teacher", teacherRouter);
router.use("/return", returnRouter);
router.use("/book-request", bookRequestRouter);
router.use("/", updatePasswordRouter);
router.use("/", createLibrarianRouter);
router.use("/category", categoryRouter);

export default router;
