export default function decorate(block) {
  // Get configuration from data attributes or classes
  const variant = block.dataset.variant || 'default';
  const openInNewTab = block.dataset.openInNewTab === 'true';

  // Add variant classes based on configuration
  if (variant && variant !== 'default') {
    block.classList.add(variant);
  }

  if (openInNewTab) {
    block.classList.add('blank-target');
  }

  // Process all anchor elements in the block
  const links = block.querySelectorAll('a');

  links.forEach((link) => {
    // Set target attributes for new tab opening
    if (openInNewTab) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }

    // Add icon based on variant
    if (variant === 'with-icon') {
      const icon = document.createElement('span');
      icon.className = 'link-icon';
      link.insertBefore(icon, link.firstChild);
      link.classList.add('has-icon');
    } else if (variant === 'with-external-icon') {
      const icon = document.createElement('span');
      icon.className = 'external-icon';
      link.appendChild(icon);
      link.classList.add('has-external-icon');
    }

    // Add common styling class
    link.classList.add('text-link-v2');
  });
}
