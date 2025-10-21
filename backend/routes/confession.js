const express=require("express");
const router=express.Router();
const confessionController=require("../controllers/confession");

router.post("/new",confessionController.createConfession);
router.post("/confessions",confessionController.getConfessions);
router.post("/update-reaction",confessionController.updateReaction);

module.exports=router;