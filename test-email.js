fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    access_key: 'ab98583a-0205-457d-8e13-5ab57644d035',
    name: 'Test Antigravity',
    email: 'antigravity@gemini.com',
    message: 'Hello, this is a test to verify the Web3Forms access key.'
  })
}).then(res => res.text()).then(data => console.log('Response:', data)).catch(err => console.error('Error:', err));
