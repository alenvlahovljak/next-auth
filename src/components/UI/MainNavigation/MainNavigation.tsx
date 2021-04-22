import {FC} from "react"
import {useSession, signOut} from "next-auth/client"

import Link from 'next/link';

import classes from './MainNavigation.module.css';

const MainNavigation: FC = () => {
    const [session, loading] = useSession()

    console.log(loading)
    console.log(session)

    async function logoutHandler() {
        await signOut()
    }

    return (
        <header className={classes.header}>
            <Link href='/'>
                <a>
                    <div className={classes.logo}>Next Auth</div>
                </a>
            </Link>
            <nav>
                <ul>
                    {!session && !loading && <li>
                        <Link href='/auth'>Login</Link>
                    </li>}
                    {session && <li>
                        <Link href='/profile'>Profile</Link>
                    </li>}

                    {session && <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
