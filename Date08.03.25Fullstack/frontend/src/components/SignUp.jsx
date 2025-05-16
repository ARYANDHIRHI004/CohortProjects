import React, { useState } from 'react'
import apiClient from '../../service/apiClient.js'
import {useNavigate} from "react-router"


const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setloading] = useState(false)
    const [error, setError] = useState("test")


    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setloading(true)
        setError("")

        try {
            console.log("trying to do signup")
            const data = await apiClient.signup(name, email, password)
            console.log(data)
            if(data.success){
                navigate("/login")
            }else{
                setError(data.message || 'login failed')
            }
        } catch (error) {}
        finally{
            setloading(false)
        }

        // Make an api Call to backend with data
        // get response from backend
        // take action based on response
        
    }

  return (
    <div className="signup">
        <h1>Welcome yo Signup page</h1>
        {error && <div>Error: {error}</div>}
        <form onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: "column"}}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                    onChange={(e)=>setName(e.target.value)}
                    type="text" 
                    name='name' 
                    id='name' 
                    required />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>setEmail(e.target.value)} 
                    type="text" 
                    name='email' 
                    id='email' 
                    required />
                </div>

                <div>
                <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>setPassword(e.target.value)} 
                    type="text" 
                    name='password' 
                    id='password' 
                    required />
                </div>
                
                <button 
                type="submit"
                disabled={loading}
                >{loading? "login...": "login"}</button>

            </div>
        </form>    
    </div>
  )
}

export default SignUp
