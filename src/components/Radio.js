import React from 'react'

const Radio = ({ cluster, id, value, disabled, checked, onChange }) => {
    return (
      <>
        <input 
          type="radio" 
          id={id} 
          name={cluster} 
          value={value}
          disabled={disabled}
          checked={checked || false}
          onChange={onChange}
        />
        <label htmlFor={value}>
            {value}
        </label>
      </>
    )
  }

  export default Radio