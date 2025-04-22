// content.js

// Utility function to check if a title is coding-related
function isCodingRelated(title) {
    const keywords = ["code", "coding", "programming", "developer", "software", "tech", "javascript", "python", "computer science"];
    title = title.toLowerCase();
    return keywords.some(keyword => title.includes(keyword));
  }
  
  // Function to remove Shorts from the feed
  function removeShorts() {
    const shorts = [...document.querySelectorAll('ytd-rich-section-renderer')];
    shorts.forEach(section => {
      const title = section.innerText.toLowerCase();
      if (title.includes('shorts')) {
        section.remove();
      }
    });
  }
  
  // Function to filter homepage videos to only coding-related
  function filterVideos() {
    const videos = [...document.querySelectorAll('ytd-rich-item-renderer')];
    videos.forEach(video => {
      const titleEl = video.querySelector('#video-title');
      if (titleEl) {
        const title = titleEl.textContent || '';
        if (!isCodingRelated(title)) {
          video.remove(); // Remove non-coding videos
        }
      }
    });
  }
  
  // Function to remove the Shorts sidebar button
  function removeShortsSidebarButton() {
    const sidebarItems = [...document.querySelectorAll('ytd-guide-entry-renderer')];
    sidebarItems.forEach(item => {
      const text = item.innerText.toLowerCase();
      if (text.includes('shorts')) {
        item.style.display = 'none'; // hide the Shorts sidebar link
      }
    });
  }
  
  // Run functions initially and observe for dynamic changes
  function runFocusMode() {
    removeShorts();
    filterVideos();
    removeShortsSidebarButton(); // Hide Shorts button in sidebar
  }
  
  // Observe the homepage for new content being loaded
  const observer = new MutationObserver(() => {
    runFocusMode();
  });
  
  // Start observing the page
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Initial run
  runFocusMode();
  