import {jwtDecode} from 'jwt-decode';

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

      const {role} = jwtDecode(token)
  
      return role || null;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };


export const adminRole = "admin";