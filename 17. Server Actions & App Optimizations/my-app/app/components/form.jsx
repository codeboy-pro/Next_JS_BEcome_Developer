import React from 'react'
import { createUser } from '../../actions';

import { useFormState } from 'react-dom'

const Form = () => {
const [state,formAction]=useFormState(createUser,{});
  return (
    <form action={formAction}>
        <input name='email' placeholder='user@example.com'/>
        <button type='submit'></button>
        {state.error && <p>state.error</p>}
    </form>
  )
}

export default Form
