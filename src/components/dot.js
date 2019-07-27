import React from 'react';


export default function Dot(props){
  const borderRadius = props.size / 2
  return (
    <div style={{
      'height': `${props.size}px`,
      'width': `${props.size}px`,
      'borderRadius': `${borderRadius}px`,
      'backgroundColor': props.color
    }}></div>
  )
}