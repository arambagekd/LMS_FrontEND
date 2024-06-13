import React from 'react'

import SearchResult from './Component/SearchResult';



function page({params}) {

    return (
        <div>
            
              <SearchResult username={params.username}/> 
             
        </div>
    )
}

export default page
