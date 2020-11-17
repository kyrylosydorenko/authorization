import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import Button from '../AppTools/Button'
import { register } from '../../redux/reducers/auth'

const SignUp = () => {
  const dispatch = useDispatch()
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required field')
      .max(35, 'Too long email'),
    username: Yup.string()
      .min(3, 'Minimim password length 3')
      .max(30, 'Maximum password length 30'),
    password: Yup.string()
      .required('Required field')
      .min(8, 'Minimim password length 8')
      .max(30, 'Maximum password length 30'),
    confirm_password: Yup.string()
      .required('Required field')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const onSubmit = (values) => {
    dispatch(register(values))
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
              id="username"
              type="text"
              name="username"
              placeholder="Name"
              className="appearance-none bg-transparent focus:bg-transparent focus:border-b-2 border-red-600
              outline-none tracking-wider placeholder-gray-600 focus:placeholder-transparent"
            />
            <ErrorMessage name="username" component="div" className="px-2 text-red-600 text-xs" />
          </div>
          <div className="h-16">
            <Field
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              className="appearance-none bg-transparent focus:bg-transparent focus:border-b-2 border-red-600
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
              className="appearance-none bg-transparent focus:bg-transparent focus:border-b-2 border-red-600
              outline-none tracking-wider placeholder-gray-600 focus:placeholder-transparent"
            />
            <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
          </div>
          <div className="h-16">
            <Field
              id="confirm_password"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="appearance-none bg-transparent focus:bg-transparent focus:border-b-2 border-red-600
              outline-none tracking-wider placeholder-gray-600 focus:placeholder-transparent"
            />
            <ErrorMessage
              name="confirm_password"
              component="div"
              className="text-red-600 text-xs"
            />
          </div>

          <div>
            <Button type="submit" title="Sign up" styleButton="text-2xl text-red-600" />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default SignUp
