const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
		'X-RapidAPI-Key': 'a0f9c2e4cdmshbe352db2ac16675p113388jsne92dbdd69642'
	}
};

fetch('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));