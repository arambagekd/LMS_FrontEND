import React from 'react';
import Navigations from '../Component/Navigations';
import Profile from './Component/Profile'; 

function Page() {
    return (
        <div>
            {/* <div>
                <Navigations />
            </div>
            <div>
                <Profile />
                </div> */}
                <div>
       <Navigations selectedItem="User" topic="Profile"  pageroot={PageRoot}>
       <Profile />
        </Navigations>
    </div>
            
        </div>
    );
}

export default Page;
