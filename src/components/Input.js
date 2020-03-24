import React, { useReducer, useEffect } from 'react';

import { validate } from '../util/inputValidators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators)
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
}

const inputClassList = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"

const Input = props => {

  const [inputState, dispatch] = useReducer(inputReducer, {value: "", isTouched: false, isValid: false});

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const inputChangeHandler = event => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators
    });
  }

  const inputTouchHandler = () => {
    dispatch({
      type: "TOUCH"
    })
  }

  return(
    <div>
      {!inputState.isValid && inputState.isTouched && <p className="text-center text-md text-red-600 pt-2">{props.errorText}</p>}
      <input
        id={props.id}
        className={inputClassList}
        value={inputState.value}
        type={props.type}
        onChange={inputChangeHandler}
        onBlur={inputTouchHandler}
        placeholder={props.placeholder}
        required>
      </input>
    </div>
  );
}

export default Input;
