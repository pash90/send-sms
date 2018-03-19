/** Libraries */
const Functions = require('firebase-functions');
const CORS = require('cors')({ origin: true })
const Axios = require('axios');
const QueryString = require('querystring')

/** Initialisation */
const axiosInstance = Axios.create({
  baseURL: 'https://api.transmitsms.com',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  timeout: 10000
})

const sendSMS = Functions.https.onRequest((request, response) => {
  const { username, password, to, message } = request.body;

  return CORS(request, response, () => {
    axiosInstance.post('send-sms.json', QueryString.stringify({ to, message }), {
      auth: {
        username,
        password
      }
    }).then(axiosResponse => {
      response.sendStatus(axiosResponse.status);
    }).catch(axiosError => {
      response.sendStatus(400);
    })
  })
});

module.exports = {
  sendSMS
}