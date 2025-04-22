import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const {user} = useUser()
    const {getToken} = useAuth()

    const [jobs, setJobs] =useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSearched,setIsSearched] = useState(false)
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])


    // Funtion to fetch jobs
    const fetchJobs = async ()=> {
        try {
            setIsLoading(true)
            const {data}= await axios.get(backendUrl+'/api/jobs')

            if(data.success){
                setJobs(data.jobs)
                console.log(data.jobs);
            }else{
                toast.error(data.message)
            }


        } catch (error) {
            toast.error(error.message)

        } finally {
            setIsLoading(false)
        }

    }
    // fethCompany data

    const fetchCompanyData = async ()=>{
        try {
            const {data}= await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})

            if(data.success){
                setCompanyData(data.company)                
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // Funciton to fetch user Data
    const fetchUserData = async ()=>{
        try {
            const token = await getToken()

            const {data} = await axios.get(backendUrl+'/api/users/user',
                {headers: {Authorization: `Bearer ${token}`}}
            )
            if (data.success){
                setUserData(data.user)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserApplications = async () =>{
        try {
            const token = await getToken()
            
            const {data}= await axios.get(backendUrl+'/api/users/applications',
                {headers: {Authorization: `Bearer ${token}`}}
            )
            if(data.success){
                setUserApplications(data.applications)
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }



    useEffect(()=>{
        fetchJobs()

        const storeCompanyToken = localStorage.getItem('companyToken')

        if(storeCompanyToken){
            setCompanyToken(storeCompanyToken)
        }
    },[])
    
    useEffect(() => {
     if(companyToken){
        fetchCompanyData()
     }
    }, [companyToken])

    useEffect(() => {
        if(user){
            fetchUserData()
            fetchUserApplications()
        }
    }, [user])
    
    
    const value = {
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        jobs,
        setJobs,
        isLoading,
        setIsLoading,
        showRecruiterLogin,
        setShowRecruiterLogin,
        companyToken,
        setCompanyToken,
        setCompanyData,
        companyData,
        backendUrl,
        userApplications,
        setUserApplications,
        userData,
        setUserData,
        fetchUserData,
        fetchUserApplications
    }

    return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}

