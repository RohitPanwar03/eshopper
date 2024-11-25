import ProductModel from "../Model/ProductModel.js";
import fs from "fs"

// CREATE PRODUCT CONTROLLER

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, category, shipping } = req.fields;
        const { photo } = req.files;

        // VALIDATIONS

        if (!name) {
            return res.status(404).send({ message: "Name is Required" })
        }
        if (!description) {
            return res.status(404).send({ message: "Description is Required" })
        }
        if (!price) {
            return res.status(404).send({ message: "Price is Required" })
        }
        if (!quantity) {
            return res.status(404).send({ message: "Quantity is Required" })
        }
        if (!category) {
            return res.status(404).send({ message: "category is Required" })
        }
        if (!photo) {
            return res.status(404).send({ message: "Photo is Required" })
        }

        const products = new ProductModel({ ...req.fields });

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();

        res.status(200).send({
            success: true,
            message: "Product Created Successfully",
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,

            message: "Error in Creating Product"
        })
        console.log(error.message)
    }
}


// UPDATE PRODUCT CONTROLLER

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, quantity, category, shipping } = req.fields;
        const { photo } = req.files;


        // VALIDATIONS

        if (!name) {
            return res.status(404).send({ message: "Name is Required" })
        }
        if (!description) {
            return res.status(404).send({ message: "Description is Required" })
        }
        if (!price) {
            return res.status(404).send({ message: "Price is Required" })
        }
        if (!quantity) {
            return res.status(404).send({ message: "Quantity is Required" })
        }
        if (!category) {
            return res.status(404).send({ message: "category is Required" })
        }
        if (!photo) {
            return res.status(404).send({ message: "Photo is Required" })
        }

        const products = await ProductModel.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true })

        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }

        await products.save();

        res.status(200).send({
            success: true,
            message: "Product Updated Successfully",
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,

            message: "Error in Creating Product"
        })
        console.log(error.message)
    }
}


// GET ALL PRODUCTS

export const getAllProductController = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate("category").select("-photo")

        res.status(200).send({
            success: true,
            counttotal: products.length,
            message: "All Products Fetched Successfully",
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,

            message: "Error in Getting Product",
            products
        })
    }
}


// GET SINGLE PRODUCTS

export const getSingleProductController = async (req, res) => {
    try {


        const products = await ProductModel.findOne({ name: req.params.name }).populate("category").select("-photo")

        res.status(200).send({
            success: true,
            counttotal: products.length,
            message: " Product Fetched Successfully",
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,

            message: "Error in Getting Product"
        })
    }
}

// GET PHOTO

export const getphotoController = async (req, res) => {
    try {
        const products = await ProductModel.findById(req.params.id).select("photo");
        if (products.photo.data) {
            res.set("content-type", products.photo.contentType);
            res.status(200).send(products.photo.data)
        }
    } catch (error) {
        res.status(500).send({
            success: false,

            message: "Error in Getting Photo",

        })
    }
}

// DELETE PRODUCT CONTROLLER

export const deleteProductController = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,

            message: "Error in Deleting Product"
        })
    }
}

// FILER PRODUCT CONTROLLER

export const filterproductcontroller = async (req, res) => {
    try {
        const { checked, radio } = req.body
        const arg = {}
        if (checked.length > 0) arg.category = checked
        if (radio.length) arg.price = { $gte: radio[0], $lte: radio[1] }
        const products = await ProductModel.find(arg)
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).send({
            success: false,

            message: "Error in Filtering Product"
        })
    }
}


// SIMILAR PRODUCT  CONTROLLER

export const similarproductcontroller = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await ProductModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")
        res.status(200).send({
            success: true,
            products,

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error while geting related product"
        })
    }
}

