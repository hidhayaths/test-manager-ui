import {useContext} from 'react'
import {Layout,Menu,Popover,Button,Modal,notification} from 'antd'
import {TestContext} from '../TestContext'

import { MoreOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import { deleteTest as deleteTestAPI } from '../services/test.service'

const {Sider} = Layout


const TestList = () => {

    const {tests,setTests,setSelectedTest}  = useContext(TestContext)

    const handleSelect = (testId) =>{        
        const selectedTest = tests.find(test=>test.testId===Number(testId))

        if(selectedTest) setSelectedTest(selectedTest)
    }

    const deleteTest = ({testId,testName}) =>{
        
        Modal.confirm({
            title:'Are you sure want to delete?',
            icon:<ExclamationCircleOutlined />,
            content:`This will delete the test case '${testName}' from database and this action cannot be undone.`,
            okText:'Yes',
            cancelText:'No',
            onOk:()=>{
                deleteTestAPI(testId)
                .then(res=>{
                    console.log(res)
                    const tests_ = tests.filter(t=>t.testId!==testId)
                    setTests(tests_)
                    notification.info({
                        message:'Successfull!',
                        description:`Test Case '${testName}' is deleted successfully!`,
                        duration:3
                    })
                })
                .catch(err=>{
                    console.error(err)
                    notification.error({
                        message:'Unsuccessful!',
                        description:`could not delete the test case '${testName}' from database, please contact administrator..`
                    })
                })
            }
        })
    }
    

    return (
        
        <Sider className="site-layout-background test-list-container" theme="light" width={250}>
            
            
            {
                    tests &&
                    <Menu mode="inline" theme="light" className="test-list" onSelect={({key})=>handleSelect(key)}>
                        {
                            tests.map(test=>(
                                <Menu.Item key={test.testId} className="test-name-container"  title={test.testName}>
                                    <span className="test-case-name">{test.testName}</span>
                                    <Popover  
                                        placement="right" 
                                        className="test-case-actions" 
                                        content={
                                                    <Button type="link" size="small" onClick={()=>deleteTest(test)}>Delete</Button>
                                                } 
                                        trigger="hover">
                                            <MoreOutlined />
                                    </Popover>
                                </Menu.Item>
                            ))
                        }
                    </Menu>
            }
            

      </Sider>
    )
}

export default TestList
