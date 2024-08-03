import Login from "../../components/auth/login"
import React, { ReactElement } from 'react'
import { Box } from "@chakra-ui/react";
import Header from "../../components/header";


export default function Page ({params} : {params: {userType: string}}) {
    return (
        <div className="bg-brand-purple flex-grow flex items-center justify-center">
          <Box minHeight="100vh" display="flex" flexDirection="column" bgColor="brand.100">
          
          <Header />
        <Login userType = {params.userType} />
        </Box>
      </div>
    );
}
