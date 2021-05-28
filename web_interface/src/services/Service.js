import axios from 'axios';

export default class Service {
	static async getVariants(fileName) {
		const customAxiosInstance = axios.create({
			baseURL: 'http://127.0.0.1:5000/',
		});

		const response = await customAxiosInstance.get(`/get_variants?file=${fileName}`);

		console.log('Variants >>', response.data.variants);
		return response.data.variants;
	}

	static async getVariantsByPage(fileName, pageNo) {
		const customAxiosInstance = axios.create({
			baseURL: 'http://127.0.0.1:5000/',
		});

		const response = await customAxiosInstance.get(`/get_variants_by_page?file=${fileName}&page_no=${pageNo}`);

		console.log('Variants >>', response.data);
		return response.data;
	}

	static async annotateSelectedVariants(fileName, selectedVariantIds) {
		const customAxiosInstance = axios.create({
			baseURL: 'http://127.0.0.1:5000/',
		});

		if (!Array.isArray(selectedVariantIds)) selectedVariantIds = JSON.stringify(selectedVariantIds.toArray());
		else selectedVariantIds = JSON.stringify(selectedVariantIds);

		console.log('Selected Variants >>', selectedVariantIds);

		const response = await customAxiosInstance.get(`/annotate?file=${fileName}&ids=${selectedVariantIds}`);

		console.log('Filtered Variants >>', response.data);

		return response.data;
	}

	static async filterVariants(fileName, filterCondition, pageNo) {
		const customAxiosInstance = axios.create({
			baseURL: 'http://127.0.0.1:5000/',
		});

		const response = await customAxiosInstance.get(
			`/filter?file=${fileName}&filter=${filterCondition}&page_no=${pageNo}`
		);

		console.log('filterVariants response >>', response.data);
		return response.data;
	}


	static async getFilteredVariantsByPage(fileName, filterCondition, pageNo) {
		const customAxiosInstance = axios.create({
			baseURL: 'http://127.0.0.1:5000/',
		});

		const response = await customAxiosInstance.get(
			`/filter?file=${fileName}&filter=${filterCondition}&page_no=${pageNo}`
		);

		console.log('filterVariants response >>', response.data);
		return response.data;
	}

	static async runSurvivor(fileName) {
		const customAxiosInstance = axios.create({
			baseURL: 'http://127.0.0.1:5000/',
		});

		const response = await customAxiosInstance.get(`/merge?file=${fileName}`);

		console.log('Survivor response >>', response.data);
		return response.data;
	}

	static async runSelectedTools(files, selectedTools) {
		console.log(files, selectedTools.toArray());

		const customAxiosInstance = axios.create({
			baseURL: 'http://127.0.0.1:5000/',
		});

		selectedTools = JSON.stringify(selectedTools.toArray());

		const response = await customAxiosInstance.get(
			`/sv_calling/RST?ref_file=${files.ref}&sample_file=${files.sample}&selected_tools=${selectedTools}`
		);

		// const response = await customAxiosInstance.get('/trial');

		console.log('ST response >>', response.data);
		return response.data;
	}

	/* This function is used to view files by uploading when AnGenoV works on web browser. */
	static async uploadFile(file) {
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		const response = await axios.post('/upload_file', file, config);
		console.log('Response is ', response);
		return response.data;
	}
}
