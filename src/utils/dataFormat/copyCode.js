import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
export function copyCode(code) {
  copy(code);
  toast.success("Copied");
}
