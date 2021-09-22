import React,{useContext,useState} from 'react'
import AddOrEditStep from './AddOrEditStep'
import { TestContext } from '../TestContext'
import {List,Button,Popover} from 'antd'
import { MoreOutlined } from '@ant-design/icons'

const stepObj = {
    stepDescription:'',
    expectedResult:'',
    actualResult:'',
    status:'NO_RUN'
}

const TestStepsContainer = () => {

    const {selectedTest,setSelectedTest} = useContext(TestContext)
    const [step,setStep] = useState(stepObj)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle,setModalTitle] = useState('Add Step')

    const showModal = () =>{setIsModalVisible(true)}

    const newStep = () =>{
       setStep(stepObj)
       showModal() 
    }  

    const closeModal = () =>{
        setIsModalVisible(false)
        setModalTitle('Add Step')
    }

    const handleChange = (e) =>{
        const {name,value} = e.target
        const step_ = {...step}
        step_[name] =value
        setStep(step_)
    }

    const setEdit = (step) =>{
        setModalTitle('Edit Step')
        setStep(step)
        showModal()
    }

    const saveStep = () =>{

        if(!step.stepDescription || !step.expectedResult) return;

        const selectedTest_ = {...selectedTest}

        const {testSteps} = selectedTest_

        //perform update when step has id
        if(step.stepId){
            
            const editedIndex = testSteps.findIndex(s=>s.stepId===step.stepId) 

            if(editedIndex <0 ) return

            testSteps[editedIndex] = step

            selectedTest_.testSteps = testSteps
        
        }else{
            selectedTest_.testSteps = [...testSteps,step]
        }

        setSelectedTest(selectedTest_)
        closeModal()

    }

    const removeStep = (stepId) =>{
        const selectedTest_ = {...selectedTest}
        const {testSteps} = selectedTest_
        const testStepsAfterRemovedStep = testSteps.filter(s=>s.stepId!==stepId)
        selectedTest_.testSteps = testStepsAfterRemovedStep
        setSelectedTest(selectedTest_)
    }

    return (
        selectedTest && selectedTest.testSteps &&
        <List 
            className="test-steps-container"
            itemLayout="horizontal"
            pagination 
            size="small"
            header={(
                    <div className="test-steps-header">
                        <p>Test Steps</p>
                        <AddOrEditStep step={step} handleChange={handleChange} onAdd={newStep} closeModal={closeModal} visible={isModalVisible} title={modalTitle} saveStep={saveStep}/>
                    </div>
                )
                
            }
            dataSource={selectedTest.testSteps}
            renderItem={ step =>(
                <List.Item>
                    <List.Item.Meta 
                        title={step.stepDescription}
                        description={<Description expected={step.expectedResult} actual={step.actualResult} />}
                    />
                    <p className="step-list-step-status"><span className="secondary-text">status : </span><span>{step.status.toLowerCase().replace('_',' ')}</span></p>
                    <Popover className="more-step-actions" placement="right" content={<MoreOption onEdit={()=>setEdit(step)} onDelete={()=>removeStep(step.stepId)}/>} trigger="click">
                        <Button type="link" icon={<MoreOutlined />} />
                    </Popover>
                </List.Item>
            )}
        
        />
            
        
    )
}

const MoreOption = ({onEdit,onDelete}) =>{
    return (
        <div className="more-step-actions-content-wrapper">
            <Button type="link" onClick={onEdit}>Edit</Button>
            <Button type="link" onClick={onDelete}>Delete</Button>
        </div>
    )
}

const Description = ({expected,actual}) =>{
    return(
        <div className="test-step-description">
            <div className="test-step-expected">
                <span>Exp: </span>
                <span>{expected}</span>
            </div>
            <div className="test-step-actual">
                <span>Act: </span>
                <span>{actual}</span>
            </div>
        </div>
    )
}

export default TestStepsContainer
