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
        <script async defer data-website-id="2f5684c8-9119-4bd9-b50d-a4b63c7d8aa1" src="https://umami.vijayrs.com/umami.js"></script>
      </Head>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
