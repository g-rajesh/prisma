const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");

const { user } = new PrismaClient();

router.get("/", async (req, res, next) => {
     const users = await user.findMany({
          select: {
               username: true,
               post: true,
          },
     });

     res.json(users);
});

router.post("/", async (req, res, next) => {
     const { username } = req.body;

     const userExist = await user.findUnique({
          where: {
               username,
          },
     });

     if (userExist) {
          return res.status(401).json({ message: "User already exist" });
     } else {
          const newUser = await user.create({
               data: {
                    username,
               },
          });

          return res.status(201).json(newUser);
     }
});

module.exports = router;
