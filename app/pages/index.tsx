import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Hero from "app/core/components/Hero"

const Home: BlitzPage = () => {
  return (
    <>
      <div className="container">
        <Hero />
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
