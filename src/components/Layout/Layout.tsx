import {FC} from 'react';

import MainNavigation from '../UI/MainNavigation/MainNavigation';

const Layout: FC = (props) => {
    return (
        <>
            <MainNavigation/>
            <main>{props.children}</main>
        </>
    );
}

export default Layout;
