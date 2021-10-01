import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"

const Hero = () => {
  return (
    <Stack minH={100} direction={{ base: "column", md: "row" }} w="full">
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        paddingBottom={{ base: 0, md: 8 }}
        marginBottom={{ base: "-2rem", md: 0 }}
      >
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            lineHeight={{ base: "2.75rem", md: "3.75rem" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text as={"span"}>What&apos;s happening during Blair Lunch</Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} textAlign={{ base: "center", md: "left" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: ["10%", "20%"],
                position: "absolute",
                bottom: -1,
                left: 0,
                bg: "red.500",
                zIndex: -1,
              }}
            >
              blairlunch.com
            </Text>{" "}
            is a listing of clubs, activities, athletics and other events happening during Blair
            Lunch. Discover something new today during <code>#blairlunch</code>!
          </Text>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Friends at lunch hanging out."}
          objectFit={"cover"}
          src={"hero.svg"}
          boxSize="105%"
        />
      </Flex>
    </Stack>
  )
}

export default Hero
