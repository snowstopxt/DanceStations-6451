'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {menuTheme} from "../components/list/menu"
  

const theme = extendTheme({
    colors: {
        brand: {
            100: '#ccabd8',
            110: '#b89ac2',
            200: '#8474a1',
            300: '#6ec6ca',
            310: '#63b2b5',
            400: '#08979d', 
            500: '#E4BABC',
            600: '#C4C4C4'
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
                'brand-blue': {
                    bg: 'brand.300',
                    color: 'white',
                    _hover: {
                        bg: 'brand.310',
                    },
                },
            }, 
        },
        Menu: menuTheme,
        
    },
})

export function ChakraProviders({ children }: { children: React.ReactNode }) {
        return <ChakraProvider theme={theme}>{children}</ChakraProvider>
    }
