import { json, Router } from "express";
import auth from "../middleware/authorization.js";
import db from "../models/schema.js";

const router = Router();

router.post("/add", auth, async (req, resp) => {
  let flag = -1;
  const { username } = req.body;
  const user = await db.findById(req.user);
  if (user.username == username.toLowerCase()) {
    return resp.status(401).json("You can't add yourself");
  }
  user.data.frineds.forEach((ele) => {
    if (ele["username"] == username.toLowerCase()) {
      flag = 1;
      return;
    }
  });
  if (flag == 1) {
    return resp.status(401).json("Already in your frined List");
  }
  const fusername = await db.findOne({
    username: username,
  });
  if (fusername == null) {
    return resp.status(401).json("Username Dosen't exist");
  }
  const addfrined = await db.findOneAndUpdate(
    {
      username: user.username,
    },
    {
      data: {
        frineds: [
          ...user.data.frineds,
          {
            username: username,
            owesyou: 0,
            youowes: 0,
          },
        ],
      },
    }
  );

  const addtoanother = await db.findOneAndUpdate(
    {
      username: username,
    },
    {
      data: {
        frineds: [
          ...fusername.data.frineds,
          {
            username: user.username,
            owesyou: 0,
            youowes: 0,
          },
        ],
      },
    }
  );
  return resp.status(200).json(addfrined);
});

router.delete("/delete", auth, async (req, resp) => {
  const { username } = req.body;
  const user = await db.findById(req.user);
  const fuser = await db.findOne({
    username: username,
  });
  let farr = fuser.data.frineds;
  let index = -1;
  let findex = -1;
  let arr = user.data.frineds;
  user.data.frineds.forEach((ele, ind) => {
    if (ele["username"] == username.toLowerCase()) {
      index = ind;
    }
  });
  fuser.data.frineds.forEach((ele, ind) => {
    if (ele["username"] == user.username.toLowerCase()) {
      findex = ind;
    }
  });
  if (index == -1) {
    return resp.status(401).json("Userdoesn't exist");
  }
  if (index == 0) {
    arr.shift();
  } else {
    arr.splice(index, index);
  }
  if (findex == 0) {
    farr.shift();
  } else {
    farr.splice(index, index);
  }
  const removefrined = await db.findOneAndUpdate(
    {
      username: user.username,
    },
    {
      data: {
        frineds: arr,
      },
    }
  );

  const fremovefrined = await db.findOneAndUpdate(
    {
      username: username,
    },
    {
      data: {
        frineds: farr,
      },
    }
  );

  return resp.status(200).json(removefrined);
});

router.get("/list", auth, async (req, resp) => {
  const user = await db.findById(req.user);
  resp.status(200).json(user.data.frineds);
});

export default router;
