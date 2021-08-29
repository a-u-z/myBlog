import React from 'react'
import { useState, useContext } from 'react'
import { getMe, register } from './WebAPI'
import { useHistory } from 'react-router-dom'
import { Authorization } from './Contexts'
const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { setUser } = useContext(Authorization)
  const history = useHistory()
  const handleFormSubmit = e => {
    e.preventDefault()
    let nickname = e.target.elements.nickname?.value
    let username = e.target.elements.username?.value
    let password = e.target.elements.password?.value
    let passwordAgain = e.target.elements.passwordAgain?.value
    if (password !== passwordAgain) {
      return setErrorMessage('兩次密碼不相同')
    }

    register(nickname, username, password).then(data => {
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }
      if (data.ok === 1) {
        localStorage.setItem('token', data.token)
        getMe().then(response => {
          if (data.ok !== 1) {
            localStorage.setItem('token', null)
            return setErrorMessage(response.toString())
          }
          setUser(response.data)
          history.push('/')
        })
      }
    })
  }

  return (
    <div className="flex h-auto bg-pink-200">
      <div className="w-full max-w-md px-16 py-10 m-auto my-8 bg-white border rounded-lg border-primaryBorder shadow-default">
        <h1 className="mt-4 mb-12 text-2xl font-medium text-center text-primary">
          Create a new account 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username">Nickname</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="nickname"
              placeholder="Your nickname"
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="username"
              placeholder="Your username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Your Password"
            />
          </div>
          <div>
            <label htmlFor="password">Password Again</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="passwordAgain"
              placeholder="Your Password Again"
            />
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="flex items-center justify-center mt-6">
            <button
              className={` bg-pink-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
