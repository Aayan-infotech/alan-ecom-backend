const EntryDoor = require('../models/doorsModel');
const Category = require('../models/CategoryModel');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Define the file name
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

const createEntryDoor = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        try {
            const { categoryName, subCategoryId, subCategory, subSubCategoryId, subSubCategory, productName, price, description } = req.body;
            const images = req.files ? req.files.map(file => `http://44.196.64.110:5000/uploads/${file.filename}`) : [];

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

            const newEntryDoor = new EntryDoor({
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
            });

            const savedEntryDoor = await newEntryDoor.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: "Entry Door Created Successfully",
                data: savedEntryDoor
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

const getAllEntryDoors = async (req, res) => {
    try {
        const allProduct = await EntryDoor.find({ 'productDetails.categoryName': "Entry Doors" }).select('productDetails');

        if (!allProduct || allProduct.length === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "No data found for Entry Doors",
                data: null
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "All Entry Doors",
            data: allProduct
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

const getAllEntryDoorsById = async (req, res) => {
    const { id } = req.params; // Extract the categoryId from request parameters
    try {
        // Find the Entry Door documents where productDetails.categoryId matches the provided id
        const entryDoors = await EntryDoor.find({ 'productDetails.categoryId': id }).select('productDetails');

        // If no Entry Door is found, return a 404 error
        if (!entryDoors || entryDoors.length === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Entry Door not found",
                data: null
            });
        }

        // Return the found Entry Door data
        res.status(200).json({
            status: 200,
            success: true,
            message: "Entry Door(s) Found",
            data: entryDoors
        });
    } catch (error) {
        // Handle any errors during the query
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

const getEntryDoorsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await EntryDoor.findById(id);

        if (!product) {
            return res.status(404).json({
                status: 404,
                success: true,
                message: "No data found for Entry Doors",
                data: null
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Entry Door Product found succesfully",
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

const deleteEntryDoors = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await EntryDoor.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404).json({
                status: 404,
                success: false,
                message: "No Entry Doors Product found",
                data: null
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Entry Door Product deleted succesfully",
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

const updateEntryDoors = async (req, res) => {
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

            const existingEntryDoor = await EntryDoor.findById(id);

            if (!existingEntryDoor) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: "Product not found",
                    data: null
                })
            }

            let images = existingEntryDoor.productDetails.images || [];
            if (req.files && req.files.length > 0) {
                images = req.files.map(file => `http://44.196.64.110:5000/uploads/${file.filename}`);
            }

            const updatedDetails = {
                categoryId: existingEntryDoor.productDetails.categoryId || '' ,
                categoryName: categoryName || existingEntryDoor.productDetails.categoryName,
                subCategory: subCategory || existingEntryDoor.productDetails.subCategory,
                subSubCategory: subSubCategory || existingEntryDoor.productDetails.subSubCategory,
                description: description || existingEntryDoor.productDetails.description,
                productName: productName || existingEntryDoor.productDetails.productName,
                price: price || existingEntryDoor.productDetails.price,
                images,
            }

            const updatedEntryDoor = await EntryDoor.findByIdAndUpdate(
                id,
                { productDetails: updatedDetails },
                { new: true }
            );

            res.status(200).json({
                status: 200,
                success: true,
                message: "EntryDoorProduct updated successfully",
                data: updatedEntryDoor,
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

        const updatedEntryDoor = await EntryDoor.findByIdAndUpdate(
            id,
            { $set: { dimensions: formattedDimensions } },
            { new: true }
        );

        if (!updatedEntryDoor) {
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
            data: updatedEntryDoor,
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
        const category = await EntryDoor.find({ 'productDetails.categoryId': id }).select('productDetails');

        if (!category || category.length === 0) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Product not found",
                data: null
            })
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: "Product fetched successfully",
            data: category
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createEntryDoor,
    getAllEntryDoors,
    getAllEntryDoorsById,
    getEntryDoorsById,
    deleteEntryDoors,
    updateEntryDoors,
    addDimensions,
    getProduct
}