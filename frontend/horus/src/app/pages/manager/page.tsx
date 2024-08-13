<<<<<<< HEAD
import Header from '@/app/components/header/home';
import React from 'react';

export default function AdminPage() {
    return <>
        <Header />
        <h1>Manager Page</h1>
=======
import HeaderHome from '@/app/components/header/home';
import { BalonOptionManager } from '@/app/components/manager/balons/balonManager';
import React from 'react';

export default function ManagerPage() {
    return <>
        <HeaderHome />
        <BalonOptionManager />
>>>>>>> 8d4aa7a (Criação de produto, um tapa no visual também)
    </>
            
    
}