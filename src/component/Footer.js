import React from 'react'
import { Button, Input } from 'reactstrap'

export default function Footer(props) {
  const { setFlag, checkAll } = props
  return (
    <div className='footer my-3'>
      <Button className="btn-info mx-1" onClick={() => setFlag("CHECKALL")}>
        {checkAll ? "Uncheck All" : "Check All"}
      </Button>
      <Button className="btn-success mx-1" onClick={() => setFlag("CHECK")}>Filter check</Button>
      <Button className='btn-success mx-1' onClick={() => setFlag("NOCHECK")}>Filter no check</Button>
      <Button className='btn-warning mx-1' onClick={() => setFlag("")}>Clear filter</Button>
      <Button className='btn-danger mx-1' onClick={() => setFlag("DELETEALL")}>Delete All</Button>
    </div>
  )
}
