import {useState} from "react";
import {useMount} from "ahooks";

export const useClipboard = () => {
  const [clipboardValue, setClipboardValue] = useState<string>("");

  useMount(() => {
    const clipboard = navigator.clipboard;
    if (clipboard) {
      clipboard.readText().then((text) => {
        setClipboardValue(text);
      });
    }
  })

  const copyToClipboard = (text: string) => {
    const clipboard = navigator.clipboard;
    if (clipboard) {
      clipboard.writeText(text).then(() => {
        setClipboardValue(text);
      });
    }
  }

  return { clipboardValue, copyToClipboard};
}
