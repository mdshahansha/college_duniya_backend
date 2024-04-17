import Bank from "../models/loan.schema.js";
import User from "../models/user.schema.js";

 
export const createBank = async (req, res) => {
    try {
        // Extract loan details from the request body
        const { bank, interestRate, maxTenure, bankType, scheme, compare } = req.body;

        // Create a new loan document
        const loan = new Bank({
            bank,
            interestRate,
            maxTenure,
            bankType,
            scheme
        });

        // Save the loan document to the database
        await loan.save();

        // Return success response
        res.status(201).json({ message: 'Loan created successfully', loan });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getAllBanks = async (req, res) => {
    try {
        const banks = await Bank.find();
        res.status(200).json(banks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const checkEligibility = async (req, res) => {
    try {
        // Retrieve user information from the request payload
        const { annualIncome, socialCategory, course, typeLengthOfCourse, nameOfCourse, interest, enterCourse, intentToInvest } = req.body;

        // Define eligibility criteria
        const isIndian = req.body.isIndian; // Assuming you have this information in the request payload
        const minimumIncome = 600000;
        const socialCategoryCriteria = 'GEN';
        const courseCriteria = 'doctorate';
        const typeLengthOfCourseCriteria = '>=3 year';
        const interestCriteria = 'full time';
        const enterCourseCriteria = 200000;
        const intentToInvestCriteria = 300000;

        // Check eligibility based on criteria
        if (!isIndian) {
            return res.json({ eligible: false, reason: 'Applicable for Indian citizens only' });
        }

        if (annualIncome < minimumIncome || socialCategory !== socialCategoryCriteria || course !== courseCriteria ||
            typeLengthOfCourse !== typeLengthOfCourseCriteria || interest !== interestCriteria || enterCourse < enterCourseCriteria ||
            intentToInvest < intentToInvestCriteria) {
            return res.json({ eligible: false, reason: 'User does not meet eligibility criteria' });
        }

        // If all criteria are met, user is eligible
        res.json({ eligible: true, reason: 'User meets all eligibility criteria' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 

export const applied = async (req, res) => {
    try {
        const { bankId } = req.params;
        const { name, email, mobileNumber, course, city } = req.body;
 
        // Assuming you have a Loan model imported
        const loan = await Bank.findById(bankId);

        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }

        // Push the application details into the userApplied array
        loan.userApplied.push({
            name,
            email,
            mobileNumber,
            course,
            city,
            user:bankId
        });

        await loan.save();

        res.status(200).json({ message: 'Application submitted successfully', loan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

};



export const getAllBanksByType = async (req, res) => {
    try {
        // Fetch all loans from the database
        const allLoans = await Bank.find({});

        // Create an object to store banks grouped by bankType
        const banksByType = {};

        // Group banks by bankType
        allLoans.forEach((loan) => {
            if (!banksByType[loan.bankType]) {
                banksByType[loan.bankType] = [];
            }
            banksByType[loan.bankType].push(loan);
        });

        // Respond with banks grouped by bankType
        res.json(banksByType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};