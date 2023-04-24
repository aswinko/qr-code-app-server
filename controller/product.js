const Product = require("../models/product.model");
const Category = require("../models/category.model");
const { default: slugify } = require("slugify");

exports.createProduct = async (req, res) => {
  try {
    //    res.status(200).json({file: req.files, body: req.body})
    const { name, price, description, category, quantity, createdBy } =
      req.body;

    //validate
    if (!name || !price || !description || !quantity || !category) {
      return res.status(400).json({ errorMessage: "please enter all fields!" });
    }

    let productPictures = [];

    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const product = new Product({
      name: name,
      slug: slugify(name),
      price,
      quantity,
      description,
      productPictures,
      category,
      createdBy: req.user._id,
    });

    await product.save().then((product, error) => {
      if (product) return res.status(201).json({ product });
      if (error) return res.status(400).json({ error });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.getProductsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    await Category.findOne({ slug: slug })
      .select("_id")
      .then(async (category, error) => {
        if (error) return res.status(400).json({ error });
        if (category) {
          await Product.find({ category: category._id }).then(
            (products, error) => {
              if (error) return res.status(400).json({ error });
              if (products) return res.status(200).json({ products });
            }
          );
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
