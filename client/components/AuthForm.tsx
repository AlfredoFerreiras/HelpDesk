import React, {FormEvent} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {authenticate} from '../store'

interface AuthError extends Error {
  response?: {
    data: string;
  };
}

interface RootState {
  auth: {
    error: AuthError;
  }
}

interface AuthFormProps {
  name: string;
  displayName: string;
  handleSubmit: (event: FormEvent) => void;
  error: AuthError;
}

const AuthForm: React.FC<AuthFormProps> = ({ name, displayName, handleSubmit, error }) => {
  return (
    <div >
      <div className='container'>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
    </div>
  )
}

const mapLogin = (state: RootState) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = (state: RootState) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = (dispatch: any) => {
  return {
    handleSubmit(evt: FormEvent) {
      evt.preventDefault()
      const formName = (evt.target as any).name
      const username = (evt.target as any).username.value
      const password = (evt.target as any).password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)