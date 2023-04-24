const Category = require("../models/category.model");
const slugify = require("slugify");

exports.addCategory = async (req, res) => {

  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name, {lower:true}, '-'),
    };

    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
      console.log(categoryObj.parentId);
    }

    const cat = new Category(categoryObj);

    await cat.save().then((category, error) => {
      if (category) return res.status(201).json({ category });
      if (error) return res.status(400).json({ error });
    });

    console.log(req.body.name);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.getCategories = async (req, res) => {
    try {
        await Category.find({})
        .then((categories, error) => {
            if (categories) return res.status(200).json({ categories });
            if (error) return res.status(400).json({ error });
        })

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}