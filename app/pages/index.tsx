import { BlitzPage, useRouterQuery } from "blitz"
import { useDisclosure } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import Hero from "app/core/components/Hero"
import React, { useState } from "react"
import Categories from "app/core/components/Categories"
import { useIsomorphicLayoutEffect } from "app/core/hooks/useIsomorphicLayoutEffect"

const Home: BlitzPage = () => {
  const disclosure = useDisclosure()
  const query = useRouterQuery()
  const [toggle, setToggle] = useState(false)
  useIsomorphicLayoutEffect(() => {
    if ((query?.add && query?.add === "listing") || query?.edit) {
      if (!disclosure.isOpen) disclosure.onOpen()
    }
  }, [query])

  return (
    <>
      <div className="container">
        <Hero />
        <Categories toggle={toggle} />
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
