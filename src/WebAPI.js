const BASE_URL = 'https://student-json-api.lidemy.me'

export const getFiveArticle = nowPage => {
  async function fetchFiveArticle() {
    try {
      const articleFetch = await fetch(
        `${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${nowPage}&_limit=5`
      )
      const articles = await articleFetch.json()
      const articlesAmount = articleFetch.headers.get('x-total-count')
      const result = { articles, articlesAmount }
      return result
    } catch (error) {}
  }
  const result = fetchFiveArticle()
  return result
}
export const getSingleArticle = id => {
  return fetch(`${BASE_URL}/posts?id=${id}`).then(res => res.json())
}
export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then(res => res.json())
}
export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then(res => res.json())
}
export const addArticle = (title, body, token) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then(res => res.json())
}
export const getMe = () => {
  // 發文的時候也需要驗證使用者，所以要用 getMe 這個 api 用 token 驗證
  // 而不用再輸入一次帳號密碼
  const token = localStorage.getItem('token')
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.json())
}

export const deleteArticle = articleNumber => {
  //用來刪除文章用的，沒有在頁面顯示出來
  return fetch(`${BASE_URL}/posts/${articleNumber}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}
