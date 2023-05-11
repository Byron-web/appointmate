let REACT_APP_API_ENDPOINT;

if (process.env.NODE_ENV === "development") {
  REACT_APP_API_ENDPOINT = process.env.REACT_APP_REACT_APP_API_ENDPOINT;
} else {
  REACT_APP_API_ENDPOINT = "";
}

export default {
  REACT_APP_API_ENDPOINT,
};
