import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Message(message, type){
    switch (type) {
        case 'error':
            toast.error(message);
            break;
        
        case 'sucesses':
            toast.info(message);
            break;

        case 'warn':
            toast.warn(message);
            break;

        default:
            toast(message);
            break;
    }
}

export default Message