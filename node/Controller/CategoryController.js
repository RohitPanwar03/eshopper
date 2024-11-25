import CategoryModel from "../Model/CategoryModel.js";


export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(404).send({ message: "Name is required" })
        }

        //CHECK EXISTING CATEGORY
        const existingcategory = await CategoryModel.findOne({ name });

        if (existingcategory) {
            res.status(401).send({
                success: false,
                message: "Category already exists"
            })
        } else {

            const category = await new CategoryModel({ name }).save()
            res.status(200).send({
                success: true,
                message: "Category Created Successfully",
                category
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}


// UPDATE CATEGORY CONTROLLER

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params

        const category = await CategoryModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).send({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            messsage: "Something went wrong",
        });
    }
}


// DELETE CATEGORY CONTROLLER

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;

        await CategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            messsage: "Category Deleted Successfully",

        });
    } catch (error) {
        res.status(500).send({
            success: false,
            messsage: "Something went wrong",
        });
    }
}

// GET ALL CATEGORY CONTROLLER

export const getallCategoryController = async (req, res) => {
    try {


        const category = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            messsage: "All Category list",
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            messsage: "Something went wrong",
        });
    }
}

// GET SINGLE CATEGORY CONTROLLER

export const getsingleCategoryController = async (req, res) => {
    try {

        const { id } = req.params
        await CategoryModel.findById(id);
        res.status(200).send({
            success: true,
            messsage: "Single Category",


        });
    } catch (error) {
        res.status(500).send({
            success: false,
            messsage: "Something went wrong",
        });
    }
}