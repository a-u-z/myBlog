import React from 'react'
function SingleArticle({ singleArticle, setSingleArticle }) {
  function handelClickBack() {
    setSingleArticle(null)
    // 回到上一頁的按鈕就是清空 singleArticle 這樣頁面就會便回成文章列表模式
    // 為了要在單篇文章模式下，點左上的「React 部落格」可以回到文章列表模式
    // 把點左上的「React 部落格」的 Router 改成 "/" 真的重發一次 request
  }
  return (
    <div className="flex h-auto bg-pink-200 bg-gray-bg1 rounded-xl">
      <div className="w-full max-w-2xl px-12 py-10 m-auto my-8 bg-white border border-pink-500 rounded-2xl shadow-default">
        <h1 className="mt-4 mb-8 text-3xl font-medium tracking-widest text-center text-pink-500 text-primary">
          {singleArticle.title}
        </h1>
        <h4 className="mt-2 mb-12 font-medium tracking-widest text-left text-pink-400 text-m text-primary">
          日期：{new Date(singleArticle.createdAt).toLocaleString()}
        </h4>
        <h4 className="mt-4 mb-12 text-xl leading-8 tracking-widest text-left text-pink-400 text-primary">
          {singleArticle.body}
        </h4>
        <button
          onClick={handelClickBack}
          className=" inline-block p-1.5 border-2 border-opacity-75 rounded-md border-pink-400 border-double mt-4 mb-12 text-xl leading-8 tracking-widest text-center text-pink-400 text-primary"
        >
          回到上一頁
        </button>
      </div>
    </div>
  )
}

export default SingleArticle
