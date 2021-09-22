import axios from 'axios'

//comes from .env.local file if development or .env.prod file for production
const url = process.env.REACT_APP_API_BASE_URL

export const allTests = () =>{
    console.info('url is :',url)
    
    return axios.get(`${url}/api/test-cases`)
    
}

export const saveTest = (test)=>{
    if(test?.testId)
        return axios.put(`${url}/api/test-cases/${test.testId}`,test)
    else
        return axios.post(`${url}/api/test-cases`,test)
}

export const deleteTest = (testId)=>{
    return axios.delete(`${url}/api/test-cases/${testId}`)
}

