import React from "react";
import Navbar from "./Navbar";
import { Box, useColorModeValue } from "@chakra-ui/react";

const Layout = ({ children }) => {
    return (
        <Box bg={useColorModeValue("gray.800", "white")} minHeight="100vh">
            <Navbar />
            <main>{children}</main>
        </Box>
    );
};

export default Layout;
