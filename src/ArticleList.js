import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { getFiveArticle } from './WebAPI'
import { CheckNewArticleAmount } from './Contexts'
import PageBar from './PageBar'
import Body from './Body'
const ArticleListPage = () => {
  const [articles, setArticles] = useState([]) // 這裡存放去資料庫抓出的文章資料
  const [articlesAmount, setArticlesAmount] = useState(null) // 去資料庫抓的文章總數，用 response 的 header 的資訊
  const [singleArticle, setSingleArticle] = useState(null) // 如果有值，就表示要看單一篇文章，頁面就會改變

  const { newArticleAmount } = useContext(CheckNewArticleAmount) // 取出用 useContext 傳送的 state

  const [nowPage, setNowPage] = useState(1) // 當前頁面，初始值是第一頁
  useEffect(() => {
    getFiveArticle(nowPage).then(result => {
      setArticles(result.articles) // 資料庫拿回來的資料放入 articles 這個 state 裡面
      setArticlesAmount(result.articlesAmount) // 登記文章總數，用來計算最後一頁是多少用的
    })
  }, [nowPage, newArticleAmount]) // 依賴當前頁面（nowPage），如果現在是第三頁那就要重新執行一次
  // 依賴 newArticleAmount(看是否有新增文章)，如果有新增文章，那麼資料要重新抓取，這樣才會顯示最新的文章
  return (
    <>
      <Body
        articles={articles}
        singleArticle={singleArticle}
        setSingleArticle={setSingleArticle}
      ></Body>
      {/* 如果有 singleArticle 代表現在是單篇文章模式，不是文章列表模式，所以就不用顯示頁數的 bar */}
      {singleArticle ? (
        ''
      ) : (
        <PageBar
          articlesAmount={articlesAmount}
          setNowPage={setNowPage}
          nowPage={nowPage}
        ></PageBar>
      )}
    </>
  )
}

export default ArticleListPage
