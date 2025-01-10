async function getFavicon(url) {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    const domain = urlObj.hostname;
    
    // Twitter/X.comドメインの判定
    if (domain === 'x.com' || domain === 'twitter.com') {
      return 'twitter-icon';
    }
    
    // それ以外はGoogle Faviconsを使用
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch (error) {
    console.error('Favicon fetch error:', error);
    return 'placeholder.svg';
  }
}