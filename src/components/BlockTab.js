import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWebsite, removeWebsite } from '../slices/websiteSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../utils/icons';

// Define a dictionary for common websites and their Font Awesome icons
const websiteIcons = {
  'google': ['fab', 'google'],
  'facebook': ['fab', 'facebook'],
  'twitter': ['fab', 'twitter'],
  'youtube': ['fab', 'youtube'],
  'instagram': ['fab', 'instagram'],
  'linkedin': ['fab', 'linkedin'],
  'pinterest': ['fab', 'pinterest'],
  'snapchat': ['fab', 'snapchat'],
  'reddit': ['fab', 'reddit'],
  'tumblr': ['fab', 'tumblr'],
  'github': ['fab', 'github'],
  'gitlab': ['fab', 'gitlab'],
  'stackoverflow': ['fab', 'stackoverflow'],
  'dribbble': ['fab', 'dribbble'],
  'behance': ['fab', 'behance'],
  'flickr': ['fab', 'flickr'],
  'vimeo': ['fab', 'vimeo'],
  'whatsapp': ['fab', 'whatsapp'],
  'tiktok': ['fab', 'tiktok'],
  'spotify': ['fab', 'spotify'],
  'apple': ['fab', 'apple'],
  'amazon': ['fab', 'amazon'],
  'microsoft': ['fab', 'microsoft'],
  'slack': ['fab', 'slack'],
  'dropbox': ['fab', 'dropbox'],
  'paypal': ['fab', 'paypal'],
  'skype': ['fab', 'skype'],
  'yahoo': ['fab', 'yahoo'],
  'wordpress': ['fab', 'wordpress'],
  'blogger': ['fab', 'blogger'],
  'medium': ['fab', 'medium'],
  'weibo': ['fab', 'weibo'],
  'twitch': ['fab', 'twitch'],
  'discord': ['fab', 'discord'],
  'patreon': ['fab', 'patreon'],
  'pornhub': ['fas', 'user-secret'],
  'xvideos': ['fas', 'user-secret'],
  'xhamster': ['fas', 'user-secret'],
  'xnxx': ['fas', 'user-secret'],
  'eporner': ['fas', 'user-secret'],
  'hqporner': ['fas', 'user-secret'],
  'beeg': ['fas', 'user-secret'],
  'yourporn': ['fas', 'user-secret'],
  'spankbang': ['fas', 'user-secret'],
  'porntrex': ['fas', 'user-secret'],
  'xmoviesforyou': ['fas', 'user-secret'],
  'porngo': ['fas', 'user-secret'],
  'youjizz': ['fas', 'user-secret'],
  'motherless': ['fas', 'user-secret'],
  'redtube': ['fas', 'user-secret'],
  'youporn': ['fas', 'user-secret'],
  'pornone': ['fas', 'user-secret'],
  '4tube': ['fas', 'user-secret'],
  'porntube': ['fas', 'user-secret'],
  '3movs': ['fas', 'user-secret'],
  'fapello': ['fas', 'user-secret'],
  'jerkmate': ['fas', 'user-secret'],
  'chaturbate': ['fas', 'user-secret'],
  'livejasmin': ['fas', 'user-secret'],
  'stripchat': ['fas', 'user-secret'],
  'camsoda': ['fas', 'user-secret'],
  'cams': ['fas', 'user-secret'],
  'brazzers': ['fas', 'user-secret'],
  'bangbros': ['fas', 'user-secret'],
  'realitykings': ['fas', 'user-secret'],
  'puretaboo': ['fas', 'user-secret'],
  'naughtyamerica': ['fas', 'user-secret'],
};

function BlockTab() {
  const [website, setWebsite] = useState('');
  const websites = useSelector((state) => state.websites.websites);
  const dispatch = useDispatch();

  const handleAddWebsite = (e) => {
    e.preventDefault();
    if (website) {
      const domain = website.replace('.com', '');
      const icon = websiteIcons[domain] || ['fas', 'globe'];
      dispatch(addWebsite({ url: website, icon }));
      setWebsite('');
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
              <FontAwesomeIcon icon={website.icon} style={{ marginRight: '10px' }} />
              {website.url}
              <button onClick={() => handleRemoveWebsite(website)}>Unblock</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BlockTab;
