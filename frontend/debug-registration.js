// Debug script to test registration
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testRegistration() {
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: '1234567890',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    address: '123 Test Street'
  };

  try {
    console.log('Testing registration with data:', testData);
    
    // First test if server is running
    console.log('Testing server connection...');
    const testResponse = await axios.get(`${API_URL}/../test`);
    console.log('Server test response:', testResponse.data);
    
    // Test registration
    console.log('Testing registration...');
    const response = await axios.post(`${API_URL}/auth/register`, testData);
    console.log('Registration successful:', response.data);
    
  } catch (error) {
    console.error('Error details:');
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Config:', error.config);
  }
}

testRegistration();
