export default function decorate(block) {
  // Get component configuration from the block's data attributes or model
  const variant = block.dataset.variant || 'default';
  const openInNewTab = block.dataset.openInNewTab === 'true';
  
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