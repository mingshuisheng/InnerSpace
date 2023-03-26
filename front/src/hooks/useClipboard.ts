import {useEffect, useState} from "react";
import {BrowserUtils} from "@/utils/BrowserUtils";

export const useClipboard = () => {
  const [clipboardValue, setClipboardValue] = useState<string>("");
  useEffect(() => {
    const listener = () => {
      BrowserUtils.readFromClipboard().then(value => setClipboardValue(value))
    }

    async function execute() {
      try {
        const value = await BrowserUtils.readFromClipboard();
        setClipboardValue(value)
        BrowserUtils.addClipboardChangeListener(listener)
      } catch (e) {
        console.error("unsupported browser", e)
      }
    }

    execute().then()

    return () => {
      BrowserUtils.removeClipboardChangeListener(listener)
    }
  }, [])

  return {clipboardValue, copyToClipboard: BrowserUtils.writeToClipboard};
}
