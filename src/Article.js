import React from 'react'

export default function Article({ article, handleClickSingleArticle }) {
  if (article.body.length > 150) {
    // 如果文章字數太多，超過 150 個字以後就用 ... 來顯示，並且可以點到單篇文章模式
    return (
      <tr key={article.id}>
        <td className="w-12 px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="overflow-x-hidden font-medium text-gray-900 w-96 text-m ">
              {article.title}
            </div>
          </div>
        </td>
        <td className="p-5 text-gray-900 break-all text-m">
          {article.body.substring(0, 150)}
          <span className="inline-block mx-2"> </span>
          {'......'}
          <span className="inline-block mx-2"> </span>
          <button
            className="inline-block p-1.5 border-2 border-opacity-75 rounded-md border-pink-400 border-double"
            onClick={() => handleClickSingleArticle(article.id)}
          >
            閱讀更多
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="px-2 py-3 text-gray-900 whitespace-nowrap text-m">
            {article.userId}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-gray-900 text-m">
            {new Date(article.createdAt).toLocaleString()}
          </div>
        </td>
      </tr>
    )
  } else {
    return (
      <tr key={article.id}>
        <td className="w-12 px-6 py-4 whitespace-nowrap">
          <div className="flex items-center ">
            <div className="overflow-x-hidden font-medium text-gray-900 w-96 text-m ">
              {article.title}
            </div>
          </div>
        </td>
        <td className="p-5 text-gray-900 break-all text-m">{article.body}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="px-2 py-3 text-gray-900 whitespace-nowrap text-m">
            {article.userId}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-gray-900 text-m">
            {new Date(article.createdAt).toLocaleString()}
          </div>
        </td>
      </tr>
    )
  }
}
