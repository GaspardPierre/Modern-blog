/**
 * Add IDs to headings in Markdown content
* @param content The Markdown content
 * @returns The content with IDs added to headings
 */
export function addIdsToHeadings(content: string): string {
  return content.replace(
    /^(#{1,6})\s+(.+)$/gm,
    (match, hashes, title) => {
      // Generate an ID from the title
      const id = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Return the heading with an added ID
      return `<h${hashes.length} id="${id}">${title}</h${hashes.length}>`;
    }
  );
}

/**
 * Extract headings from Markdown content
 * @param content  The Markdown content
 * @returns The extracted headings
 */
export function extractHeadings(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ level, title, id });
  }

  return headings;
}