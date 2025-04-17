import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [jobs, setJobs] =useState([])
    const [isSearched,setIsSearched] = useState(false)
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)


    // Funtion to fetch jobs
    const fetchJobs = async ()=> {
        setJobs(jobsData)

    }
    useEffect(()=>{
        fetchJobs()
    },[])

    const value = {
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs,
        showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken,
        setCompanyToken,
        setCompanyData,
        companyData,
        backendUrl
    }

    return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}

