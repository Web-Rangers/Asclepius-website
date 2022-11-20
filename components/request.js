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
			// "Authorization":   "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzRUNseXdhVnNxOURBMU1oMElNLTVFTUNsRU5WM1FMTnhuNlh1bDJoOVBnIn0.eyJleHAiOjE2Njg5NDUwMTksImlhdCI6MTY2ODkzMzAxOSwiYXV0aF90aW1lIjoxNjY4OTMyOTg3LCJqdGkiOiJhZWVlMTMxYi1lNWNiLTQyNDUtYmJkMC0zMzk3NDM3MDVjMTkiLCJpc3MiOiJodHRwczovL2F1dGgucGlydmVsaS5nZS9yZWFsbXMveHJhY29vbi1kZW1vIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijc5OTg2NDYxLTgwMjItNDBjMC1iMGUwLTcyOGM5MWM1MWM2YSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNzLWNhcnQiLCJzZXNzaW9uX3N0YXRlIjoiNzkzMTNiZmItYWI3Ny00NjY3LWFkMDctYjNmZDUyYTFhYTkxIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXhyYWNvb24tZGVtbyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI3OTMxM2JmYi1hYjc3LTQ2NjctYWQwNy1iM2ZkNTJhMWFhOTEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInVzZXJfaWQiOiI3OTk4NjQ2MS04MDIyLTQwYzAtYjBlMC03MjhjOTFjNTFjNmEiLCJuYW1lIjoiTGFzaGEgVGF2YXJ0a2lsYWR6ZSIsInByZWZlcnJlZF91c2VybmFtZSI6Imxhc2hhIiwiZ2l2ZW5fbmFtZSI6Ikxhc2hhIiwiZmFtaWx5X25hbWUiOiJUYXZhcnRraWxhZHplIiwiZW1haWwiOiJsYXNoYS5sYXNoYUBnbWFpbC5jb20ifQ.G8BqWzcHFFUbuTqNynh28ecc25bQVVRcSgnDrtFC1onXBKGkEoohedUFbh9jjscxb7IsXwjWMRm7ZUQvJ5KZHPPNQSzzIpMFv41nSa2uKE-HFnodCSeKFszPsOnriSn7o3FP2ylHz_Zy8gvL3XijAJSejRkte90Oxnf_acHhl7rbdEDuVwv_bEaMMDFV6k34-AQHMSffB8iSrz8RUl4kDI4tFLxoFcFuEN-KEegoSidcIXfrWms_TZrTERetEdfEPsxOwL2jqKQwzYCqxsyM3cGNZgRPeczdE-oxDnMBjn_9uZLoYFcDJROpuhr6_tbhwt-SU7Xz5QpuZ8KoGfKfCA",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}