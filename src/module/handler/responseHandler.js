
import Messages from "@/template/component/messages";

// src/module/handler/responseHandler.js

// src/module/handler/responseHandler.js

class ResponseHandler {
    static error(error) {
        console.error(error); // Asegúrate de que el error completo se registre en la consola

        if (!error.response) {
            alert('Se ha producido un error inesperado. Detalles: ' + error.message);
            return;
        }

        if (error.response.status === 413) {
            alert('El tamaño de los archivos adjuntos excede el máximo permitido de 7MB, quite o reduzca el tamaño de los adjuntos.');
            return;
        }

        if (error.response.status === 400) {
            alert('Error en la solicitud. Por favor revise los datos enviados.');
            return;
        }

        if (error.response.status === 404) {
            alert('Recurso no encontrado.');
            return;
        }

        if (error.response.status === 500) {
            alert('Error interno del servidor. Por favor intente nuevamente más tarde.');
            return;
        }

        alert('Se ha producido un error inesperado.');
    }

    static success(message) {
        alert(message);
    }
}

export default ResponseHandler;

