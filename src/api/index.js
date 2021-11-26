import Axios from 'axios';
const baseURL = ' https://chiji14-token-public-sale.herokuapp.com';


const axios = Axios.create({
    baseURL
    // timeout: 10000,
  });
  
  axios.interceptors.request.use(
    function(config) {
      const user = JSON.parse(localStorage.getItem("user"))
      const token = user ? user.access_token : undefined;
      console.log(user, 'hererer')
      if (token != undefined) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config; 
    },
  
    function(error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function(res) {
      return res
    },
    function(err) {
      if (err.response != undefined && err.response.status == 401) {
        // setTimeout(()=>{
        //   window.location.reload()
        // }, 1000)
      }
      return Promise.reject(err);
    }

  )

export const register = (email,password) => {
  return axios.post(`/auth/register`, {email, password});
};

export const login = (username, password) => {
  return axios.post(`/auth/login`, {username, password});
};