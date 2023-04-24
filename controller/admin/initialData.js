const Category = require('../../models/category.model');
const Order = require('../../models/order.model');
const Product = require('../../models/product.model');

exports.initialData = async (req, res) => {
    try {
        const categories = await Category.find({}).then();
        const products = await Product.find({})
            .select('_id name description productPictures price quantity slug category')
            .populate({ path: 'category', select: '_id name' })
            .then();
        const orders = await Order.find({})
            .populate('items.productId', "name").then()

        // const orders = await Order.find({}).then();
        res.status(200).json({
            categories, 
            products,
            orders
        })

    } catch (error) {
        log.error(error);
        res.status(500).send();
    }
}