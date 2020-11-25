import React from 'react';
import { Route, Switch } from "react-router";
import {AppStore} from "./store/store";
import './styles/styles.scss'
import {Home} from "./pages/Home/Home";


function App() {

    return (
        <React.StrictMode>
            <Switch>
                <Route
                    path="/"
                    render={props => {
                        return (
                            <AppStore>
                                <Home />
                            </AppStore>
                        );
                    }}
                />
            </Switch>
        </React.StrictMode>
    );
}

export default App;
