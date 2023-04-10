import axios from "axios";

// Lấy token từ localStorage
export const token = localStorage.getItem('token');

// Tạo axiosClientJson với header Authorization chứa token
export const  axiosClientJson = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ` + token, // Thêm header "Authorization" với giá trị là "Bearer {token}"
  },
});

// Tạo axiosClientFormData với header Authorization chứa token
export const axiosClientFormData = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ` + token, // Thêm header "Authorization" với giá trị là "Bearer {token}"
  },
});


/**
 * token  => localStorage.getItem('token')
 * userinfo => localStorage.getItem('userInfo')
 */


