'use client'
import React, { useState } from 'react';
import Header from '../components/header/index';
import {
    Button
} 
from '@chakra-ui/react';



export default function Page () {
    return (
        <div className="w-full h-screen flex flex-col bg-brand-purple">
            <Header />
            <Button href='/rent'>Add a studio</Button>
            <Button href='/chat'>My Chats</Button>
        </div>
    );
}