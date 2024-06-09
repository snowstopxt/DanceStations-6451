import React, {Component} from 'react';
import List from '../components/list/index';
import MyMap from '../components/map/index';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/header/index';

const MapPage = () => {

    return (
        <div>
            <Header />
            <Grid templateColumns='repeat(2, 1fr)' gap={0}>
                <GridItem bg='white'>
                    <List/>
                </GridItem>
                <GridItem>
                    <MyMap/>
                </GridItem>
            </Grid>
            
        </div>
    );
};

export default MapPage;