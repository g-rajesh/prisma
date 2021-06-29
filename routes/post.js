const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");

const { user, post } = new PrismaClient();

router.get("/:userId", async (req, res, next) => {
     const userId = parseInt(req.params.userId);

     const existUser = user.findUnique({
          where: {
               id: userId,
          },
     });

     if (!existUser) {
          return res.status(400).json("User doesn't exist");
     }

     const posts = await post.findMany({
          where: {
               userId,
          },
     });

     return res.status(200).json(posts);
});

router.post("/", async (req, res, next) => {
     const { title, content, userId } = req.body;

     const existUser = user.findUnique({
          where: {
               id: userId,
          },
     });

     if (existUser) {
          const newPost = await post.create({
               data: {
                    title,
                    post: content,
                    userId,
               },
          });

          return res.status(201).json({ newPost });
     }

     return res.status(400).json("User doesn't exist");
});

module.exports = router;
