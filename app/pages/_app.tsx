import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  CSRFTokenMismatchError,
} from "blitz"
import { AnimatePresence, motion } from "framer-motion"
import "@fontsource/inter/400.css"
import "@fontsource/inter/700.css"
import "@fontsource/libre-franklin/700.css"
import LoginForm from "app/auth/components/LoginForm"
import Error from "app/core/components/Error"
import ErrorRedirectHome from "app/core/components/ErrorRedirectHome"
import { Box, BoxProps, ChakraProvider, extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: "Libre Franklin",
    body: "Inter",
  },
  scrollBehavior: "smooth",
})
const MotionBox = motion.custom<BoxProps>(Box)

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ChakraProvider>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <Error statusCode={error.statusCode} title="Sorry, you are not authorized to access this" />
    )
  } else if (error instanceof CSRFTokenMismatchError) {
    return (
      <ErrorRedirectHome statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  } else {
    return <Error statusCode={error.statusCode || 400} title={error.message || error.name} />
  }
}
