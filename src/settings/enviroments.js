const { default: Employee } = require("@/app/example/page");

const environment = process.env.NEXT_PUBLIC_API_URL;


module.exports = {
    api:{
        MFApi:{
            url: environment,
            timeout: 900000,
            endpoint:{
                rrhh:{
                    employees:{
                        employees: '/api/employees'
                    }
                },
                warehouse:{
                    products:{
                        products: '/',
                        productDestails: '/'
                    }
                },
                sales:{
                    sales:{
                        clients: '/'
                    }
                }
            }
        }
    }
}