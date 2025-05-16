import React from 'react'
import apiClient from '../../service/apiClient.js'
import {useNavigate} from "react-router"
import { useState } from 'react'

const Login = function(){

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
                  const data = await apiClient.login(email, password)
                  console.log(data)
                  if(data.success){
                      navigate("/home")
                  }else{
                      setError(data.message || 'Signup failed')
                  }
              } catch (error) {}
              finally{
                  setloading(false)
              }
            }

  return (
    <div className="login">
        <h1>Welcome to login page</h1>
        {error && <div>Error: {error}</div>}
        <form onSubmit={handleSubmit}>
            <div style={{display: 'flex', flexDirection: "column"}}>
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
                >{loading? "Signup...": "Signup"}</button>

            </div>
        </form>    
    </div>
  )
}

export default Login
