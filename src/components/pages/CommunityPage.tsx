import NewNavbar from '../Navbar/NewNavbar';
import { useState } from 'react';

const CommunityPage = () => {
  return (
    <div>
      <NewNavbar
        onClick={() => {
          console.log('pressed logout from navbar');
        }}
      />
      <h1>Community Page</h1>
    </div>
  );
};
export default CommunityPage;
