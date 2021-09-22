import {useContext} from 'react'
import SearchBar from './SearchBar'
import {TestContext} from '../TestContext'
import {Layout,Button} from 'antd'

import { PlusOutlined } from '@ant-design/icons'

const {Header} = Layout

const newTest = {
    testName:'',
    scenario:'',
    description:'',
    status:'NO_RUN',
    testSteps:[]
  }

const AppHeader = () => {

    const {setSelectedTest} = useContext(TestContext)

    const setNewTest = () =>{ setSelectedTest(newTest)}

    return (
        <Header className="app-header">
          <div className="logo">Test Manager</div>
          <div className="app-header-controls">
            <SearchBar />
            <Button type="ghost" icon={<PlusOutlined />} style={{margin:0,border:'none',color:'#fff'}} onClick={setNewTest}>New</Button>
          </div>
        </Header>
    )
}

export default AppHeader
