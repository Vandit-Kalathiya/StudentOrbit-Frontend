import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  API_BASE_URL,
  REPORT_SERVICE_URL,
  FILE_SERVICE_URL,
  CHAT_SERVICE_URL,
} from './src/config/api.config';
import { JWT_COOKIE_NAME, ADMIN_ROLE, CHAT_CONFIG } from './src/config/app.config';

// Export for backward compatibility
export const adminRole = ADMIN_ROLE;
export const BASE_URL = API_BASE_URL;
export const REPORT_URL = REPORT_SERVICE_URL;
export const FILE_URL = FILE_SERVICE_URL;
export const CHAT_APP_URL = CHAT_SERVICE_URL;

/**
 * Get username from JWT token stored in cookies
 * @returns {string|null} Username or null if not found
 */
export const getUsernameFromToken = () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${JWT_COOKIE_NAME}=`))
      ?.split('=')[1];

    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode(token);
    return decodedToken?.sub || null;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

/**
 * Get JWT token from cookies
 * @returns {string|null} Token or null if not found
 */
export const getTokenFromCookie = () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${JWT_COOKIE_NAME}=`))
      ?.split('=')[1];

    if (!token) {
      console.error('JWT token not found in cookies');
      return null;
    }

    return token;
  } catch (error) {
    console.error('Error retrieving JWT token:', error);
    return null;
  }
};

/**
 * Get user role from JWT token stored in cookies
 * @returns {string|null} Role ('student' or 'faculty') or null if not found
 */
export const getRole = () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${JWT_COOKIE_NAME}=`))
      ?.split('=')[1];

    if (!token) {
      console.error('JWT token not found in cookies');
      return null;
    }

    const { role } = jwtDecode(token);
    return role || null;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

/**
 * Create a new chat room
 * @param {string} roomDetail - Room identifier
 * @returns {Promise<object>} Room data
 */
export const createRoomApi = async (roomDetail) => {
  const response = await axios.post(`${CHAT_APP_URL}/api/v1/rooms/${roomDetail}`, null, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};

/**
 * Join a chat room
 * @param {string} roomId - Room identifier
 * @returns {Promise<object>} Room data
 */
export const joinChatApi = async (roomId) => {
  const response = await axios.get(`${CHAT_APP_URL}/api/v1/rooms/${roomId}`);
  return response.data;
};

/**
 * Get messages from a chat room
 * @param {string} roomId - Room identifier
 * @param {number} size - Number of messages per page
 * @param {number} page - Page number
 * @returns {Promise<Array>} Array of messages
 */
export const getMessagess = async (roomId, size = CHAT_CONFIG.MESSAGE_PAGE_SIZE, page = 0) => {
  const response = await axios.get(
    `${CHAT_APP_URL}/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`
  );
  return response.data;
};
