import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'

function InputGrade({value : initialValue, label, updateValue }) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if(value)
      updateValue(value)
  }, [value])

  return (
    <TextField
      type="number"
      size='small'
      // label={label}
      sx={{ maxWidth : 60,
        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
            {
              display: 'none',
            },
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
       }}
      value={value}
      onChange={e => setValue(e.target.value == "" ? e.target.value : Math.min(Math.max(e.target.value, 0), 100)  )}
      // onChange={e => setValue(e.target.value)}
      
    />
  )
}

export default InputGrade