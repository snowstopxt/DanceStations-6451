import Register from "../../components/auth/register";
import React, { ReactElement } from 'react'
import { Box } from "@chakra-ui/react";
import Header from "../../components/header";

export default function Page ({params} : {params: {userType: string}}) {
    return (
      
        <div className="bg-brand-purple flex-grow flex items-center justify-center">
          <Box minHeight="100vh" display="flex" flexDirection="column" bgColor="brand.100">
          <Header />
        <Register userType = {params.userType} />
        </Box>
      </div>
    );
}