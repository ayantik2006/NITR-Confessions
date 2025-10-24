const express=require("express");
const router=express.Router();
const confessionController=require("../controllers/confession");

router.post("/new",confessionController.createConfession);
router.post("/confessions",confessionController.getConfessions);
router.post("/update-reaction",confessionController.updateReaction);
router.post("/comments",confessionController.getComments);
router.post("/add-comment",confessionController.addComment);

module.exports=router;