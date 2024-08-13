"use client"
import { BalonOptionAdmin } from '@/app/components/admin/balons/balonAdmin';
import HeaderHome from '@/app/components/header/home';
import React from 'react';

export default function AdminPage() {
    return <>
        <HeaderHome />
        <BalonOptionAdmin />
    </>    
}