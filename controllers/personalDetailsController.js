const PersonalDetails = require('../models/personalDetailsModel');

const createPersonalDetails = async (req, res) => {
    try {
        const { fullName, email, mobile, country, address, state, zipCode } = req.body;
    
    
        if (!fullName?.trim() || !email?.trim() || !mobile?.trim() || !country?.trim() || !address?.trim() || !state?.trim() || !zipCode?.trim()) {
            return res.status(400).json({
                statusCode: 400,
                status: "error",
                message: "All fields are required",
            });
        }

        const newPersonalDetails = new PersonalDetails({
            fullName,
            email,
            mobile,
            country,
            address,
            state,
            zipCode
        });

        const savedDetails = await newPersonalDetails.save();

        res.status(200).json({
            success: true,
            message: "Personal details created successfully",
            data: savedDetails
        });

    } catch (error) {
        console.error("Error creating personal details:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};

const getAllPersonalDetails = async (req, res) => {
    try {
        const personalDetails = await PersonalDetails.find();
        res.status(200).json({
            success: true,
            data: personalDetails
        });
    } catch (error) {
        console.error("Error fetching personal details:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};

const getPersonalDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const personalDetails = await PersonalDetails.findById(id);

        if (!personalDetails) {
            return res.status(404).json({
                success: false,
                message: "Personal details not found"
            });
        }

        res.status(200).json({
            success: true,
            data: personalDetails
        });
    } catch (error) {
        console.error("Error fetching personal details by ID:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};

const deletePersonalDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPersonalDetails = await PersonalDetails.findByIdAndDelete(id);

        if (!deletedPersonalDetails) {
            return res.status(404).json({
                success: false,
                message: "Personal details not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Personal details deleted successfully",
            data: deletedPersonalDetails
        });
    } catch (error) {
        console.error("Error deleting personal details:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};



module.exports = {
    createPersonalDetails,
    getAllPersonalDetails,
    getPersonalDetailsById,
    deletePersonalDetailsById
}