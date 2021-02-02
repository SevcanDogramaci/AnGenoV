import axios from 'axios';

export default class Service {

    static async runSurvivor(fileName) {

        const customAxiosInstance = axios.create({
            baseURL: "http://127.0.0.1:5000/",
          });

        const response = await customAxiosInstance.get(`/merge?file=${fileName}`);
        //console.log("Response is ", response.data);
        console.log("run Survivor")
        await new Promise(resolve => setTimeout(resolve, 2500));
        return response.data;
    }

    static async runDelly(files) {

        console.log(files);

        const customAxiosInstance = axios.create({
            baseURL: "http://127.0.0.1:5000/",
          });

        const response = await customAxiosInstance.get(`/sv_calling?ref_file=${files.ref}&sample_file=${files.sample}`);

        console.log(response.data)
        await new Promise(resolve => setTimeout(resolve, 2500));
        return response.data;

    }

    static async uploadFile(file) {

        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }

        // const response = await axios.post("/upload_file", file, config);
        // console.log("Response is ", response);
        // return response.data;
        return "OK";
    }
}
