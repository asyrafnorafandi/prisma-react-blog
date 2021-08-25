import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routeConfigs } from './configs/Routes';
import { LoginModal, Header } from './components';
import GlobalContextProvider from './contexts/GlobalContext';

export default function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <div className="relative min-h-screen">
          <LoginModal></LoginModal>
          <Header></Header>

          <div className="p-4 bg-blue-50 relative">
            <Switch>
              {routeConfigs.map(r => {
                return <Route path={r.path} exact component={r.component} key={r.name}></Route>;
              })}
            </Switch>
          </div>
        </div>
      </Router>
    </GlobalContextProvider>
  );
}
