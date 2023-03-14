import {BuildApiParams} from "@/utils/NetworkUtils";

export type NextApiType = {
  revalidatePage: (path: string) => Promise<void>
  revalidatePages: (path: string) => Promise<void>
}

export const nextApi: BuildApiParams<NextApiType> = {
  revalidatePage: fetra => path => fetra.post<void>(new URL("/api/revalidatePage", location.origin), {path}),
  revalidatePages: fetra => path => fetra.post<void>(new URL("/api/revalidatePages", location.origin), {path})
}
