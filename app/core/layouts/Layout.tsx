import { ReactNode } from "react"
import { Head } from "blitz"
import Navbar from "app/core/components/Navbar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Blair Lunch Activities"}</title>
        <link rel="icon" href="mbhslunch.svg" sizes="any" type="image/svg+xml" />
      </Head>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
