import React from 'react'
import { Switch, Route, Router, Link, Redirect } from 'react-router-dom'

import { createBrowserHistory } from 'history'

import SignUp from '../Authorization/SignUp'
import Login from '../Authorization/Login'
import AppLogo from '../AppTools/AppLogo'
import Toastify from '../AppTools/Toastify'

const history = createBrowserHistory()

const Authorization = () => {
  return (
    <Router history={history}>
      <div className="w-full h-full flex flex-col justify-center px-12 md:px-2">
        <div className="flex flex-col w-full items-center">
          <div>
            <Toastify />
            <AppLogo size="text-2xl md:text-6xl text-black" />
            <div className="text-2xl py-8">
              <p>
                <span className="text-black">Welcome back!</span>
              </p>
              <p>
                <span>
                  <Link to="/auth/login" className="text-blue-600">
                    Sign in
                  </Link>{' '}
                  to continue to YourApp
                </span>
              </p>
            </div>
            <div>
              <Switch>
                <Route path="/auth/register">
                  <SignUp />
                  <Redirect to="/auth/register" />
                </Route>
                <Route path="/auth/login">
                  <Login />
                  <Redirect to="/auth/login" />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default Authorization
