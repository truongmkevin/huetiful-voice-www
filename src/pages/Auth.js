import React, { useState, useReducer, useCallback, useContext } from 'react';
import axios from 'axios';

import Input from '../components/Input';
import { AuthContext } from '../context/authContext';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../util/inputValidators';

const authReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const Auth = () => {

  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, dispatch] = useReducer(authReducer, {
    inputs: {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const authFormSubmitHandler = async event => {
    event.preventDefault();

    axios.post("http://localhost:3001/api/users/login",
      {
        user: {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }
      })
      .then(res => {
        console.log(res)
      });

    auth.login();
    console.log("auth form submitted", formState.inputs);
  }

  const switchAuthHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="text-5xl text-center text-indigo-700 font-bold">
            Huetiful Voice
          </h2>
          <h2 className="mt-6 text-center text-3xl leading-9 text-indigo-700">
            {isLoginMode ? "Sign in to your account" : "Sign up for free"}
          </h2>
          <p className="text-lg mt-2 text-center leading-5 text-indigo-700">
            or&nbsp;
            <a href="#" onClick={switchAuthHandler} className="text-lg text-indigo-500 hover:text-indigo-200 focus:outline-none focus:underline transition ease-in-out duration-150">
              {isLoginMode ? "sign up for free" : "sign into an existing account"}
            </a>
          </p>
        </div>
        <form className="mt-8" onSubmit={authFormSubmitHandler}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address"
                onInput={inputHandler}
              />
            </div>
            <div className="-mt-px">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="Password must be at least 8 characters"
                onInput={inputHandler}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-indigo-700">
                Remember me
              </label>
            </div>

            <div className="text-sm leading-5">
              <a href="#" className="font-medium text-indigo-700 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="mt-6">
            <button type="submit" disabled={!formState.isValid} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-white group-hover:text-indigo-500 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              {isLoginMode ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;