import React from 'react';

const filter = ({updateQuery, kwery}) => {
    return (
    
<div className='searchfield'>
      
      <input
        type='text'
        placeholder='Type for search...'
        value={kwery}
        onChange={(event) => updateQuery(event.target.value)}
        
      />
    </div>



    )
};

export default filter;