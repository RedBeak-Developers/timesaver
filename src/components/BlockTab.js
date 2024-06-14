import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWebsite, removeWebsite } from '../actions';

function BlockTab() {
  const [website, setWebsite] = useState('');
  const websites = useSelector((state) => state.websites.websites);
  const dispatch = useDispatch();

  const handleAddWebsite = (e) => {
    e.preventDefault();
    if (website) {
      dispatch(addWebsite(website));
      setWebsite(''); // Clear the input field
    }
  };

  const handleRemoveWebsite = (websiteToRemove) => {
    dispatch(removeWebsite(websiteToRemove));
  };

  return (
    <div>
      <p>Blocked/blacklisted websites, schedule selector</p>
      <form onSubmit={handleAddWebsite}>
        <input
          type="text"
          id="website-input"
          name="website-input"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Add a website"
        />
        <input type="submit" id="addBlockedWebsiteButton" value="Block Website" />
      </form>
      <div id="websiteList">
        <ul>
          {websites.map((website, index) => (
            <li key={index}>
              {website} 
              <button onClick={() => handleRemoveWebsite(website)}>Unblock</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BlockTab;
