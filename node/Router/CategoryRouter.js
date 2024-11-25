import expess from "express";
import { createCategoryController, deleteCategoryController, getallCategoryController, getsingleCategoryController, updateCategoryController } from './../Controller/CategoryController.js';
import { isAdmin, requireSignIn } from './../Middleware/authMiddleware.js';

const router = expess()

// CREATE CATEGORY ROUTE
router.post("/create-category", requireSignIn, isAdmin, createCategoryController)

// UPDATE CATEGORY ROUTE
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)

// DELETE CATEGORY ROUTE
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)

// GET ALL CATEGORY ROUTE
router.get("/categories", getallCategoryController)


// GET SiNGLE CATEGORY ROUTE
router.get("/single-category", getsingleCategoryController);

export default router