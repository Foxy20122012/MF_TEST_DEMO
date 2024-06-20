import RestfulHandler from '@/module/restfulHandler';
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
}

export default EmployeeService