import RestfulHandler from '@/module/handler/restfulHandler';
import enviroment from '@/settings/enviroments'

export default class CategoryService {
    constructor(){
        const {MFApi} = enviroment.api
        this.service = new RestfulHandler(MFApi.url, MFApi.timeout);
        this.endpoint = MFApi.endpoint.warehouse.products;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
    
getCategory = ()=>{
    const endpoint = this.endpoint.category;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

addCategory = (data) => {
    const endpoint = this.endpoint.category;
    return this.service.request({
        method: 'POST',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

updateCategory = (id, data) => {
    const endpoint = `${this.endpoint.category}/${id}`;
    return this.service.request({
        method: 'PUT',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

deleteCategory = (id) => {
    const endpoint = `${this.endpoint.category}/${id}`;
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
}
}

