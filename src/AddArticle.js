import React from 'react'
import { useContext } from 'react'
import { addArticle } from './WebAPI'
import { useHistory } from 'react-router-dom'
import { CheckNewArticleAmount } from './Contexts'

const AddArticlePage = () => {
  const token = localStorage.getItem('token')
  const history = useHistory()
  const { newArticleAmount, setNewArticleAmount } = useContext(
    CheckNewArticleAmount
  ) // 控制住的是否有新增文章，有的話就要重新 render

  const handleFormSubmit = e => {
    e.preventDefault()
    if (!token) {
      // 如果假的 token 也會通過這個判斷，不過在底下的 addArticle 也會帶上 token 來驗證，就沒有用 getMe 來驗證了
      return alert('還沒有登入喔，請登入後再試一次')
    }
    let title = e.target.elements.title?.value
    let content = e.target.elements.content?.value

    addArticle(title, content, token).then(() => {
      // 發 request 的非同步都要記得用 .then 才能做後面的事情
      setNewArticleAmount(newArticleAmount + 1) // 如果 newArticle 有變動 那首頁要重新 render
      history.push('/')
    })
  }

  return (
    <div className="py-12 bg-pink-200 border-4 ">
      <div className="mx-auto rounded-lg max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-pink-200 sm:rounded-lg">
          <div className="p-6 bg-pink-200 border-b border-gray-200">
            <form method="POST" action="action.php" onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="text-xl text-gray-600">
                  Title <span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="w-full p-2 border-2 border-gray-300"
                  name="title"
                  id="title"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="text-xl text-gray-600">
                  Content <span className="text-red-500">*</span>
                </label>
                <br />
                <textarea
                  name="content"
                  className="w-full border-2 border-gray-500 h-96"
                />
              </div>
              <div className="flex p-1">
                <button
                  className="p-3 text-white bg-pink-400 rounded-md hover:bg-pink-500 "
                  required
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddArticlePage
