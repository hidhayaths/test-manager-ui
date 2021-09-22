import {useState,useContext,useEffect} from 'react'
import {Input} from 'antd'
import {TestContext} from '../TestContext'
import {allTests} from '../services/test.service'

const {Search} = Input


const SearchBar = () => {

    const {tests,setTests} = useContext(TestContext)
    const [masterList,setMasterList] = useState()

    useEffect(()=>{
        allTests().then(({data})=>setMasterList(data))
    },[tests])

    const handleSearch = (e) =>{
        const {value} = e.target

        if(value){
            const filteredTests = masterList.filter(test=>test.testName.toLowerCase().startsWith(value))
            setTests(filteredTests)
        }else{
            setTests(masterList)
        }
    }


    return (
        <Search onChange={e=>handleSearch(e)} className="search-container"/>
    )
}

export default SearchBar
