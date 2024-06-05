import React from 'react'

import SearchResult from './Component/SearchResult';



function page({params}) {

    return (
        <div>
            
              <SearchResult isbn={params.isbn}/> 
             
        </div>
    )
}

export default page
