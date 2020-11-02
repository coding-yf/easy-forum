import axios from 'axios';

let myAxios = async function (type, url, data=[]){
  // let res = await reqLogin('201731064121', '123456');
  // axios.defaults.headers.common['Authorization'] = res.data.token;
  if(type === 'get'){
    return await axios.get(url, {
      params:{
        ...data
      }
    })
      .then(res =>{
        return res;
      })
      .catch(err => alert("请求出错了:" + err));
  }
  if(type === 'post'){
    return await axios({
      method: 'post',
      url: url,
      params: {...data},
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        return res;
      })
      .catch(err => alert("请求出错了:" + err));
  }
};

let myFetch = async function(type, url){
  // let res = await reqLogin('201731064121', '123456');
  // const token = res.data.token;
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      // 'Authorization': token
    })
  }).then(res => {
    return res
  });
}

export {
  myAxios,
  myFetch
};
