import {Redirect, Route, Switch} from "react-router-dom";

import {Layout} from "antd";

import setupApi from "../../api/apiConfig";
import Statistics from "../Statistics/Statistics";
import WalkForm from "../WalkForm/WalkForm";
import Sider from "./Sider/Sider";
import './App.scss';

const App: React.FC = () => {
  setupApi();

  return (
    <Layout className="App">
      <Sider />
      <Layout>
        <Layout.Content>
          <div className="App__content">
            <Switch>
              <Route path="/new-walk">
                <WalkForm />
              </Route>
              <Route path="/statistics/:activeTab?">
                <Statistics />
              </Route>
              <Route path='*'>
                <Redirect to="/new-walk" />
              </Route>
            </Switch>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;