import React from 'react'
import { useContext } from 'react'
import { Authorization } from './Contexts'
import { getMe } from './WebAPI'

export default function Header() {
  const { user, setUser } = useContext(Authorization)
  // 取出透過 useContext 的值，用來判斷是否有登入狀態
  getMe()
  function handleLogout() {
    localStorage.setItem('token', '') // 把 localStorage 清空
    setUser(null) // user 清空
    alert('登出成功～～')
  }
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-4 my-4 bg-pink-500 border shadow rounded-xl">
      <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
        <div className="relative flex justify-between w-full px-4 lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="inline-block py-2 mr-4 text-4xl font-bold leading-relaxed tracking-widest text-white whitespace-nowrap"
            href="#/"
          >
            React 部落格
          </a>{' '}
          <span className="inline-block py-2 text-2xl font-bold leading-relaxed tracking-widest text-white ml-9 whitespace-nowrap">
            さくら
          </span>
          <button
            className="block px-3 py-1 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
            type="button"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={'lg:flex flex-grow items-center'}
          id="example-navbar-info"
        >
          <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
            <li className="nav-item">
              <a
                className="flex items-center px-3 py-2 text-xl font-bold leading-snug text-white uppercase hover:opacity-75"
                href="#about-me"
              >
                關於我
              </a>
            </li>
            <li className="mx-4 nav-item">
              {user && (
                <a
                  className="flex items-center px-3 py-2 text-xl font-bold leading-snug text-white uppercase hover:opacity-75"
                  href="#add-article"
                >
                  發表文章
                </a>
              )}
            </li>
            <li className="mx-4 nav-item">
              {!user && (
                <a
                  className="flex items-center px-3 py-2 text-xl font-bold leading-snug text-white uppercase hover:opacity-75"
                  href="#/register"
                >
                  註冊
                </a>
              )}
            </li>
            <li className="mx-4 nav-item">
              {user && (
                <button
                  className="flex items-center px-3 py-2 text-xl font-bold leading-snug text-white uppercase hover:opacity-75"
                  onClick={handleLogout}
                >
                  登出
                </button>
              )}
              {!user && (
                <a
                  className="flex items-center px-3 py-2 text-xl font-bold leading-snug text-white uppercase hover:opacity-75"
                  href="#/login"
                >
                  登入
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
