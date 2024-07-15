import axios from 'axios';

export const fetchData = async (filters) => {
  const response = await axios.get('http://localhost:5000/api/data', { params: filters });
  return response.data;
};
