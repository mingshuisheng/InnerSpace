export namespace BrowserUtils {

  export const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  export type LocalFileInfo = {
    file: File
    fullPath: string
  }

  export type DataTransferResult = {
    name: string
    isFile: boolean
    data: LocalFileInfo[]
  }

  export async function flatDataTransferItems(items?: DataTransferItemList): Promise<DataTransferResult[]> {

    const result: DataTransferResult[] = []

    if (!items) {
      return result
    }

    const itemPromises: Promise<void>[] = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.kind === 'file') {
        const resultList: LocalFileInfo[] = []
        let entry = item.webkitGetAsEntry()
        if (!entry) {
          continue
        }
        let dataTransferResult: DataTransferResult = {
          name: entry.name,
          isFile: entry.isFile,
          data: resultList
        }
        result.push(dataTransferResult)
        itemPromises.push(getFileFromEntryRecursively(entry, resultList))
      }
    }

    for (let i = 0; i < itemPromises.length; i++) {
      await itemPromises[i]
    }

    return result
  }

  function getFileFromEntryRecursively(entry: FileSystemEntry, resultList: LocalFileInfo[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (entry.isFile) {
        (entry as FileSystemFileEntry).file(
          file => {
            resultList.push({file, fullPath: entry.fullPath})
            resolve()
          },
          e => {
            reject()
            console.error(e)
          })
      } else {
        const reader = (entry as FileSystemDirectoryEntry).createReader()
        reader.readEntries(
          entries => {
            let subPromise = entries.map(entry => getFileFromEntryRecursively(entry, resultList))
            Promise.all(subPromise).then(() => resolve())
          },
          e => {
            reject()
            console.error(e)
          }
        )
      }
    })
  }

  export function writeToClipboard(text: string): Promise<void> {
    const clipboard = navigator.clipboard;
    if (clipboard) {
      return clipboard.writeText(text)
    }
    return Promise.reject()
  }

  export function readFromClipboard(): Promise<string> {
    const clipboard = navigator.clipboard;
    if (clipboard) {
      return clipboard.readText()
    }
    return Promise.reject()
  }


  type ClipboardChangeListener = () => void
  const clipboardChangeListeners: Set<ClipboardChangeListener> = new Set()
  const clipboardInterval = 1000
  let clipboardIntervalId: NodeJS.Timer | null = null
  let clipboardOldValue: string | null = null

  export function addClipboardChangeListener(listener: ClipboardChangeListener): void {
    const clipboard = navigator.clipboard;
    if (clipboard) {
      clipboardChangeListeners.add(listener)
      if (!clipboardIntervalId) {
        startClipboardInterval()
      }
    }
  }

  export function removeClipboardChangeListener(listener: ClipboardChangeListener): void {
    clipboardChangeListeners.delete(listener)
    if (clipboardChangeListeners.size === 0) {
      stopClipboardInterval()
    }
  }

  function startClipboardInterval() {
    readFromClipboard().then(value => {
      clipboardOldValue = value
      clipboardIntervalId = setInterval(() => {
        readFromClipboard().then(nextValue => {
          if (nextValue === clipboardOldValue) {
            return
          }
          clipboardOldValue = nextValue
          clipboardChangeListeners.forEach(listener => listener())
        })
      }, clipboardInterval)
    })
  }

  function stopClipboardInterval() {
    if (clipboardIntervalId) {
      clearInterval(clipboardIntervalId)
      clipboardIntervalId = null
      clipboardOldValue = null
    }
  }

}
