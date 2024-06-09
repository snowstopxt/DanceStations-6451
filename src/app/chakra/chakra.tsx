'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        brand: {
            100: '#ccabd8',
            110: '#b89ac2',
            200: '#8474a1',
            300: '#6ec6ca',
            400: '#08979d',  
        }
    },
    components: {
        Button: {
            variants: {
                'brand-lg': {
                    bg: 'brand.100',
                    color: 'white',
                    _hover: {
                        bg: 'brand.110',
                    },
                },
            }, // Add a closing curly brace here
        },
    },
})

export function ChakraProviders({ children }: { children: React.ReactNode }) {
        return <ChakraProvider theme={theme}>{children}</ChakraProvider>
    }
