import RestfulHandler from '@/module/handler/restfulHandler';
import enviroment from '@/settings/enviroments'

export default class ProductService {
    constructor(){
        const {MFApi} = enviroment.api
        this.service = new RestfulHandler(MFApi.url, MFApi.timeout);
        this.endpoint = MFApi.endpoint.warehouse.products;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
    
getProducts = ()=>{
    const endpoint = this.endpoint.products;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

addProducts = (data) => {
    const endpoint = this.endpoint.products;
    return this.service.request({
        method: 'POST',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

updateProducts = (id, data) => {
    const endpoint = `${this.endpoint.products}/${id}`;
    return this.service.request({
        method: 'PUT',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

deleteProducts = (id) => {
    const endpoint = `${this.endpoint.products}/${id}`;
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
}
}

