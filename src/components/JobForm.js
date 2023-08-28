
////
import { useState } from "react"


const JobForm=()=>{
    const [title,setTitle]=useState('')
    const [position,setposition]=useState('')
    const [salary,setsalary]=useState('')
    ////////// 
    const [location,setlocation]=useState('')
    const [details,setdetails]=useState('')
    const [jobtype, setjobtype] = useState('')
    const [company, setcompany] = useState('')




    const [error, setError] = useState(null)
    const handleSubmit= async (e)=>{
        e.preventDefault()

        const job={title,company,position,salary,location,details,jobtype}
        const response= await fetch('/api/jobdata',{
            method:"POST",
            body:JSON.stringify(job),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            }
        if (response.ok) {
            setError(null)
            setcompany('')
            setTitle('')
            setposition('')
            setsalary('')
            setlocation('')
            setdetails('')
            setjobtype('')
            
            console.log('new job added:', json)
        }

    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Post a New Job</h3>
            <label>Job Title</label>
            <input   
                type="text"
                onChange={(e) => setTitle(e.target.value)} 
                value={title}  />
            <label>Company</label>
            <input   
                type="text"
                onChange={(e) => setcompany(e.target.value)} 
                value={company}  />
            <label>Position</label>
            <input   
                type="text"
                onChange={(e) => setposition(e.target.value)} 
                value={position}  />


            <label>Salary</label>
            <input   
                type="number"
                onChange={(e) => setsalary(e.target.value)} 
                value={salary}  />


            <label>Location</label>
            <input   
                type="text"
                onChange={(e) => setlocation(e.target.value)} 
                value={location}  />
            
            <label>Details</label>
            <textarea 
                class="details"
                type="text"
                onChange={(e) => setdetails(e.target.value)} 
                value={details}  />

            <label>Job Type</label>
            <select class="jobtype" value={jobtype} onChange={(e) => setjobtype(e.target.value)}>
                <option value="">Select Job Type</option>
                <option value="Part-time">Part-time</option>
                <option value="Full-time">Full-time</option>
            </select>

            <button>Post</button>
            {error && <div className="error">{"Fill all the required fields"}</div>}



        </form>
        
    )


}
export default JobForm