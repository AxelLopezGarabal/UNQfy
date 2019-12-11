const axios = require('axios')

const serverNotify = 'http://172.20.0.22:5001/api';
const serverLog = 'http://172.20.0.23:5002/api/'

const API ={
    get: path => axios.get(`${serverNotify}${path}`).then(response => response),
    post: (path, body) => axios.post(`${serverNotify}${path}`, body).then(res => res),
    postLog: (body) => axios.post(`${serverLog}`, body).then(res => res),
    put: (path, body) => axios.put(`${serverNotify}${path}`, body).then(console.log(body))
}
module.exports = API;
