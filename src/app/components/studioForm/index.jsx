'use client'
import React, { useState, useEffect } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { Image } from '@chakra-ui/next-js';
import { Box, Button, Text, FormControl, FormLabel, Input, Textarea, Stack } from '@chakra-ui/react';
import { createStudio } from '../../firebase/clientApp';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import * as geofire from 'geofire-common';
import './styles.css';

const StudioForm = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No image selected');
  const [name, setName] = useState('');
  const [mrt, setMrt] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [geocoder, setGeocoder] = useState(null);
  const geoLib = useMapsLibrary('geocoding');

  useEffect(() => {
    if (geoLib) {
      const newGeocoder = new geoLib.Geocoder();
      setGeocoder(newGeocoder);
      console.log('Geocoder initialized:', newGeocoder);
    }
  }, [geoLib]);

  const myGeocode = (address) => {
    if (!geocoder) {
      console.error('Geocoder is not initialized');
      return;
    } 
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          console.log('Geocoding result:', results);
          resolve(results[0].geometry.location); // Adjust this based on your needs
        } else {
          console.error('Geocode was not successful for the following reason:', status);
          reject(status);
        }
      });
    });
  };

  const handleSubmit = async () => {
    try {
      const geocode = await myGeocode(location).then((result) => result);
      const lat = geocode.lat();
      const lng = geocode.lng();
  
      const geohash = geofire.geohashForLocation([lat, lng]);
      
      console.log('what is this image', image);
      await createStudio({ name, mrt, geohash, geocode: { lat, lng }, size, price, description, image });
      console.log('Studio created successfully!');
      alert('Studio created successfully!');
    } catch (error) {
      console.error('Error geocoding address: ', error);
    }
  };

  const handleNumericInput = (event, setter) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const Uploader = () => (
    <div>
      <div onClick={() => document.querySelector('input[type="file"]').click()} className="image-form">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={({ target: { files } }) => {
            if (files[0]) {
              setFileName(files[0].name);
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
        {image ? (
          <Image src={image} width={150} height={100} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={20} marginx={10} />
            <p>Browse Files to Upload</p>
          </>
        )}
      </div>

      <section className="uploaded-row">
        <AiFillFileImage color="#1475cf" size={20} onClick={() => setImage(null)} />
        <span>{fileName}</span>
        <MdDelete
          onClick={() => {
            setFileName('No image selected');
            setImage(null);
          }}
        />
      </section>
    </div>
  );

  return (
    <Box bgColor="white" borderRadius="8px" padding={30} marginX={40} marginY={20}>
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">List your studio</Text>
      <form>
        <Stack spacing={4}>
          <FormControl id="studioImage">
            <FormLabel>Upload a photo of your studio</FormLabel>
            <Uploader />
          </FormControl>
          <FormControl id="studioName">
            <FormLabel>Studio Name</FormLabel>
            <Input type="text" placeholder="Enter studio name" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="location">
            <FormLabel>Location</FormLabel>
            <Input type="text" placeholder="Enter studio location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <FormControl id="mrt">
            <FormLabel>Nearest Mrt</FormLabel>
            <Input type="text" placeholder="Enter mrt station" value={mrt} onChange={(e) => setMrt(e.target.value)} />
          </FormControl>
          <FormControl id="size">
            <FormLabel>Studio size (square meters)</FormLabel>
            <Input type="text" placeholder="Enter studio size" value={size} onChange={(e) => handleNumericInput(e, setSize)} />
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price per Hour</FormLabel>
            <Input type="number" placeholder="Enter price per hour" value={price} onChange={(e) => handleNumericInput(e, setPrice)} />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Enter studio description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>

          <Button colorScheme="brand" size="md" variant="brand-blue" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default StudioForm;
