import axios from 'axios';

export const getAllClinics = async () => {
	const res = (
		await axios.get(
			`https://asclepius.pirveli.com/asclepius/v1/api/clinics?page=0&size=10`
		)
	).data;
	return res;
};
