import { Router } from "express";

const router = Router();

router.get("/", (req, resp) => {
  resp.json({
    success: true,
    message: "Working",
  });
});

export default router;
