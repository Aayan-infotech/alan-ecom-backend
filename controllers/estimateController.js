const Estimate = require("../models/estimateModel");

const createEstimate = async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;

        if (!name?.trim() || !email?.trim() || !mobile?.trim() || !message?.trim()) {
            return res.status(400).json({
                statusCode: 400,
                status: "error",
                message: "All fields are required",
            });
        }

        const newEstimate = new Estimate({
            name,
            email,
            mobile,
            message
        });

        const savedEstimate = await newEstimate.save();

        res.status(200).json({
            success: true,
            message: "Estimate generated successfully",
            data: savedEstimate
        });

    } catch (error) {
        console.error("Error saving estimate:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};


const getAllEstimates = async (req, res) => {
    try {
        const estimates = await Estimate.find();
        res.status(200).json({
            success: true,
            data: estimates
        });
    } catch (error) {
        console.error("Error fetching estimates:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};

const getEstimateById = async (req, res) => {
    try {
        const { id } = req.params;
        const estimate = await Estimate.findById(id);

        if (!estimate) {
            return res.status(404).json({
                success: false,
                message: "Estimate not found"
            });
        }

        res.status(200).json({
            success: true,
            data: estimate
        });
    } catch (error) {
        console.error("Error fetching estimate by ID:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};

const deleteEstimateById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEstimate = await Estimate.findByIdAndDelete(id);

        if (!deletedEstimate) {
            return res.status(404).json({
                success: false,
                message: "Estimate not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Estimate deleted successfully",
            data: deletedEstimate
        });
    } catch (error) {
        console.error("Error deleting estimate:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};



module.exports = {
    createEstimate,
    getEstimateById,
    getAllEstimates,
    deleteEstimateById
}