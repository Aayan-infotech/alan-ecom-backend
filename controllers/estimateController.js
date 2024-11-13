const Estimate = require("../models/estimateModel");

const createEstimate = async (req, res) => {
    try {
        const { name, email, mobile, message } = req.body;

        if (!name?.trim() || !email?.trim() || !mobile?.trim() || !message?.trim()) {
            return res.status(400).json({
                status: 400,
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
            status: 200,
            message: "Estimate generated successfully",
            data: savedEstimate
        });

    } catch (error) {
        console.error("Error saving estimate:", error);
        res.status(500).json({
            message: error.message
        });
    }
};


const getAllEstimates = async (req, res) => {
    try {
        const estimates = await Estimate.find();
        res.status(200).json({
            status: 200,
            message: "All Estimates Details",
            data: estimates
        });
    } catch (error) {
        console.error("Error fetching estimates:", error);
        res.status(500).json({
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
                message: "Estimate not found"
            });
        }

        res.status(200).json({
            status: 200,
            message: "Estimate Details",
            data: estimate
        });
    } catch (error) {
        console.error("Error fetching estimate by ID:", error);
        res.status(500).json({
            status: 500,
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
                message: "Estimate not found"
            });
        }

        res.status(200).json({
            status: 200,
            message: "Estimate deleted successfully",
            data: deletedEstimate
        });
    } catch (error) {
        console.error("Error deleting estimate:", error);
        res.status(500).json({
            message: error.message
        });
    }
};



module.exports = {
    createEstimate,
    getEstimateById,
    getAllEstimates,
    deleteEstimateById
}