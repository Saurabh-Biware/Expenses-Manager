import React, { Component } from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'
import Welcome from './Welcome'
import Expenses from './modules/Screens/Expenses';
import Income from './modules/Screens/Income'
import BudgetedExpenses from './modules/Screens/BudgetedExpenses'
import Dashboard from './modules/Screens/Dashboard';
import Transaction from './modules/Screens/Transaction';
import blankScreen from '../src/modules/Screens/blankScreen'
export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene>
                    <Scene key="root" hideNavBar={true} >
                        <Scene key="blankScreen" component={blankScreen} title="blankScreen" />
                        <Scene key="login" component={Login} title="Login"    />
                        <Scene key="signup" component={Signup} title="Signup" />
                        <Scene key="welcome" component={Welcome} title="Welcome" />
                    </Scene>
                    <Scene key="app" hideNavBar={true}>
                    <Scene key="profile" component={Profile} title="Profile" back  />
                    <Scene key="Expenses" component={Expenses} title="Add Expenses" />
                    <Scene key="Income" component={Income} title="Add Income" />
                    <Scene key="Transaction" component={Transaction} title="Transaction" hideNavBar={true} />
                    <Scene key="Dashboard" component={Dashboard} title="Dashboard" hideNavBar={true} />
                    <Scene key="BudgetedExpenses" component={BudgetedExpenses} title="BudgetedExpenses" />
                    </Scene>
                </Scene>
            </Router>
        );
    }
}