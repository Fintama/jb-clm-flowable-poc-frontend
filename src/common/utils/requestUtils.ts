import { HttpError, NetworkError } from 'common/error';

const createHeaders = () => ({
  'Content-Type': 'application/json',
});

// Fetch will throw TypeErrors with the message 'Network request failed'
// when there is a network issue (wrong url, no connectibity etc).
// We throw a custom type to differentiate from other TypeErrors when
// handling these errors in different parts of our app
const getNetworkErrorOrOriginalError = (originalError: any) => {
  if (originalError.name === 'TypeError' && originalError.message === 'Network request failed') {
    return new NetworkError(originalError.message);
  } else {
    return originalError;
  }
};

const handleNotOkResponse = async (response: Response, customStatusCodeHandlers: any = {}) => {
  if (!response.ok) {
    const statusStr = response.status.toString();
    if (customStatusCodeHandlers[statusStr]) {
      return customStatusCodeHandlers[statusStr]();
    } else {
      let message;
      // check if the server sent a message for the error,
      try {
        const json = await response.json();
        message = json.message;
      } catch (err) {
        //ignore error from trying to convert the response to JSON
      }
      if(response.status && response.statusText) {
        message = `${response.status} - ${response.statusText}`
      }
      
      throw new HttpError(response.status, message);
    }
  }
};

export { createHeaders, getNetworkErrorOrOriginalError, handleNotOkResponse };
