import express from "express";
import { isAdmin, requireSignIn } from './../Middleware/authMiddleware.js';
import fromidable from "express-formidable"
import { createProductController, deleteProductController, filterproductcontroller, getAllProductController, getSingleProductController, getphotoController, similarproductcontroller, updateProductController } from './../Controller/ProductController.js';



const router = express();

// CREATE PRODUCT ROUTER
router.post("/create-products", requireSignIn, isAdmin, fromidable(), createProductController)


// UPDATE PRODUCT ROUTER
router.put("/update-products/:id", requireSignIn, isAdmin, fromidable(), updateProductController)

// GET ALL PRODUCT ROUTER
router.get("/getall-products", getAllProductController)

// GET SINGLE PRODUCT ROUTER
router.get("/single-product/:name", getSingleProductController)

// DELETE PRODUCT ROUTER
router.delete("/delete-products/:id", requireSignIn, isAdmin, deleteProductController)

// GET PHOTO ROUTER
router.get("/product-photo/:id", getphotoController)

// FILTERPRODUCTS ROUTER
router.post("/filter-product", filterproductcontroller)


// SIMILAR PRODUCT ROUTER
router.get("/similar-products/:pid/:cname", similarproductcontroller)

export default router