import {useMemo} from "react";
import {useRouter} from "next/router";

export const useNoteId = () => {
  const router = useRouter();
  return useMemo(() => {
    return parseInt(router.query.noteId as string || "0")
  }, [])
}
