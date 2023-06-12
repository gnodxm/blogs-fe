import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Beaer ${newToken}`
}

const create = async newObj => {
  const config = {
    headers: { Authorization:  token}
  }

  const response = await  axios.post(baseUrl, newObj, config)
}

const getAll = async () => {
  const response =  await axios.get(baseUrl)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll ,
  create,
  setToken
}