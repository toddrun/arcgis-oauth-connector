import React from 'react';

const Navbar: React.FC = () => {
  // const { searchQuery, setSearchQuery } = props; // If you have props
  return (
    <nav className="navbar">
      <input type="text" placeholder="Search your data..." />
      <button>Filter</button>
    </nav>
  );
};

export default Navbar;
