'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {menuTheme} from "../components/list/menu"
  

const theme = extendTheme({
    colors: {
        brand: {
            100: '#ccabd8', //brand purple
            110: '#b89ac2', //purple hover
            200: '#8474a1', // very dark purple
            300: '#6ec6ca', //teal 
            310: '#63b2b5', // teal hover
            400: '#08979d', // even darker teal
            500: '#E4BABC', //pink
            600: '#C4C4C4', // grey
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
