import NextHead from "next/head";
import {FC, ReactNode} from "react";

interface HeadProps {
  children: ReactNode
  pageTitle: string
}

export const Head: FC<HeadProps> = ({pageTitle, children}) => {
  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content="personal website named inner space"/>
        <link rel="icon" href="/favicon.ico"/>
      </NextHead>
      {children}
    </>
  )
}
