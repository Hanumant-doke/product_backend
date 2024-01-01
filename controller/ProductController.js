const Product = require("../model/ProductModel");

module.exports.createProduct = async (req, res) => {
    try {
        const {
            productName,
            image,
            description,
            price
        } = req.body;
        if (!productName,
            !image,
            !description,
            !price) {
            return res.json({ message: 'All fields are required' })
        }
        const newProduct = new Product({
            productName,
            image,
            description,
            price
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getProduct = async (req, res, next) => {
    try {
        const allProduct = await Product.find({}).sort({ createdAt: -1 }).exec();
        res.json(allProduct)
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internel Server Error' })
    }
};

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            console.log("Product not found for deletion");
            return res.status(404).json({ error: "Product not found" })
        }
        res.json(deletedProduct)
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internel Server Error' })
    }
};

