import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const adminRole = "faculty";

export const BASE_URL = "http://localhost:1818"

export const REPORT_URL = "http://localhost:1819"

export const FILE_URL = "http://localhost:1820"

export const CHAT_APP_URL = "http://localhost:1821"


// Function to get the username from the token
export const getUsernameFromToken = () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt_token='))
      ?.split('=')[1];

    if (!token) {
      //   console.error('JWT token not found in cookies');
      return null;
    }

    // Decode the token
    const decodedToken = jwtDecode(token);

    return decodedToken?.sub || null;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};


// Fetch user here
export const fetchUser = async () => { 
  try {
    const username = getUsernameFromToken();
    const response = await axios.get(`${BASE_URL}/students/u/${username}`, {
      withCredentials: true,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Function to get the username from the token
export const getTokenFromCookie = () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt_token='))
      ?.split('=')[1];

    if (!token) {
      console.error('JWT token not found in cookies');
      return null;
    }

    return token || null;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

// Function to get the role from the token
export const getRole = () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt_token='))
      ?.split('=')[1];

    if (!token) {
      console.error('JWT token not found in cookies');
      return null;
    }

    const { role } = jwtDecode(token)

    return role || null;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

export const createRoomApi = async (roomDetail) => {
  const respone = await axios.post(`${CHAT_APP_URL}/api/v1/rooms/${roomDetail}`, null, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return respone.data;
};

export const joinChatApi = async (roomId) => {
  const response = await axios.get(`${CHAT_APP_URL}/api/v1/rooms/${roomId}`);
  return response.data;
};

export const getMessagess = async (roomId, size = 50, page = 0) => {
  const response = await axios.get(
    `${CHAT_APP_URL}/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`
  );
  return response.data;
};