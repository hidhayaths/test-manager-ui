
import {Button,Modal,Input,Row,Col} from 'antd'
import { PlusOutlined } from '@ant-design/icons'



const AddOrEditStep = ({step,handleChange,visible,onAdd,closeModal,title,saveStep}) => {

    
    return (
        <div className="steps-add-edit-container">
            <Button type="link" onClick={onAdd} icon={<PlusOutlined />}>Add Step</Button>
            <Modal title={title} visible={visible} onCancel={closeModal} maskClosable={false} okText="Save" cancelText="Close" onOk={saveStep}>
                <Row gutter={[30,20]}>
                    <Col span={20}>
                        <label className="add-edit-step-modal-field-label">Description</label>
                        <Input placeholder="Description" value={step?.stepDescription} name="stepDescription" onChange={handleChange} />
                    </Col>
                    <Col span={20}>
                        <label className="add-edit-step-modal-field-label">Expected Result</label>
                        <Input placeholder="Expected Result" value={step?.expectedResult} name="expectedResult" onChange={handleChange} />
                    </Col>
                    <Col span={20}>
                        <label className="add-edit-step-modal-field-label">Actual Result</label>
                        <Input placeholder="Actual Result" value={step?.actualResult} name="actualResult" onChange={handleChange} />
                    </Col>
                    <Col span={12} className="add-edit-step-status-field-container">
                        <label className="add-edit-step-modal-field-label">Status</label>
                        <select value={step?.status} onChange={handleChange} name="status" className="add-edit-step-status-field">
                            <option value="NO_RUN">no run</option>
                            <option value="PASS">passed</option>
                            <option value="FAIL">failed</option>
                            <option value="BLOCKED">blocked</option>
                        </select>
                    </Col>
                </Row>
            </Modal>

        </div>

    )
}

export default AddOrEditStep
