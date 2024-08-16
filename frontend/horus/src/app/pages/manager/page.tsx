'use client'

import HeaderHome from '@/app/components/header/home';
import { CardManager } from '@/app/components/manager/cards/cardManager';
import React from 'react';

export default function ManagerPage() {
    return <>
        <HeaderHome />
        <CardManager />
</>
}