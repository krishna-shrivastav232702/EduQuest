import { createContext, ReactNode, useState } from "react"
import axios from "axios"

interface User {
  name?:string,
  email?:string,
  password?:string,
  city?:string,
  state?:string,
  _id?:string,
}

interface CurrentUserContextType{
  currUser :User | null;
  signup:(user:User)=>Promise<User>;
  login:(user:User)=>Promise<void>;
  logout:()=>void;

}

interface AuthProviderProps{
  children:ReactNode
}


export const AuthContext = createContext<CurrentUserContextType | null>(null);

const AuthProvider = ({children}:AuthProviderProps) => {
      const [currUser,setCurrUser]=useState<User |  null>(null);
      
      const signup = async({name,email,password,city,state}:User):Promise<User>=>{
          try {
            const response = await axios.post("http://localhost:7008/auth/signup",{name,email,city,state,password},{
              headers:{
                "Content-Type":"application/json"
              }
            });
            const {user,token}=response.data;
            setCurrUser(user);
            localStorage.setItem("authToken",token);
            return user;
          } catch (error) {
            console.error("Failed to create user",error);
            throw error;
          }
      }


      const login = async({email,password}:User)=>{
        try {
          const response = await axios.post("http://localhost:7008/auth/login",{email,password},{
            headers:{
              "Content-Type":"application/json"
            }
          });

          const loginUser = response.data;
          setCurrUser(loginUser.user);
          localStorage.setItem("authToken",loginUser.token);

        } catch (error) {
            console.error("Failed to login user");
            throw error;
        }
      }

      const logout = ()=>{
        localStorage.removeItem("authToken");
        setCurrUser(null);
      }


      return (
        <AuthContext.Provider value={{currUser,signup,login,logout}}>
          {children}
        </AuthContext.Provider>
      )
}

export default AuthProvider