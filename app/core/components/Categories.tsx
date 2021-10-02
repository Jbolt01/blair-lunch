import { Link, useRouter, useRouterQuery, useQuery } from "@blitzjs/core"
import { CheckCircleIcon, Search2Icon } from "@chakra-ui/icons"
import {
  Box,
  Icon,
  Flex,
  Stat,
  SimpleGrid,
  StatLabel,
  StatNumber,
  Spinner,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react"
import React, { Suspense, useState, useEffect } from "react"
import { IconType } from "react-icons"
import { BiBasketball, BiPen } from "react-icons/bi"
import { BsPeople } from "react-icons/bs"
import { BiPencil } from "react-icons/bi"
import { VscSymbolMisc } from "react-icons/vsc"
import { DebounceInput } from "react-debounce-input"

interface StatsCardProps {
  title: string
  stat: string
  icon: IconType
  color: string
  toggle: boolean
  subtext: string
}

const StatCount = ({ category, toggle }) => {
  // const [count, { refetch }] = useQuery(getListingCount, { where: { category } })
  // useEffect(() => {
  //   refetch()
  // }, [refetch, toggle])
  return (
    <StatNumber fontSize={"2xl"} fontWeight={"medium"} textAlign={"right"}>
      {10}
    </StatNumber>
  )
}

const WrappedStatNumber = (props) => (
  <Suspense fallback={<Spinner />}>
    <StatCount {...props} />
  </Suspense>
)

function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, color, toggle, subtext } = props
  const router = useRouter()
  const query = useRouterQuery()
  const active = query.hasOwnProperty("category") && query.category === stat
  const nextQuery = {
    ...router.query,
    category: stat,
  }
  let { category, ...queryWithoutCategory } = nextQuery
  return (
    <Link
      shallow
      href={{
        query: active ? { ...queryWithoutCategory } : nextQuery,
      }}
    >
      <Stat
        as={"a"}
        px={{ base: 2, md: 4 }}
        py={1}
        shadow={"xl"}
        border={"3px solid"}
        borderColor={color}
        rounded={"lg"}
        cursor={"pointer"}
        color={active ? "white" : color}
        bg={active ? color : "transparent"}
        _hover={{
          bg: color,
          color: "white",
        }}
      >
        <Flex justifyContent={"space-between"}>
          <Box my={"auto"} alignContent={"center"}>
            {active ? <Icon as={CheckCircleIcon} boxSize={10} /> : <Icon as={icon} boxSize={10} />}
          </Box>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated textAlign={"right"}>
              {title}
            </StatLabel>
            <WrappedStatNumber category={stat} toggle={toggle} />
          </Box>
        </Flex>
        {subtext && (
          <Text fontSize={10} as="div">
            {subtext}
          </Text>
        )}
      </Stat>
    </Link>
  )
}

const Categories = (props) => {
  const router = useRouter()
  const params = new URLSearchParams()
  Object.keys(router.query).forEach((key) => {
    params.set(key, router.query[key] as string)
  })
  const [search, setSearch] = useState(params.get("search") || "")
  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }} id="discover">
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Athletics"}
          stat={"athletics"}
          icon={BiBasketball}
          color={"#2ecc71"}
          {...props}
          subtext="Sports and fitness"
        />
        <StatsCard
          title={"Clubs"}
          stat={"clubs"}
          icon={BsPeople}
          color={"#3498db"}
          {...props}
          subtext="Groups sharing a purpose"
        />
        <StatsCard
          title={"Academic Support"}
          stat={"academic"}
          icon={BiPencil}
          color={"#9b59b6"}
          {...props}
          subtext="Get help from your teachers"
        />
        <StatsCard
          title={"Miscellaneous"}
          stat={"misc"}
          icon={VscSymbolMisc}
          color={"#e74c3c"}
          {...props}
          subtext="Other listings"
        />
      </SimpleGrid>
      <Box maxW="3xl" mx={"auto"} my={8} mb={-2}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" boxSize={6} padding={10} />
          </InputLeftElement>
          <DebounceInput
            element={Input}
            minLength={2}
            debounceTimeout={300}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              const params = new URLSearchParams()
              Object.keys(router.query).forEach((key) => {
                params.set(key, params[key])
              })
              if (e.target.value) {
                params.set("search", e.target.value)
              } else {
                params.delete("search")
              }
              router.push(
                `${router.pathname}${params.toString() ? `?${params.toString()}` : ""}`,
                undefined,
                {
                  shallow: true,
                }
              )
            }}
            textAlign={"center"}
            fontSize={{ base: "lg", md: "2xl" }}
            py={6}
            placeholder={"Search the listings."}
            shadow={"xl"}
            borderTop={"none"}
            borderRight={"none"}
            borderLeft={"none"}
            borderWidth={"2px"}
            borderRadius={"none"}
            borderColor={"red.300"}
            borderBottomStyle={"dashed"}
            _focus={{
              outline: "none",
            }}
            _hover={{
              borderColor: "red.500",
            }}
          />
        </InputGroup>
      </Box>
    </Box>
  )
}

export default Categories
