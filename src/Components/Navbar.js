import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar' style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', alignItems: 'center', padding: '5px 25px'}}>
        <div>LOGO</div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{display: 'inline-block', marginRight: '15px'}}>ANASAYFA</h4>
            <h4 style={{display: 'inline-block', marginRight: '15px'}}>ANASAYFA</h4>
            <h4 style={{display: 'inline-block', marginRight: '15px'}}>ANASAYFA</h4>
            <h4>ANASAYFA</h4>
        </div>
    </div>
  )
}

export default Navbar