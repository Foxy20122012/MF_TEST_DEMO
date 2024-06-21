import RestfulHandler from '@/module/handler/restfulHandler';
import enviroment from '@/settings/enviroments'

export default class InventoryService {
    constructor(){
        const {MFApi} = enviroment.api
        this.service = new RestfulHandler(MFApi.url, MFApi.timeout);
        this.endpoint = MFApi.endpoint.warehouse.inventory;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
    
getInventory = ()=>{
    const endpoint = this.endpoint.inventory;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

addInventory = (data) => {
    const endpoint = this.endpoint.inventory;
    return this.service.request({
        method: 'POST',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

updateInventory = (id, data) => {
    const endpoint = `${this.endpoint.inventory}/${id}`;
    return this.service.request({
        method: 'PUT',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

deleteInventory = (id) => {
    const endpoint = `${this.endpoint.inventory}/${id}`;
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
}
}

