const coinID = [
	{
		symbol: 'BTC',
		uuid: 'Qwsogvtv82FCd'
	},
	{
		symbol: 'ETH',
		uuid: 'razxDUgYGNAdQ'
	},
	{
		symbol: 'DOGE',
		uuid: 'a91GCGd_u96cF'
	},
	{
		symbol: "LTC",
		uuid: 'D7B1x_ks7WhV5'
	},
	{
		symbol: 'ATOM',
		uuid: 'Knsels4_Ol-Ny'
	}
];

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
		'X-RapidAPI-Key': 'e7d9710815msh122213a08c14487p1d2ed7jsnfcc325940b79'
	}
};

async function getCoinData(symbol) {
	let data = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinID[0].uuid}/price?referenceCurrencyUuid=yhjMzLPhuIDl`, options)
	console.log(data)
}

getCoinData()