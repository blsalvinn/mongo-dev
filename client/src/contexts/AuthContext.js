import React, { createContext, useReducer } from 'react'
import { authReducer } from '../reducer/authReducer'
import { apiURL, LOCAL_STORAGE_TOKEN_NAME } from './constants'

import axios from 'axios'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    // dispatch thay doi kho reducer
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true, //sau khi login
        isAuthenticated: false, //trang thai xac thuc
        user: null
    })

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiURL}/auth/login`, userForm)

            if(response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            //xet propety LOCAL nay voi value la response.data.

            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //context dât 
    const authContextData = {loginUser}

    //return provider

    return(
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
