import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
	console.log(token);
}

const create = async newObj => {
  const config = {
    headers: { Authorization:  token}
  }

  const response = await axios.post(baseUrl, newObj, config)
	return response.data
}

const update = async (id, updatedObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObj)
  return response.data
}

const getAll = async () => {
  const response =  await axios.get(baseUrl)
  return response.data
}

const remove = async (id) =>  {
  const config = {
    headers: { Authorization:  token}
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { 
  getAll ,
  create,
  update,
  remove,
  setToken
}