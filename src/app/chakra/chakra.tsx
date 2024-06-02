'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        brand: {
            100: '#ccabd8',
            200: '#8474a1',
            300: '#6ec6ca',
            400: '#08979d',
        }
    }
})

export function ChakraProviders({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
  }