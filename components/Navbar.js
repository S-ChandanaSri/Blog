import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="mainav">
      <ul>
        <Link href='/'><li>Home</li></Link>
        <Link href='/about'><li>About</li></Link>
        <Link href='/blog'><li>Blog</li></Link>
        <Link href='/contact'><li>Contact</li></Link>
      </ul>
    </nav>
  )
}

export default Navbar
