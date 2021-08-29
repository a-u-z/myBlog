import React from 'react'
function PageBar({ articlesAmount, setNowPage, nowPage }) {
  let lastPage = Math.ceil(articlesAmount / 5) // 無條件進入，計算最後一頁的數字該是多少
  const arr = Array(lastPage).fill(null) // 有幾頁，就要跑幾圈，所以就用一個 array 給 map 用
  function handleClick(pageNumber) {
    setNowPage(pageNumber)
  }
  function Paginate({ pageNumber }) {
    return (
      <button
        className="mx-1 inline-block my-3 py-1.5 px-2 border-2 bg-pink-200 text-gray-700  rounded-md border-pink-200 border-double"
        onClick={() => handleClick(pageNumber)}
      >
        第{pageNumber}頁
      </button>
    )
  }
  return (
    <div className="text-center ">
      {arr.map((currentValue, index) => {
        if (nowPage === index + 1) {
          // 當前頁面的外觀跟題他頁不同，所以拉出來獨立寫一個
          return (
            <button
              key={index + 1}
              className="mx-1 inline-block my-3 py-1.5 px-2 border-2 bg-pink-600 text-white bg-opacity-70  rounded-md border-pink-600 border-opacity-10 border-double"
              onClick={() => handleClick(nowPage)}
            >
              第{nowPage}頁
            </button>
          )
        } else if (index + 1 === 1) {
          // 第一頁，一定要顯示
          return <Paginate key={index + 1} pageNumber={index + 1}></Paginate>
        } else if (index + 1 === lastPage) {
          // 最後一頁，一定要顯示
          return <Paginate key={index + 1} pageNumber={index + 1}></Paginate>
        } else if (Math.abs(nowPage - index - 1) <= 1) {
          // 當前頁前後一頁，一定要顯示
          return <Paginate key={index + 1} pageNumber={index + 1}></Paginate>
        } else if (Math.abs(nowPage - index - 1) <= 2) {
          // 當前頁的前後兩頁，都用 ... 顯示，樣式不同，所以也獨立寫樣式
          // 如果總共有 10 頁，現在在第五頁，用 else 寫會變成 p.2 p.3 都會變成 「...」
          // 我只要一個 「...」，所以用 else if
          return (
            <button
              key={index + 1}
              className="mx-1 inline-block my-3 py-1.5 px-2 border-2 bg-pink-200 text-gray-700  rounded-md border-pink-200 border-double"
            >
              ..........
            </button>
          )
        }
      })}
    </div>
  )
}

export default PageBar
