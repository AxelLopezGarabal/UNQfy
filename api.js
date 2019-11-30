const axios = require('axios')

const server = 'http://localhost:5001/api';
const serverLog = 'http://localhost:5002/api/'

const API ={
    get: path => axios.get(`${server}${path}`).then(response => response),
    post: (path, body) => axios.post(`${server}${path}`, body).then(res => res),
    postLog: (body) => axios.post(`${serverLog}`, body).then(res => res),
    put: (path, body) => axios.put(`${server}${path}`, body).then(console.log(body))
}
module.exports = API;