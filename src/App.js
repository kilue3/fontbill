import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FullPaageLoader from './component/FullPageLoader';
import Home from "./page/home-all";


const App = () => {
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false)
        }, 0)
    }, []);
    return (
        loading ? <FullPaageLoader /> : [
            <Router>
                <Switch>

                    <Route exact path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    
                </Switch>
            </Router>
        ]

    );
}

export default App;