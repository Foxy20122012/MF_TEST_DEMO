import Messages from "@/template/component/messages";

class ResponseHandler {
    static error(error) {
        console.error(error); // Asegúrate de que el error completo se registre en la consola

        if (!error.response) {
            Messages.notify('Se ha producido un error inesperado. Detalles: ' + error.message, 'error');
            return;
        }

        if (error.response.status === 413) {
            Messages.notify('El tamaño de los archivos adjuntos excede el máximo permitido de 7MB, quite o reduzca el tamaño de los adjuntos.', 'error');
            return;
        }

        if (error.response.status === 400) {
            Messages.notify('Error en la solicitud. Por favor revise los datos enviados.', 'error');
            return;
        }

        if (error.response.status === 404) {
            Messages.notify('Recurso no encontrado.', 'error');
            return;
        }

        if (error.response.status === 500) {
            Messages.notify('Error interno del servidor. Por favor intente nuevamente más tarde.', 'error');
            return;
        }

        Messages.notify('Se ha producido un error inesperado.', 'error');
    }

    static success(message) {
        Messages.notify(message, 'success');
    }
}

export default ResponseHandler;
