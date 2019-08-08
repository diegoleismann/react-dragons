
import axios from 'axios';

let Dragon = {
  list:function(app, query, callback){
    axios.get(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon`)
      .then(res => {
        callback(app, res.data);
    })
  },
  get: function(app,query, callback){
    axios.get(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/`+query.id)
      .then(res => {
        console.log(res.data)
        callback(app, res.data);
    })
  },
  insert: function(app, data, callback){
    axios.post(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon`, data)
      .then(res => {
        callback(app, res.data);
    })
  },
  edit: function(app, data, callback){
    axios.put(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/`+data.id, data)
      .then(res => {
        callback(app, res.data);
    })
  },
  delete: function(app,data, callback){
    axios.delete(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/`+data.id)
      .then(res => {
        callback(app, res.data);
    })
  }
}

export default Dragon
