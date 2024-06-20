'use client'
import React, { useEffect, useState } from 'react';
import EmployeeService from "@/services/rrhh/employees/employeeService";


const EmployeeComponent =()=>{


       
       const [employee, setEmployee] = useState([]);
       const [error, setError] = useState(null);
   
       
       const employeeService =  new EmployeeService();
   
       
       useEffect(() => {
        const employeeService = new EmployeeService();  // Instanciamos el servicio
        console.log(employeeService)
        employeeService.getEmployee()
            .then(response => {
                // Suponiendo que la respuesta tiene la forma esperada
                setEmployee(response.data);  // Actualizamos el estado con los datos recibidos
            })
            .catch(err => {
                setError(err.message);  // Manejo de errores en caso de falla de la petición
            });
    }, []);  // El efecto se ejecuta solo una vez al montar el componente 
   
    return(
        <div>
            Hello Admin
        </div>
    )
}

export default EmployeeComponent;