"use client";
import React, { useEffect, useState} from 'react';
import { Button, Stack, Card, GridItem, Grid, Box, Text, FormControl, } from '@chakra-ui/react'; 
import { useMap } from '@vis.gl/react-google-maps';
import { useStudios } from '../../../contexts/studiosContext';

const List = () => {
    const map = useMap();
    const studios = useStudios();

    const handleClick = () => {
        if (navigator.geolocation && map) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
            });
        }
    };

    if (!Array.isArray(studios)) {
        return;
    }

    return (
        <Box padding='25px'>
            <Text fontSize='md'>{ studios.length > 1 ? `${studios.length} studios in this area` : `${studios.length} studio in this area` }</Text>
            <FormControl margin={3} mb='30px' minW='120px'>
            <Grid templateColumns='repeat(2, 1fr)'>
            <GridItem colStart={1}>
                <Button 
                variant="outline"
                onClick={handleClick}>
                Nearby
                </Button>
            </GridItem>
            <GridItem colEnd={3} pos="absolute" right="3">
                <Button 
                variant="outline">
                Sort By
            </Button>
            </GridItem>
            </Grid>
            </FormControl>
            <Grid spacing={3}>
                {studios?.map((studios, i) => (
                    <GridItem key={i} xs={12} colSpan={1}>
                        <Card>{studios.name}</Card>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};

export default List;