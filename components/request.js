export async function getData(url) {
	try {
		const res = await fetch(url)
		const response = res.json();

		return response
	}catch(error){
		console.log(error)
	}
}
