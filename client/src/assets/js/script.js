import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class notification {
  notifySuccess(Successmessege) {
    toast(`${Successmessege}`);
  }
  notifyError(Errormessege) {
    toast(`${Errormessege}`);
  }
}
