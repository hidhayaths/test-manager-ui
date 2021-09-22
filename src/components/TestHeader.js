import {useContext,useState} from 'react'
import {TestContext} from '../TestContext'
import { Input,Row,Col,Button,notification } from 'antd'

import {saveTest as saveTestAPI} from '../services/test.service'



const TestHeader = () =>{

    const {selectedTest,setSelectedTest,tests,setTests} = useContext(TestContext)

    const [saving,setSaving] = useState(false)

    const handleChange = (e) =>{
        const {name,value} = e.target
        const selectedTest_ = {...selectedTest}
        selectedTest_[name] = value
        setSelectedTest(selectedTest_)
    }

    const saveTest = () =>{
        if(!selectedTest || !selectedTest?.testName) return

        setSaving(true)
    
        saveTestAPI(selectedTest).then(({data})=>{

            if(selectedTest.testId){
                const editedIndex = tests.findIndex(t=>t.testId===data.testId)
                if(editedIndex<0) return;
                const tests_ = [...tests]
                tests_[editedIndex] = data
                setTests(tests_)
            }else{
                const tests_ = [...tests,data]
                setTests(tests_)
            }

            
            setSaving(false)

            notification.success({
                message:'Successful!',
                description:'Test Case saved successfully!!',
                duration:3
            })
        }).catch(err=>{
            console.error(err)
            setSaving(false)
            notification.error({
                message:'Oh No!',
                description:'Your request could not be processed. Test case is not saved!'
            })
        })

        // setSelectedTest(null)
    }

    return(
        selectedTest &&
        <div className="test-header">
            <Row className="save-test-btn-container" >
                <Button onClick={saveTest} className="save-test-btn" loading={saving} disabled={!selectedTest?.testName || selectedTest.testSteps.length < 1}>Save</Button>
            </Row>
            <Row gutter={40} style={{marginTop:30}}>
                <Col span={16} className="test-header-testname-container field-wrapper" >
                    <Input addonBefore="Test Name" value={selectedTest?.testName} name="testName" onChange = {handleChange} />
                </Col>
                <Col span={8} className="test-header-scenario-container field-wrapper">
                    <Input addonBefore="Sceanario" value={selectedTest?.scenario} name="scenario" onChange = {handleChange} />
                </Col>
            </Row>
            <Row style={{marginTop:30}} gutter={40}>
                <Col span={16} className="test-header-test-description-container field-wrapper">
                    <Input addonBefore="Description" value={selectedTest?.description} name="description" onChange = {handleChange} />
                </Col>
                <Col span={8} className="test-header-test-status-container field-wrapper">
                    <Input addonBefore="Status" value={selectedTest?.status.replace('_',' ')} name="status" readOnly />
                </Col>
            </Row>
        </div>

    )
}

export default TestHeader