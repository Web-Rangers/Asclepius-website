export async function getData(url) {
	try {
		const res = await fetch(url)
		const response = res.json();

		return response
	}catch(error){
		console.log(error)
	}
}


export async function postData(url = '', data = {}, method) {
	const response = await fetch(url, {
		method: method, // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			// "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzRUNseXdhVnNxOURBMU1oMElNLTVFTUNsRU5WM1FMTnhuNlh1bDJoOVBnIn0.eyJleHAiOjE2NjkwNTQzNjksImlhdCI6MTY2OTAxODM4MywiYXV0aF90aW1lIjoxNjY5MDE4MzY5LCJqdGkiOiIwY2ViY2U1ZC0zOWRlLTRjMzItOTgyYy0wOGQwNzM3M2VlMzMiLCJpc3MiOiJodHRwczovL2F1dGgucGlydmVsaS5nZS9yZWFsbXMveHJhY29vbi1kZW1vIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjNiMmU0ZmU5LWE1YWEtNDExZS1iZjZjLWY4OTUxYWJjMTdmMyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNzLWNhcnQiLCJzZXNzaW9uX3N0YXRlIjoiOTNkYjVmZjAtMTA2ZC00ZWUyLTg2ZWYtZTIwNTU1MzY3MWMwIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXhyYWNvb24tZGVtbyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI5M2RiNWZmMC0xMDZkLTRlZTItODZlZi1lMjA1NTUzNjcxYzAiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInVzZXJfaWQiOiIzYjJlNGZlOS1hNWFhLTQxMWUtYmY2Yy1mODk1MWFiYzE3ZjMiLCJuYW1lIjoic2hha28gZGF2aXRhc2h2aWxpIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2hhbHZhLmRhdml0YXNodmlsaUBiay5ydSIsImdpdmVuX25hbWUiOiJzaGFrbyIsImZhbWlseV9uYW1lIjoiZGF2aXRhc2h2aWxpIiwiZW1haWwiOiJzaGFsdmEuZGF2aXRhc2h2aWxpQGJrLnJ1In0.IdhCcuJdWHLLMrICEkOU4pNRFEQl4nf8mVUEPPAHSOG-tDOt7nr5HUDHwyDssGiJ0-Hok-oxtpu7EH_pDo0xDPTMImwKB93dyDY_OvMqLfLw5EtsUd6TWySBYPvp3psTAZXe0KZNL4gKuSgEsHnwaWHa6J76FIhZbpxU49KvxUnCXSO4YZ5CMvQlO56AdOixe7sCldelUXpdj5qY6lYjjWL6YZdz9WF7OyVkVS2c8v9I22xfad93r-rIFcJ6e76rOkzr6tMcnBji-WrJzAnbROSqBToYQfPdpNHry2YHrtSXzuWhdow6ukTwGnBMp4u-yS51K6s49Sc5y8EohHm4j",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}