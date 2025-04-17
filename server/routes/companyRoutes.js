import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middlewares/authMiddleware.js'

const router = express.Router()


// Register a company

router.post('/register',upload.single('image'), registerCompany)

// Company Login

router.post('/login', loginCompany)

// get Company data

router.get('/company', protectCompany, getCompanyData)

// Company Login

router.post('/login', protectCompany, loginCompany)

// Post Job

router.post('/post-job',protectCompany, postJob)

// get applicants data of company

router.get('/applicants',protectCompany, getCompanyJobApplicants)

// get company job list

router.get('/list-jobs',protectCompany, getCompanyPostedJobs)

// change applications status

router.post('/change-status',protectCompany, changeJobApplicationsStatus)

// change applications visibility

router.post('/ ',protectCompany, changeVisibility)

export default router;





