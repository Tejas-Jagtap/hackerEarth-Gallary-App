const express = require("express");
const router = express.Router();
const Images = require("../model/imageModel");

router.get("/", async (req, res) => {
  try {
    const image = await Images.find({});
    res.render("index", { data: image });
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/show/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const image = await Images.findById(_id);
    if (!image) {
      return res.status(404).send({ error: "Image not Found" });
    }
    res.render("show", { data: image });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", async (req, res) => {
  const image = new Images({
    imgName: req.body.name,
    imgUrl: req.body.url,
    imgDetails: req.body.description,
  });
  try {
    await image.save();
    res.status(201).send(image);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id/edit", async (req, res) => {
  const _id = req.params.id;
  try {
    const image = await Images.findById(_id);
    res.render("edit", { data: image });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/:id/edit", async (req, res) => {
  try {
    const _id = req.params.id;
    await Images.findByIdAndUpdate(_id, {
      imgName: req.body.name,
      imgUrl: req.body.url,
      imgDetails: req.body.description,
    });
    res.redirect("/");
  } catch (error) {
    if (error.status == 404) {
      console.log("Not Found");
    } else {
      console.log(error.data);
    }
    res.redirect("/");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const image = await Images.findOneAndDelete({
      _id: req.params.id,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error.data);
    res.redirect("/");
  }
});

module.exports = router;
