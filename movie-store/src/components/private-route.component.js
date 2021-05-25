import React, { Component, Route } from 'react';
import { Redirect } from 'react-router-dom';



const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={
                (props) => 
                    localStorage.getItem('authToken') ?
                    (<Component {...props} />)
                    :
                    (<Redirect to="/auth/login"/>)
                
            }
        />

    );
};

export default PrivateRoute