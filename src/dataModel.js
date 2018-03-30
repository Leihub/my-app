const USER_TOKEN = 'userToken'

const API = 'http://114.215.80.72:4545/'
function _request(_method, _api, _params, _onSuccess, _onError) {
  let _options = {
    method: _method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: (_method == 'GET') ? null : JSON.stringify(_params)
  }
  if(_method.toLowerCase() == 'get'){
    _api += Tools._getSearchFromObject(_params)
  }
  fetch(_api,_options)
    .then(Tools.checkStates)
    .then(Tools.parseJSON)
    .then((data)=>{
      _onSuccess(data)
    })
    .catch((err)=>{
      console.log(err)
      if(err.state == 401) {
        alert('登录过期，重新登录')
        window.location.hash = 'login'
        return
      }
      if(err.response) {
        err.response.json().then((data)=>{
          console.log(data)
          if(data.message)
            alert(data.message)
        })
      }
    })
}

function _upload(_api,_formdata,_onSuccess,_onError){
  let oReq = new XMLHttpRequest()
  oReq.open('POST',_api)
  oReq.onload = (e) => {
    let ret = JSON.parse(oReq.responseText)
    if(oReq.status == 200) {
      _onSuccess(ret)
    }else{
      let err = ret
      if(err.message) alert(err.message)
    }
  }
  oReq.send(_formdata)
}

let Tools = {
  checkStates: function (response) {
    if (response.ok) {
      return response
    }else{
      let error = new Error(response.statusText)
      error.state = response.state
      error.response = response
      throw error
    }
  },
  parseJSON:function(response){
    return response.json()
  },
  _getSearchFromObject:function(param,key){
    if(param == null) return ''
    let _search = '?'
    for(let key in param){
      _search += `${key}=${encodeURIComponent(param[key])}&`
    }
    return _search.slice(0,-1)
  }
}

let UserModel = {
  storeToken: (token) => {
    localStorage.setItem(USER_TOKEN, token)
  },
  fetchToken: () => {
    return localStorage.getItem(USER_TOKEN)
  },
  register: (_params,_success,_error) => {
    _request('POST',`${API}user/register`,_params,_success,_error)
  },
  login: (_params,_success,_error) => {
    _request('POST',`${API}user/login`,_params,_success,_error)
  },
  getUserInfo: (_params,_success,_error) => {
    _request('GET',`${API}user/getUserInfo`,_params,_success,_error)
  },
  uploadAvatar: (_params,_success,_error) => {
    _upload(`${API}user/uploadAvatar`,_params,_success,_error)
  },
  fetchArticle: (_params,_success,_error) => {
    _request('GET',`${API}user/fetchArticle`,_success,_error)
  }
}

export {
  UserModel
}