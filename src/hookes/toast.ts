import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message: string) =>
  toast.info(`${message}`, { className: "toast-message" });

export default notify;
