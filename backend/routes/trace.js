import { Router } from "express";
import auth from "../middleware/authorization.js";
import db from "../models/schema.js";
const router = Router();

router.post("/add", auth, async (req, resp) => {
  const arr = req.query.username.split(" ");
  const bill = req.query.bill;
  const user = await db.findById(req.user);
  const userarr = user.data.frineds;
  arr.forEach((element) => {
    userarr.forEach((ele) => {
      if (ele["username"] == element) {
        ele["owesyou"] = parseInt(ele["owesyou"]) + parseInt(bill);
      }
    });
  });
  arr.forEach(async (element) => {
    const fuser = await db.findOne({
      username: element,
    });
    const fuserarr = fuser.data.frineds;
    fuserarr.forEach((ele) => {
      if (ele["username"] == user.username) {
        ele["youowes"] = parseInt(ele["youowes"]) + parseInt(bill);
      }
    });
    const fcuser = await db.findOneAndUpdate(
      {
        username: element,
      },
      {
        data: {
          frineds: fuserarr,
        },
      }
    );
  });
  const updateowe = await db.findOneAndUpdate(
    {
      username: user.username,
    },
    {
      spend: parseInt(user.spend) + parseInt(bill),
      data: {
        frineds: userarr,
      },
    }
  );
  resp.status(200).json(updateowe);
});

router.get("/spends", auth, async (req, resp) => {
  const user = await db.findById(req.user);
  resp.status(200).json(user.spend);
});

export default router;
