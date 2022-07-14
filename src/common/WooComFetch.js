import axios from 'axios'
import theme from './Theme.style'
import md5 from 'react-native-md5'
// Get Request
export const getHeaders = () => {
  const d = new Date()
  return {
    headers: {
      'consumer-key': md5.hex_md5(theme.consumerKey).toString(),
      'consumer-secret': md5.hex_md5(theme.consumerSecret).toString(),
      'consumer-nonce':
        d.getMilliseconds().toString() +
        d.getTime().toString() +
        '-' +
        Math.floor(Math.random() * 999) +
        1,
      'consumer-device-id': theme.deviceId,
      'consumer-ip': theme.ipAdress + '.' + d.getMilliseconds().toString(),
      'Content-Type': 'application/json'
    }
  }
}

// Get Form Request
export const getFormHeaders = () => {
  const d = new Date()
  return {
    headers: {
      'consumer-key': md5.hex_md5(theme.consumerKey).toString(),
      'consumer-secret': md5.hex_md5(theme.consumerSecret).toString(),
      'consumer-nonce':
        d.getMilliseconds().toString() +
        d.getTime().toString() +
        '-' +
        Math.floor(Math.random() * 999) +
        1,
      'consumer-device-id': theme.deviceId,
      'consumer-ip': theme.ipAdress + '.' + d.getMilliseconds().toString(),
      'Content-Type': 'multipart/form-data'
    }
  }
}

export const postHttp = async (url, body) => {
 // url = 'https://omerasoftware.com/json/countries.json';
	console.log('Url========>>>>>>>', url)
	console.log('body========>>>>>>>', body)
 
  try {
      const res = await axios.post(url, body, getHeaders())
	//  console.log('Return Data =====>>>', JSON.stringify(res.data))
      return res.data
  } catch (err) {
	  console.log('Error Data =====>>>', err)
      return err
  }
}

export const postFormHttp = async (url, body) => {
 let obj = {'status':1}
  try {
      const res = await axios.post(url, body, getFormHeaders())
      return res.obj
  } catch (err) {
      return err
  }
}

// Get Request
export const getHttp = async (url, body) => {
  try {
    const res = await axios.get(url, getHeaders())
    return res
  } catch (err) {
    return err
  }
}

// Get Request
export const getUrl = () => {
  if (theme.url.startsWith('https')) {
    return theme.url
  } else {
   // return theme.url.replace('http', 'https')
    return theme.url
  }
}

// Get Request
export const getBaseUrl = () => {
  if (theme.baseUrl.startsWith('https')) {
    return theme.baseUrl
  } else {
   // return theme.url.replace('http', 'https')
    return theme.baseUrl
  }
}

const WooComFetch = {
  postHttp: async (url, body) => {
    const returnObject = {}
    try {
      const res = await axios.post(url, body, getHeaders())
      returnObject.success = res.data.success
      returnObject.data = res.data
      return returnObject
    } catch (err) {
      return err
    }
  },

  getAllBanners: async type => {
    try {
      const response = await getHttp(
        theme.url.startsWith('https')
          ? theme.url + '/api/' + type
          : theme.url.replace('http', 'https') + '/api/' + type,
        {}
      )
      return response
    } catch (err) {
      return err
    }
  }
}
export default WooComFetch
