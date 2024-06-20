import notify from 'devextreme/ui/notify';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

class Messages {
    static notify = (message, type, reload=false) => {
        if(type === "error"){
            swal({
                title: "¡Error!",
                text: message,
                icon: "error",
                button: "Aceptar",
                dangerMode: true
            })
        }else if(type === "warning"){
            swal({
                title: "¡Cuidado!",
                text: message,
                icon: "warning",
                button: "Aceptar",
                dangerMode: true
            }).then(okay=>{if(okay && reload){window.location.reload()}})
        }else if(type === "success"){
            swal({
                title: "¡Realizado!",
                text: message,
                icon: "success",
                button: "Aceptar",
                dangerMode: false
            }).then(okay=>{if(okay && reload){window.location.reload()}})
        }else{
            notify({ message: message, width: '300px' }, type, 5000);
        }
    }

    static confirm = async(message, confirmButtonText) => {
        
        let respuesta = await Swal.fire({
            title: '¡Atención!',
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5CB85C',
            cancelButtonColor: '#D33',
            confirmButtonText,
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                return true;     
            }else{
                return false
            }
          });   
        return respuesta;  
    }

    static confirmWithHTML = async(message, confirmButtonText) => {
        
        let respuesta = await Swal.fire({
            title: '¡Atención!',
            icon: 'question',
            html: message,
            showCancelButton: true,
            confirmButtonColor: '#5CB85C',
            cancelButtonColor: '#D33',
            confirmButtonText,
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                return true;     
            }else{
                return false
            }
          });   
        return respuesta;  
    }

    static confirmTwoOptions = async(message, confirmButtonText, textDeny) => {
        
        let respuesta = await Swal.fire({
            title: '¡Atención!',
            text: message,
            icon: 'question',
            showDenyButton: true,
            confirmButtonColor: '#5CB85C',
            denyButtonColor: '#D33',
            confirmButtonText,
            cancelButtonText: 'Cancelar',
            denyButtonText: textDeny,
          }).then((result) => {
            if (result.isConfirmed) {
                return true;     
            }else if(result.isDenied){
                return false;
            }
            else{
                return null
            }
          });   
        return respuesta;  
    }
}

export default Messages;
