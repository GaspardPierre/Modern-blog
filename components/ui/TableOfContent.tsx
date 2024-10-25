'use client';


import React, { useEffect, useState } from 'react';
import  { Button }  from '@/components/ui/button';


interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extraire les titres du contenu Markdown
  useEffect(() => {
    const extractHeadings = () => {
      const matches = content.match(/^#{1,6}\s+(.+)$/gm) || [];
      const items = matches.map((heading) => {
        const level = heading.match(/^#+/)?.[0].length || 1;
        const title = heading.replace(/^#+\s+/, '').trim();
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return { id, title, level };
      });
      setHeadings(items);
    };

    extractHeadings();
  }, [content]);

  // Observer l'intersection des titres
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:w-full h-fit ml-8">
      <nav className=" rounded-lg p-4 ">
        <div className="flex items-center gap-2 mb-4 text-gray-900">
        
          <h2 className="font-bold text-center text-gray-900">Table des matières</h2>
        </div>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{
                paddingLeft: `${(heading.level - 1) * 1}rem`,
              }}
            >
              <Button
     variant="toc"
                onClick={() => {
                  const element = document.getElementById(heading.id);
                  if (element) {
                    // Calculer la position avec offset
                    const offset = 100; // Ajuster selon la hauteur de votre header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth',
                    });
                  }
                }}
                className={
                  activeId === heading.id
                    ? 'text-teal-600 font-semibold'
                    : ''
                }
              
              >
                {heading.title}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}