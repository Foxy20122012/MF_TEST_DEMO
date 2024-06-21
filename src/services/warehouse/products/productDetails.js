import RestfulHandler from '@/module/handler/restfulHandler';
import enviroment from '@/settings/enviroments'

export default class ProductDestailsService {
    constructor(){
        const {MFApi} = enviroment.api
        this.service = new RestfulHandler(MFApi.url, MFApi.timeout);
        this.endpoint = MFApi.endpoint.warehouse.products;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
    
getProductDestails = ()=>{
    const endpoint = this.endpoint.productDestails;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

addProductDestails = (data) => {
    const endpoint = this.endpoint.productDestails;
    return this.service.request({
        method: 'POST',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

updateProductDestails = (id, data) => {
    const endpoint = `${this.endpoint.productDestails}/${id}`;
    return this.service.request({
        method: 'PUT',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

deleteProductDestails = (id) => {
    const endpoint = `${this.endpoint.productDestails}/${id}`;
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
}
}

