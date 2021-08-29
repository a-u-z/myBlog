import React from 'react'
import { useState, useContext } from 'react'
import { login, getMe } from './WebAPI'
import { useHistory } from 'react-router-dom'
import { Authorization } from './Contexts'
const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { setUser } = useContext(Authorization)
  const history = useHistory()
  const handleFormSubmit = e => {
    e.preventDefault()
    let username = e.target.elements.username?.value
    let password = e.target.elements.password?.value
    login(username, password).then(result => {
      if (result.ok === 0) return setErrorMessage(result.message)
      const { token } = result // response 回傳的資料會有 token ，結構出來
      localStorage.setItem('token', token) // 給 localStorage 設定上去
      getMe().then(response => {
        if (response.ok !== 1) {
          localStorage.setItem(null)
          return setErrorMessage(response.toString())
        }
        setUser(response.data) // 覺得其實有拿到上面 token 就可以了，也可以把 user 設定成 token 的值
        // 有值就好，就可以給 header 判斷是否是登入或是登出狀態
        // 就可以少發一個 request
        history.push('/') // 導回首頁
      })
    })
  }

  return (
    <div className="flex h-screen bg-pink-200">
      <div className="w-full max-w-md px-16 py-10 m-auto bg-white border rounded-lg border-primaryBorder shadow-default">
        <h1 className="mt-4 mb-12 text-2xl font-medium text-center text-primary">
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
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
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="flex items-center justify-center mt-6">
            <button
              className={` bg-pink-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
