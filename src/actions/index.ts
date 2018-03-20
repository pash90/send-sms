/** Libraries */
import Axios from 'axios';
import urlExtractor from 'string-url-extractor';
import normalizeUrl from 'normalize-url';

/**
 * 
 * @param phone 
 * @param message 
 * @param onComplete 
 */
export const sendSMS = (phone: string, message: string, onComplete: (messageSent: boolean) => void): void => {
  const axiosInstance = Axios.create({
    baseURL: 'https://us-central1-send-sms-10428.cloudfunctions.net',
  })

  axiosInstance.post('sendSMS', {
    to: phone,
    message,
    username: process.env.REACT_APP_USERNAME as string,
    password: process.env.REACT_APP_PASSWORD as string
  })
    .then(response => onComplete(true))
    .catch(error => onComplete(false))
}

export const shortenURLs = (message: string, onComplete: (formattedMessage: string) => void): void => {
  // Get URLS
  const URLs = Array.from(urlExtractor(message));

  // No URLs in message
  if (URLs.length === 0) {
    onComplete(message);
  }

  let newURLs = URLs.map(url => normalizeUrl(url));

  const axiosInstance = Axios.create({
    baseURL: 'https://api-ssl.bitly.com/',
    params: {
      access_token: process.env.REACT_APP_BITLY_TOKEN
    }
  })

  let newMessage = message;

  newURLs.forEach((url, index) => {
    axiosInstance.get('/v3/shorten', {
      params: {
        longUrl: url
      }
    }).then(response => {
      newMessage = newMessage.replace(URLs[index], response.data.data.url)

      if (index === URLs.length - 1) {
        onComplete(newMessage);
      }
    })
  })
}