import React from 'react'
import { createUser } from '../../actions';

const UserForm = () => {
  //inline server action
//   async function createUser(formData) {
//     "use server";
//     const name = formData.get("name");
//     console.log(name);
//   }

  return (
    <form action={createUser}>
        <input type="text" name="name" placeholder='John Doe' />
        <button type='submit'>Create</button>
    </form>
  )
}

export default UserForm