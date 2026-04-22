import fs from 'fs';

function fixAccents(filePath) {
  let text = fs.readFileSync(filePath, 'utf-8');
  text = text.replace(/text-\[accent\]/g, 'text-accent');
  text = text.replace(/bg-\[accent\]/g, 'bg-accent');
  text = text.replace(/border-\[accent\]/g, 'border-accent');
  text = text.replace(/ring-\[accent\]/g, 'ring-accent');
  text = text.replace(/hover:bg-\[accent\]/g, 'hover:bg-accent');
  text = text.replace(/hover:text-\[accent\]/g, 'hover:text-accent');
  text = text.replace(/mb-6 mb-6/g, 'mb-6');
  
  // Specific hero nav additions
  if (filePath.includes('Landing.tsx')) {
    const navText = `
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-8 z-20 w-full max-w-7xl mx-auto absolute top-0 left-0 right-0">
        <div className="text-xl font-semibold tracking-tighter uppercase font-sans">Liana Getman</div>
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest font-semibold opacity-50">
          <span className="cursor-pointer hover:opacity-100 transition-opacity">About</span>
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Courses</span>
          <span className="font-bold opacity-100 text-accent">2026 Collection</span>
        </div>
      </nav>
    `;
    text = text.replace('{/* Hero Section */}', navText + '\n      {/* Hero Section */}');
    text = text.replace('min-h-[90vh]', 'min-h-[100vh] pt-24');
    
    // Abstract lines pattern
    text = text.replace(/<div className="absolute top-10 right-10.*?>.*?<\/div>/g, '<div className="absolute -right-20 -bottom-20 w-96 h-96 border-[0.5px] border-accent opacity-20 rounded-full -z-10 pointer-events-none"></div>');
    text = text.replace(/<div className="absolute bottom-10 left-10.*?>.*?<\/div>/g, '<div className="absolute -right-10 -bottom-10 w-80 h-80 border-[0.5px] border-accent opacity-10 rounded-full -z-10 pointer-events-none"></div>');
  }

  // Rewrite file
  fs.writeFileSync(filePath, text);
  console.log(`Updated ${filePath}`);
}

fixAccents('src/components/Landing.tsx');
fixAccents('src/components/Admin.tsx');
