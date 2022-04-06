const currencyQuoteBRLApi = async () => {
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(ENDPOINT);
  const json = await response.json();
  return (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
};

export default currencyQuoteBRLApi;
