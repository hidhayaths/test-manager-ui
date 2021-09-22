import {createContext,useState,useEffect} from 'react'
import {allTests} from './services/test.service'
import {notification} from 'antd'

export const TestContext = createContext(null)


const ContextWrapper = ({children}) =>{

    const [tests,setTests] = useState([])
    const [selectedTest,setSelectedTest] = useState(null)

    const loadAllTests = () =>{
        allTests()
        .then(({data})=>setTests(data))
        .catch(err=>{
            console.error(err)
            notification.error({
                message:'Error Loading Test Cases',
                description:'Could not load test cases information from the server, please check with the administrator!'
            })
        })  
    }

    

    useEffect(loadAllTests,[])

    return(
        <TestContext.Provider value={{tests,setTests,loadAllTests,selectedTest,setSelectedTest}} >
            {children}
        </TestContext.Provider>
    )
}

export default ContextWrapper