import ContextWrapper from './TestContext'
import AppHeader from './components/AppHeader'
import TestList from './components/TestList'
import TestContainer from './components/TestContainer'

import { Layout} from 'antd';


import 'antd/dist/antd.css'
import './App.css';



const { Content } = Layout;



const App = () => {


  return (
    <ContextWrapper>
      <Layout className="app">
        <AppHeader />
        <Layout>
          <TestList />
          <Content className="site-layout-background test-container">
            <TestContainer />
          </Content>
        </Layout>
      </Layout>
    </ContextWrapper>
   
  )
}

export default App;
