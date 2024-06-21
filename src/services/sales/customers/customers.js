import RestfulHandler from '@/module/handler/restfulHandler';
import enviroment from '@/settings/enviroments'

export default class CustomersService {
    constructor(){
        const {MFApi} = enviroment.api
        this.service = new RestfulHandler(MFApi.url, MFApi.timeout);
        this.endpoint = MFApi.endpoint.sales.sales;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
    
getCustomer = ()=>{
    const endpoint = this.endpoint.clients;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

addCustomer = (data) => {
    const endpoint = this.endpoint.clients;
    return this.service.request({
        method: 'POST',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

updateCustomers = (id, data) => {
    const endpoint = `${this.endpoint.clients}/${id}`;
    return this.service.request({
        method: 'PUT',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

deleteCustomer = (id) => {
    const endpoint = `${this.endpoint.clients}/${id}`;
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
}


}

