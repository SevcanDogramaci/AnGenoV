import axios from 'axios';

export default class Service {

    static async runDelly(e) {
    
        const response = await axios.get(`/sv_calling`);
        //console.log("Response is ", response.data);
        await new Promise(resolve => setTimeout(resolve, 2500));
        return response.data;
    }
}
