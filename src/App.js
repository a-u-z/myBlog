import './App.css'
import { useState, useEffect } from 'react' // 有用到任何 hooks 都要在這邊 import 要用 {} 包起來
import './style.css'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
// 用 HashRouter 可以解決路徑重新整理變成向 Server 發送 request 的問題
import { getMe } from './WebAPI'
import LoginPage from './LoginPage'
import RegisterPage from './Register'
import AddArticlePage from './AddArticle'
import AboutMePage from './AboutMe'
import ArticleListPage from './ArticleList'
import Header from './Header'

import { Authorization, CheckNewArticleAmount } from './Contexts'
// import createContext 的東西，才可以用 <XXX.Provider value={}> 傳遞出去
function App() {
  const [user, setUser] = useState(null) // user 有東西就是有登入，沒有就是沒登入
  useEffect(() => {
    getMe().then(response => {
      response.ok !== 1
        ? localStorage.setItem('token', null)
        : setUser(response.data)
    })
  }, [])
  // 只執行一次，預防如果登入了，然後重新整理，user 就被清掉，所以透過 localStorage 還存著的 token 來驗證

  const [newArticleAmount, setNewArticleAmount] = useState(0)
  // 如果有新增文章，那 newArticleAmount 會 ＋1 然後連動到 useEffect 觸發重新執行
  return (
    <>
      <Authorization.Provider value={{ user, setUser }}>
        {/* 用 useContext 傳送需要的東西 */}
        <CheckNewArticleAmount.Provider
          value={{ newArticleAmount, setNewArticleAmount }}
        >
          <div className="flex flex-wrap py-5">
            <div className="w-full px-14 ">
              <Header></Header>
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border shadow rounded-2xl sm:rounded-lg">
                      <Router>
                        <Switch>
                          <Route exact path="/">
                            <ArticleListPage></ArticleListPage>
                          </Route>
                          <Route path="/login">
                            <LoginPage></LoginPage>
                          </Route>
                          <Route path="/register">
                            <RegisterPage></RegisterPage>
                          </Route>
                          <Route path="/add-article">
                            <AddArticlePage></AddArticlePage>
                          </Route>
                          <Route path="/about-me">
                            <AboutMePage></AboutMePage>
                          </Route>
                        </Switch>
                      </Router>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CheckNewArticleAmount.Provider>
      </Authorization.Provider>
    </>
  )
}

export default App
