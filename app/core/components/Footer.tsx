import { ReactNode, useState, useEffect } from "react"
import { Link as InternalLink } from "blitz"
import {
  Link,
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Icon,
  IconButton,
  useColorModeValue,
  Image,
} from "@chakra-ui/react"
import { FiGithub, FiShare2 } from "react-icons/fi"
import { BsLightningFill } from "react-icons/bs"

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  )
}

const Footer = () => {
  const [alertText, setAlertText] = useState("")
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Stack direction={"row"} spacing={3}>
                <Image
                  src={"/mbhslunch.svg"}
                  height={75}
                  display={"inline-block"}
                  boxShadow="lg"
                  alt="blair lunch logo"
                  fontSize={1}
                />
              </Stack>
            </Box>
            <Stack direction={"row"} spacing={6}>
              <Link
                href="https://github.com/Jbolt01/blair-lunch"
                target="_blank"
                rel="nofollow noopener"
              >
                <IconButton
                  size={"sm"}
                  aria-label={"GitHub repository"}
                  icon={<FiGithub size={18} />}
                />
              </Link>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Sections</ListHeader>
            <InternalLink href={"/#discover"}>Discover</InternalLink>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <InternalLink href={"/?add=listing"} scroll={false}>
              Add a listing
            </InternalLink>
            <Link
              target="_blank"
              href={"https://github.com/Jbolt01/blair-lunch/issues"}
              rel="nofollow noopener"
            >
              Issues
            </Link>
            <Link
              target="_blank"
              href={"https://github.com/Jbolt01/blair-lunch/"}
              rel="nofollow noopener"
            >
              Contribute
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>About</ListHeader>
            <Text as="span" fontSize={"xs"} mt={3}>
              Built with{" "}
              <Link href="https://blitzjs.com/" rel="nofollow noopener" aria-label="Blitz.js">
                <Icon as={BsLightningFill} boxSize={5} color="gold" d={"inline-block"} />
                {" Blitz.js"}
              </Link>
              <br />
              Made by{" "}
              <Link
                href="https://vijayrs.com"
                textDecor="underline"
                target="_blank"
                rel="nofollow noopener"
              >
                Vijay Shanmugam
              </Link>
            </Text>
            <Text fontSize={"xs"} mt={3}>
              © {new Date().getFullYear()} Blair Lunch
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Footer
