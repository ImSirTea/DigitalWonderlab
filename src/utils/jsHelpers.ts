import {toast} from "react-toastify";

export async function copyToClipboard(content: string) {
  await navigator.clipboard.writeText(content);
  toast("Text copied to clipboard");
}