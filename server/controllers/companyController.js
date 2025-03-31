import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";



/**
 * Registers a new company in the system
 * Handles company signup process and account creation
 */
export const registerCompany = async (req,res)=>{
    const {name, email, password} = req.body

    const imageFile = req.file;

    if (!name || !email ||!password || !imageFile){
        return res.json({success: false, message: 'Missing Details'})
    }

    try {
        const companyExists = await Company.findOne({email})
        if(companyExists){
            return res.json({success:false, message:'Company already exists'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url 
        })

        res.json({
            success:true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

/**
 * Authenticates a company user
 * Verifies credentials and creates a session/token for the company
 */
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.json({ success: false, message: 'Company not found' });
        }
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }
        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

/**
 * Retrieves company information
 * Returns company profile data based on ID or other identifiers
 */
export const getCompanyData = async (req,res)=>{
    
}

/**
 * Creates a new job listing
 * Allows companies to post job opportunities with details and requirements
 */
export const postJob = async (req,res)=>{
    
}

/**
 * Fetches all applicants for the company's job listings
 * Returns candidates who have applied to any of the company's posted jobs
 */
export const getCompanyJobApplicants = async (req,res)=>{
    
}

/**
 * Retrieves all jobs posted by the company
 * Returns a list of active and inactive job listings created by the company
 */
export const getCompanyPostedJobs = async (req,res)=>{
    
}

/**
 * Updates the status of job applications
 * Allows companies to mark applications as reviewed, accepted, rejected, etc.
 */
export const changeJobApplicationsStatus = async (req,res)=>{
    
}

/**
 * Toggles job listing visibility
 * Enables companies to make job postings public or private, or mark them as filled
 */
export const changeVisibility = async (req,res)=>{
    
}