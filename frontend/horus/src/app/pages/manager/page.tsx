import HeaderHome from '@/app/components/header/home';
import { BallonOptionManager } from '@/app/components/manager/balons/balonManager';
import React from 'react';

export default function AdminPage() {
    return <>
        <HeaderHome />
        <BallonOptionManager />
</>
}