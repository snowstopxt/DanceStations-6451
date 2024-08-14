"use client";
import React, { useEffect, useState} from 'react';
import { Button, 
    Center,
    VStack,
    Stack, 
    Menu, 
    MenuButton,
    MenuList,
    MenuDivider,
    GridItem, 
    Grid, 
    Box, 
    Text, 
    FormControl,
    FormLabel,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spinner
} from '@chakra-ui/react'; 
import { BsChevronDown } from "react-icons/bs";
import { useMap } from '@vis.gl/react-google-maps';
import { useStudios } from '../../../contexts/studiosContext';
import StudioCard from '../card/index'
import { auth } from '../../firebase/clientApp';

const List = (x) => {
    const map = useMap();
    const studios = useStudios();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(100);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(auth.currentUser || null );

    useEffect(() => {
        if (studios) {
          setLoading(false); 
        }
      }, [studios]);

    const format = (val) => `$` + val;
    const parse = (val) => val.replace(/^\$/, '');

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

    if (!user) {
        return (
          <Box padding='25px' overflow='auto'>
            <Text fontSize='md'>Please log in to view studios.</Text>
          </Box>
        );
    }

    return (
        <Box padding='25px' overflow='hidden'>
            <Text fontSize='md'>{ studios.length > 1 ? `${studios.length} studios in this area` : `${studios.length} studio in this area` }</Text>
            <FormControl margin={3} mb='30px' minW='120px'>
            <Grid templateColumns='repeat(2, 1fr)'>
            <GridItem spacing={3} >
                <Stack direction="row" spacing={3}>
                <Button
                variant="outline"
                onClick={handleClick}>
                Nearby
                </Button>
                
                <Menu>
                    <MenuButton variant='outline' as={Button} rightIcon={<BsChevronDown />}>
                        Price
                    </MenuButton>
                    <MenuList padding={8} >
                    <Stack direction='column' spacing={5} >
                    <Stack width='300px'direction="row" justifyContent="space-between" >
                    <VStack>
                    <FormLabel> Min Price</FormLabel>
                    <NumberInput
                    onChange={(valueString) => setMin(parse(valueString))}
                    value={format(min)}
                    min={0}
                    max={100}
                    maxW='100px'>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                    </VStack>
                    <VStack>
                    <FormLabel>Max Price</FormLabel>
                    <NumberInput
                    onChange={(valueString) => setMax(parse(valueString))}
                    value={format(max)}
                    min={0}
                    max={100}
                    maxW='100px'
                    >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                    </NumberInput>
                    </VStack>
                    </Stack>
                    <>
                    <RangeSlider
                        value={[min, max]}
                        onChange={(values) => {
                            setMin(values[0]);
                            setMax(values[1]);
                        }}
                    >
                        <RangeSliderTrack>
                            <RangeSliderFilledTrack bgColor='brand.100'/>
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                    </RangeSlider>
                    </>
                    <MenuDivider />
                    <Center width="300px">
                    <Button variant='brand-blue' minW='200px' onClick={()=> { x.setMinPrice(min); x.setMaxPrice(max)}}>Apply</Button>
                    </Center>
                    </Stack>
                    </MenuList>
                </Menu>
                </Stack>
            </GridItem>
            <GridItem colEnd={3} pos="absolute" right="3">
                <Button 
                variant="outline">
                Sort By
            </Button>
            </GridItem>
            </Grid>
            </FormControl>
            {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box maxH="400px" overflowY="auto">
        <Grid templateColumns='repeat(auto-fill, minmax(350px, 1fr))' spacing={3}>
          {studios.length > 0 ? (
            studios.map((studio, i) => (
              <GridItem key={i} xs={12} colSpan={1}>
                <StudioCard studio={studio}></StudioCard>
              </GridItem>
            ))
          ) : (
            !loading && <Text>Try searching with a different parameter</Text>
          )}
        </Grid>
        </Box>
      )}
        </Box>
    );
};

export default List;