import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteListing = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteListing), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const listing = await db.listing.deleteMany({ where: { id } })

  return listing
})
