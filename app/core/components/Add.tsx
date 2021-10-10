import { useRef } from "react"
import { useMutation } from "blitz"
import { useToast } from "@chakra-ui/react"
import { ListingForm, FORM_ERROR } from "app/listings/components/ListingForm"
import createListing from "app/listings/mutations/createListing"
import { CreateOrUpdateListing } from "app/auth/validations"
import uploadImage from "app/core/utils/uploadImage"
import uploadLogo from "app/core/utils/uploadLogo"

const Add = (props) => {
  const { onCloseAndClear, toggle, setToggle } = props
  const toast = useToast()
  const [createListingMutation] = useMutation(createListing)
  const initialRef = useRef<HTMLInputElement>(null)

  return (
    <ListingForm
      submitText="Add"
      schema={CreateOrUpdateListing}
      initialValues={{ namep: "" }}
      onSubmit={async (values) => {
        const { img: imgFileList, logo: logoFileList } = values
        if (imgFileList) {
          const { imageUrl, imgHeight } = await uploadImage(imgFileList[0], 400, toast)
          values["img"] = imageUrl
          values["imgHeight"] = imgHeight
        }
        if (logoFileList) {
          const { imageUrl, imgHeight } = await uploadLogo(logoFileList[0], 100, toast)
          values["logo"] = imageUrl
        }
        try {
          const { namep, ...valuesWithoutHoneypot } = values
          const newListing = await createListingMutation(valuesWithoutHoneypot)
          onCloseAndClear()
          toast({
            title: "Listing created.",
            description: "Thank you for your contribution!",
            status: "success",
            duration: 6000,
            isClosable: true,
          })
          setToggle(!toggle)
          if (newListing && localStorage) {
            try {
              let ownedListings = {}
              if (localStorage.getItem("_listings")) {
                ownedListings = { ...JSON.parse(localStorage.getItem("_listings") || "{}") }
              }
              ownedListings[newListing.id] = new Date(newListing.createdAt).getTime()
              localStorage.setItem("_listings", JSON.stringify(ownedListings))
            } catch (e) {}
          }
        } catch (error) {
          if (error.code === "P2002" && error.meta?.target?.includes("name")) {
            // This error comes from Prisma
            return {
              name: `Name already exists for the category`,
            }
          } else {
            return { [FORM_ERROR]: error.toString() }
          }
        }
      }}
    />
  )
}

export default Add
