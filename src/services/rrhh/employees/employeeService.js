import RestfulHandler from '@/module/handler/restfulHandler';
import enviroment from '@/settings/enviroments'

class EmployeeService {
    constructor(){
        const {MFApi} = enviroment.api
        this.service = new RestfulHandler(MFApi.url, MFApi.timeout);
        this.endpoint = MFApi.endpoint.rrhh.employees;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
    
getEmployee = ()=>{
    const endpoint = this.endpoint.employees;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

addEmployee = (data) => {
    const endpoint = this.endpoint.employees;
    return this.service.request({
        method: 'POST',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

updateEmployee = (id, data) => {
    const endpoint = `${this.endpoint.employees}/${id}`;
    return this.service.request({
        method: 'PUT',
        endpoint,
        headers: this.defaultHeaders,
        data: data
    });
}

deleteEmployee = (id) => {
    const endpoint = `${this.endpoint.employees}/${id}`;
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
}


}

export default EmployeeService