import React from 'react';

function BlockTab() {
  return (
    <div>
      <p>Blocked/blacklisted websites, schedule selector, </p>
        <input type="text" id="website-input" name="website-input" />
        <input type="submit" id="addBlockedWebsiteButton" value="Block Website" />
      <div id="websiteList"></div>
    </div>
  );
}

export default BlockTab;

