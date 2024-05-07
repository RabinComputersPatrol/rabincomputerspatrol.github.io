"use server"

import {redirect} from 'next/navigation';

export default async function ERROR() {
    redirect("/pages/support")

    return (
        <div>
            <h1 dir="ltr">404 Page</h1>
        </div>
    );
}

