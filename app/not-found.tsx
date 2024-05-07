"use server"

import {redirect} from 'next/navigation';

export default async function ERROR() {
    redirect("/pages/support")
}

