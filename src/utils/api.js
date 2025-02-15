import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your Calendarific API key
const BASE_URL = 'https://calendarific.com/api/v2';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Get holidays for a specific country and year
export const getHolidays = async (country, year, month = null) => {
  try {
    const response = await api.get('/holidays', {
      params: {
        country,
        year,
        month,
      },
    });
    return response.data.response.holidays;
  } catch (error) {
    console.error('Error fetching holidays:', error);
    throw error;
  }
};

// Cache implementation
const cache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const getCachedHolidays = async (country, year, month = null) => {
  const cacheKey = `${country}-${year}-${month}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  const holidays = await getHolidays(country, year, month);
  cache.set(cacheKey, {
    data: holidays,
    timestamp: Date.now(),
  });

  return holidays;
};