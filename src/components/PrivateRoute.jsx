import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../services/auth.service';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => {
            const token = AuthService.getToken();
            if (!token) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            return <Component {...props} />
        }} />
    );
}