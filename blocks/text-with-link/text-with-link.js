export default function decorate(block) {
  // Get the component model data from the block
  const rows = Array.from(block.children);
  let variant = 'default';
  let openInNewTab = false;
  
  // Parse the block data - EDS stores model data in the block rows
  rows.forEach(row => {
    const cells = Array.from(row.children);
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();
      
      if (key === 'variant') {
        variant = value;
        row.remove(); // Remove the config row
      } else if (key === 'openinnewtab') {
        openInNewTab = value === 'true';
        row.remove(); // Remove the config row
      }
    }
  });
  
  // Add variant classes
  if (variant && variant !== 'default') {
    block.classList.add(variant);
  }
  
  if (openInNewTab) {
    block.classList.add('blank-target');
  }
  
  // Get all anchor elements in the block
  const links = block.querySelectorAll('a');
  
  links.forEach(link => {
    // Add target="_blank" if configured
    if (openInNewTab) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    
    // Add icon if variant is with-icon
    if (variant === 'with-icon') {
      const icon = document.createElement('span');
      icon.className = 'link-icon';
      // Add icon before the text
      link.insertBefore(icon, link.firstChild);
      
      // Add class for styling
      link.classList.add('with-icon');
    }
    
    // Add general styling class
    link.classList.add('text-link');
  });
}