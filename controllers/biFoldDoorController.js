const BiFoldDoor = require('../models/doorsModel');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images Only!'));
        }
    }
}).array('images', 10);

const createBiFoldDoor = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }

        try {
            const { categoryName, subCategoryId, subCategory, subSubCategoryId, subSubCategory, productName, price, description } = req.body;
            const images = req.files ? req.files.map(file => `http://44.196.192.232:5000/uploads/${file.filename}`) : [];

            let categoryId;
            if (subSubCategoryId) {
                categoryId = subSubCategoryId;
            }
            else if (subCategoryId) {
                categoryId = subCategoryId;
            }
            else {
                const categoryData = await Category.findOne({ categoryName });
                if (categoryData) {
                    categoryId = categoryData._id;
                } else {
                    return res.status(404).json({
                        success: false,
                        message: "Unable to find category for the provided inputs"
                    });
                }
            }

            const newBiFoldDoor = new BiFoldDoor({
                productDetails: {
                    categoryId,
                    categoryName,
                    productName,
                    price,
                    description,
                    subCategory,
                    subSubCategory,
                    images
                }
            })

            const savedBiFoldDoors = await newBiFoldDoor.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: "BiFoldDoors created successfully",
                data: savedBiFoldDoors
            })

        } catch (error) {
            res.status(500).json({
                status: 500,
                success: false,
                message: error.message
            })
        }
    })
}

const getAllBiFoldDoors = async (req, res) => {
    try {
        const allProducts = await BiFoldDoor.find({ 'productDetails.categoryName': "Multiple Slide & BiFold Doors" }).select('productDetails');
        if (!allProducts) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "No Product Found",
                data: null
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Products fetched successfully",
            data: allProducts
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await BiFoldDoor.findById(id);

        if (!product) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Product Not Found",
                data: null
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Product feteched successfully",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

const deleteBiFoldDoors = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await BiFoldDoor.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "Product Not Found",
                data: null
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

const updateBiFoldDoors = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        try {
            const { id } = req.params;

            const { categoryName, subCategory, subSubCategory, productName, price, description } = req.body;

            const existingDoor = await BiFoldDoor.findById(id);

            if (!existingDoor) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "Product not found",
                    data: null
                })
            }

            let images = existingDoor.productDetails.images || [];
            if (req.files && req.files.length > 0) {
                images = req.files.map(file => `http://44.196.192.232:5000/uploads/${file.filename}`);
            }

            const updatedDetails = {
                categoryName: categoryName || existingDoor.productDetails.categoryName,
                subCategory: subCategory || existingDoor.productDetails.subCategory,
                subSubCategory: subSubCategory || existingDoor.productDetails.subSubCategory,
                description: description || existingDoor.productDetails.description,
                productName: productName || existingDoor.productDetails.productName,
                price: price || existingDoor.productDetails.price,
                images,
            }

            const updatedDoor = await BiFoldDoor.findByIdAndUpdate(
                id,
                { productDetails: updatedDetails },
                { new: true }
            );

            res.status(200).json({
                status: 200,
                success: true,
                message: "EntryDoorProduct updated successfully",
                data: updatedDoor,
            });

        } catch (error) {
            res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                error: error.message
            })
        }
    });
}

const addDimensions = async (req, res) => {
    try {
        const { id } = req.params;
        const dimensions = req.body;

        if (!dimensions || !dimensions.dimensions || Object.keys(dimensions.dimensions).length === 0) {
            return res.status(400).json({
                status: 404,
                success: false,
                message: "No dimensions data provided",
                data: null
            });
        }

        const dimensionsData = dimensions.dimensions;
        const formattedDimensions = {};

        Object.keys(dimensionsData).forEach((key) => {
            const dimension = dimensionsData[key];

            if (dimension.data && Array.isArray(dimension.data) && dimension.data.length > 0 && dimension.data[0].name.length > 0) {
                formattedDimensions[key] = {
                    label: dimension.label,
                    data: dimension.data.map((item) => ({
                        name: item.name,
                        cost: item.cost,
                    })),
                };
            } else {
                formattedDimensions[key] = {
                    label: null,
                    data: [],
                };
            }
        });

        if (Object.keys(formattedDimensions).length === 0) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid dimensions data (missing or empty data)",
            });
        }

        const updatedDoor = await BiFoldDoor.findByIdAndUpdate(
            id,
            { $set: { dimensions: formattedDimensions } },
            { new: true }
        );

        if (!updatedDoor) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Entry Door not found",
                data: null
            });
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Dimensions updated successfully",
            data: updatedDoor,
        });

    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await BiFoldDoor.find({ 'productDetails.categoryId': id }).select('productDetails');

        if (!category || category.length === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Product not found",
                data: null
            })
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Product fetched successfully",
            data: category
        })

    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createBiFoldDoor,
    getAllBiFoldDoors,
    getProductById,
    deleteBiFoldDoors,
    updateBiFoldDoors,
    addDimensions,
    getProduct
}