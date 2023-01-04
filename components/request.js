export async function getData(url) {
	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				// "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzRUNseXdhVnNxOURBMU1oMElNLTVFTUNsRU5WM1FMTnhuNlh1bDJoOVBnIn0.eyJleHAiOjE2NzIzMzUyODgsImlhdCI6MTY3MjI5OTMxMSwiYXV0aF90aW1lIjoxNjcyMjk5Mjg4LCJqdGkiOiIzNzM4ZjJjZi05MmQ1LTQyYjYtYjhjNC05NjkyYmI0NWY0NGQiLCJpc3MiOiJodHRwczovL2F1dGgucGlydmVsaS5jb20vcmVhbG1zL3hyYWNvb24tZGVtbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiY2I1NjcyOC1mM2YxLTRmZjgtYTQ3ZC1kNGExOGFjMDgxOGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjcy1jYXJ0Iiwic2Vzc2lvbl9zdGF0ZSI6ImIxYjJlZWRiLTU1NjYtNDY5NC1iZjlkLWYzN2E4MjZmMTQzMSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy14cmFjb29uLWRlbW8iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYjFiMmVlZGItNTU2Ni00Njk0LWJmOWQtZjM3YTgyNmYxNDMxIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJ1c2VyX2lkIjoiYmNiNTY3MjgtZjNmMS00ZmY4LWE0N2QtZDRhMThhYzA4MThjIiwibmFtZSI6ImlyYWtsaSBvY2RhbWVydmUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJpcmFrbGkyOEBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiaXJha2xpIiwiZmFtaWx5X25hbWUiOiJvY2RhbWVydmUiLCJlbWFpbCI6ImlyYWtsaTI4QGdtYWlsLmNvbSJ9.C0219ZRSZa-AFWn5pGXUasixkpcezSAJ1ePt72CAUBbZmzLjQ43RAWr8uuw3wyvWuVDrZGZo6CsptdCQsJe7173Y1iOEKLocAqc2DhrWlROkKE6ODHW_sKL3DudeICSXJ_4Zw2Jy1gaG_a0w6Xnu3XOAfhSPE3zY3g48oJm2kXeL7GNo5I8USGNBqIRt7WyGXscCZ1QHTwmjH-FkRzTuj7Bcjw5y9o0hkL9Txa_NHpF-izpvRv1svQjjY8whZckw2dP3pXncp7C6YJA9_NiTUazi8Btjq-pF1NKjg3OJWJ5nmqPC_OFtAGLYZQ0zl3D696scViCqNxBA59SuXy00_g"
			}
		})
		if(res.status !== 500){
			const response = await res.json();
			return response
		}
	}catch(error){
		return {
			notFound: true,
			error: error
		  }
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
			// "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzRUNseXdhVnNxOURBMU1oMElNLTVFTUNsRU5WM1FMTnhuNlh1bDJoOVBnIn0.eyJleHAiOjE2NjkxNDM1NzIsImlhdCI6MTY2OTEwNzU4NSwiYXV0aF90aW1lIjoxNjY5MTA3NTcyLCJqdGkiOiI1MTY3YTk0My1kZmIzLTQ2N2UtODFjZC1hNzA0MDUyZjk4NmQiLCJpc3MiOiJodHRwczovL2F1dGgucGlydmVsaS5nZS9yZWFsbXMveHJhY29vbi1kZW1vIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImY4OWFjM2M2LTk2MTItNDY4YS1hYzk4LWM3ZWVkN2VjYzExZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNzLWNhcnQiLCJzZXNzaW9uX3N0YXRlIjoiZjUxZWUwY2QtZjNhYS00NDM2LWE2NjUtNzA5NGJhZGY2ZWUxIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXhyYWNvb24tZGVtbyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJmNTFlZTBjZC1mM2FhLTQ0MzYtYTY2NS03MDk0YmFkZjZlZTEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInVzZXJfaWQiOiJmODlhYzNjNi05NjEyLTQ2OGEtYWM5OC1jN2VlZDdlY2MxMWUiLCJuYW1lIjoidmF0byBrb2J1bGlhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidmF0b2tvYnVsaWFAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6InZhdG8iLCJmYW1pbHlfbmFtZSI6ImtvYnVsaWEiLCJlbWFpbCI6InZhdG9rb2J1bGlhQGdtYWlsLmNvbSJ9.VH3qTLgHBGQMNdrrDSFxl72lR75f2OuhiibB-I8q6j8g21DDcxGWTrDPQKDUIuFJVRx-mlz8KIN2n5mJa6l03EtIqYVMPVx2kT0ExhvJgxeiTKp2ZTrKhBRQuNN49Up8QVR-02i1p5HHa2-3t2Z-zNuHkzi_bFgdnGBm7sfHjoX6sgW9BEjDKSmEJk0r0pv1rz26NMSTZn-tzJDQNJqXX36EFHpPqLO6sO93bXOn7VS6jL1dKiPbKEbeSffK9Zsoq4_EIuufKcwht5DZST_WFOoJ4XsFWvXYKZkjB2C_6Kl4oUQI66AqRFMXP0nfj_7--ldVpS-QxIbcwLvqzXsk4g"
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

export function getMultipleData(datas, setData, urls) {
	for(let i = 0; i < datas?.length; i++) {
		getData(
			urls[i]
		).then((response)=> {
			if(response){
				setData((e)=> ({...e, [datas[i]]: response}))
			}
		})	
	}
}