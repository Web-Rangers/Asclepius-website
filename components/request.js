export async function getData(url) {
	try {
		const res = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzRUNseXdhVnNxOURBMU1oMElNLTVFTUNsRU5WM1FMTnhuNlh1bDJoOVBnIn0.eyJleHAiOjE2NzExMzc1NDUsImlhdCI6MTY3MTEwMTU4OSwiYXV0aF90aW1lIjoxNjcxMTAxNTQ1LCJqdGkiOiI1ODI5Zjg3NC03NTRmLTRmZDMtOGI3YS1iMmFkYjc1MWUxYTgiLCJpc3MiOiJodHRwczovL2F1dGgucGlydmVsaS5jb20vcmVhbG1zL3hyYWNvb24tZGVtbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0MGI2MTY4Yy1lMDBhLTQ5M2EtYjE1NC1lMDgwNDZjMzFhZDUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjcy1jYXJ0Iiwic2Vzc2lvbl9zdGF0ZSI6IjkzZjFhYThlLTdhNWYtNDZkNC05NmU1LTJlZmYyNzBlY2UyZiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy14cmFjb29uLWRlbW8iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiOTNmMWFhOGUtN2E1Zi00NmQ0LTk2ZTUtMmVmZjI3MGVjZTJmIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJ1c2VyX2lkIjoiNDBiNjE2OGMtZTAwYS00OTNhLWIxNTQtZTA4MDQ2YzMxYWQ1IiwibmFtZSI6ImlyYTMzNyBiZTMzNyIsInByZWZlcnJlZF91c2VybmFtZSI6ImlyYTMzN0BnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiaXJhMzM3IiwiZmFtaWx5X25hbWUiOiJiZTMzNyIsImVtYWlsIjoiaXJhMzM3QGdtYWlsLmNvbSJ9.VhkRExbXqWZ-5uNhSl0uuG4ECZUYKoOyOhRbKjWK2vBeD-pu5S05O2VMVhZe3GxffJrc2xT1LE0hfrPvt3HLjivSCn7E_xD2Ic8-ia1_w_Tuu4Hm2TIel4X2kHfDGybucjuRY4xmxuS683wOkL2oBcGjMrS-6g_0HOZaVO4PkVJXXhsf3p0w4ASOS-DuLBRdnmEAhyg8KYskuTk7s4yxAZQd_ieQ1pAPXZ7QB5k9WpalJACF0q1izLip3y_DXAQE8H4g7TZsLt9uvNZdsIWA6unbDtSCVD2niQzp25D6cryJZoLwIOYHDH3MOHxa8QqZyv8WITsJUuN87SkV3wEoTA"
			}
		})
		const response = res.json();

		return response
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