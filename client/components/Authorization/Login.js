import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import Button from '../AppTools/Button'
import { signIn } from '../../redux/reducers/auth'

const Login = () => {
  const dispatch = useDispatch()
  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field')
      .max(35, 'Too long email'),
    password: Yup.string()
      .required('Required field')
      .min(8, 'Minimim password length 8')
      .max(30, 'Maximum password length 30')
  })

  const onSubmit = (values) => {
    dispatch(signIn(values))
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Formik
        validateOnChange
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form noValidate>
          <div className="h-16">
            <Field
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              className="appearance-none bg-transparent focus:bg-transparent focus:border-b-2 border-blue-600
              outline-none tracking-wider placeholder-gray-600 focus:placeholder-transparent"
            />
            <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
          </div>

          <div className="h-16">
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              className="appearance-none bg-transparent focus:bg-transparent focus:border-b-2 border-blue-600
              outline-none tracking-wider placeholder-gray-600 focus:placeholder-transparent"
            />
            <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
          </div>

          <div>
            <Button type="submit" title="Login" styleButton="text-2xl text-blue-600" />
          </div>
          <div className="text-xs py-4 text-gray-700">
            <span>Don&apos;t have an account?</span>
            <Link to="/auth/register">
              <span className="text-red-600"> Sign up</span>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
