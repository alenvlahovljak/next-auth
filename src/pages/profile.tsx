import {GetServerSideProps, NextPageContext} from "next";
import {getSession} from "next-auth/client";

import {UserProfile} from '@/components/UI';

function ProfilePage() {
    return <UserProfile/>;
}

export async function getServerSideProps({req}: NextPageContext) {
    const session = await getSession({req})

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

export default ProfilePage;
