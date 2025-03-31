import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'

const router = express.Router()


// Register a company

router.post('/register',upload.single('image'), registerCompany)

// Company Login

router.post('/login', loginCompany)

// get Company data

router.post('/company', getCompanyData)

// Company Login

router.post('/login', loginCompany)

// Post Job

router.post('/post-job', postJob)

// get applicants data of company

router.post('/applicants', getCompanyJobApplicants)

// get company job list

router.post('/list-jobs', getCompanyPostedJobs)

// change applications status

router.post('/change-status', changeJobApplicationsStatus)

// change applications visibility

router.post('/change-status', changeVisibility)

export default router;





