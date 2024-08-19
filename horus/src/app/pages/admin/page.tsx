"use client";
import { CardAdmin } from '@/app/components/admin/cards/cardAdmin';
import HeaderHome from '@/app/components/header/home';

export default function AdminPage() {
    return (
        <>
            <HeaderHome />
            <CardAdmin />
        </>
    );
}
