import React from 'react'
import { getSingleArticle } from './WebAPI'
import SingleArticle from './SingleArticle'
import Article from './Article'
function Body({ articles, singleArticle, setSingleArticle }) {
  async function handleClickSingleArticle(articleId) {
    const result = await getSingleArticle(articleId)
    setSingleArticle(result[0])
  }

  return (
    <>
      {/* 判斷是否是單頁模式 */}
      {singleArticle ? (
        <SingleArticle
          singleArticle={singleArticle}
          setSingleArticle={setSingleArticle}
        ></SingleArticle>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-pink-300">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-m"
              >
                TITLE
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-m"
              >
                CONTENT
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium tracking-wider text-left text-gray-500 uppercase text-m"
              >
                USERID
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-medium tracking-wider text-left text-gray-500 uppercase text-m"
              >
                CREATEDAT
              </th>
            </tr>
          </thead>
          <tbody className="bg-pink-100 divide-y-2 divide-pink-300">
            {articles.map(article => {
              return (
                <>
                  <Article
                    key={article.id}
                    article={article}
                    handleClickSingleArticle={handleClickSingleArticle}
                  />
                </>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Body
