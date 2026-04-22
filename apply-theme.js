import fs from 'fs';

function applyTheme(filePath) {
  let text = fs.readFileSync(filePath, 'utf-8');

  // Colors and variables
  text = text.replace(/#D72638/g, 'accent'); // Will replace with class text-accent or bg-accent
  text = text.replace(/text-\[#D72638\]/g, 'text-accent');
  text = text.replace(/bg-\[#D72638\]/g, 'bg-accent');
  text = text.replace(/border-\[#D72638\]/g, 'border-accent');
  text = text.replace(/ring-\[#D72638\]/g, 'ring-accent');
  text = text.replace(/hover:bg-\[#D72638\]/g, 'hover:bg-accent');
  text = text.replace(/hover:text-\[#D72638\]/g, 'hover:text-accent');
  
  text = text.replace(/text-gray-900/g, 'text-[#1a1a1a]');
  text = text.replace(/bg-gray-900/g, 'bg-[#1a1a1a]');
  text = text.replace(/hover:text-gray-900/g, 'hover:text-[#1a1a1a]');

  text = text.replace(/bg-rose-50\/50/g, 'bg-soft-gray');
  text = text.replace(/bg-rose-50/g, 'bg-soft-gray');
  text = text.replace(/bg-red-50/g, 'bg-soft-gray');
  text = text.replace(/bg-\[#fbf9f8\]/g, 'bg-white');

  // Borders & Shadows (Remove them / make them sharp)
  text = text.replace(/rounded-(3xl|2xl|full|lg|xl|md|sm)/g, 'rounded-none');
  text = text.replace(/rounded-tl-\[80px\]/g, 'rounded-none');
  text = text.replace(/rounded-br-\[80px\]/g, 'rounded-none');
  text = text.replace(/shadow-(2xl|xl|lg|md|sm)/g, 'shadow-none');
  
  // Specific heroic replacements for Landing.tsx
  if (filePath.includes('Landing.tsx')) {
    // Nav / Header
    text = text.replace(/uppercase tracking-\[0\.2em\] text-xs font-semibold text-gray-400/g, 'text-[10px] uppercase tracking-[0.5em] font-bold opacity-40 text-[#1a1a1a]');
    text = text.replace(/font-display text-5xl md:text-7xl/g, 'text-6xl md:text-[110px] font-display font-bold italic border-b mb-6');
    text = text.replace(/font-display text-3xl md:text-5xl text-accent mb-10 italic/g, 'text-5xl md:text-[110px] leading-[0.9] font-display italic text-accent mb-12');
    
    // Abstract shapes (remove them or make them geometric)
    text = text.replace(/<div className="absolute top-0 right-0 w-\[600px\].*?><\/div>/g, '<div className="absolute top-10 right-10 w-96 h-96 border-[0.5px] border-accent opacity-20 rounded-full -z-10"></div>');
    text = text.replace(/<div className="absolute bottom-0 left-0 w-\[400px\].*?><\/div>/g, '<div className="absolute bottom-10 left-10 w-80 h-80 border-[0.5px] border-accent opacity-10 rounded-full -z-10"></div>');
    
    // Buttons
    text = text.replace(/bg-\[#1a1a1a\] text-white px-8 py-4 rounded-none text-sm font-medium tracking-wide uppercase hover:bg-accent/g, 'bg-accent text-white px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-black');
    text = text.replace(/w-full bg-\[#1a1a1a\] text-white py-3\.5 rounded-none text-sm font-medium hover:bg-accent/g, 'w-full bg-[#1a1a1a] text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-accent');
    text = text.replace(/w-full bg-gray-50 text-gray-600 py-3\.5 rounded-none text-sm font-medium hover:bg-gray-100/g, 'w-full border border-gray-200 text-gray-500 py-4 text-xs font-bold tracking-widest uppercase hover:border-[#1a1a1a] hover:text-[#1a1a1a]');

    // Section Titles
    text = text.replace(/font-display text-4xl mb-8/g, 'text-[40px] font-display italic text-accent font-bold mb-8');
    text = text.replace(/font-display text-4xl md:text-5xl/g, 'text-[40px] md:text-[60px] font-display italic text-accent font-bold');
    text = text.replace(/font-display text-4xl text-\[#1a1a1a\] text-center/g, 'text-[40px] md:text-[60px] font-display italic text-accent font-bold text-center');
    text = text.replace(/font-display text-4xl text-\[#1a1a1a\] font-style: italic/g, 'text-[40px] md:text-[60px] font-display italic text-accent font-bold');
    
    // Avatars & Instructor pic
    text = text.replace(/w-32 h-32 md:w-48 md:h-48 rounded-none overflow-hidden mb-8 border-4 border-white relative mt-16 md:mt-0/g, 'w-48 h-48 rounded-full border border-gray-100 flex items-center justify-center overflow-hidden mb-8');
  }

  // Rewrite file
  fs.writeFileSync(filePath, text);
  console.log(`Updated ${filePath}`);
}

applyTheme('src/components/Landing.tsx');
applyTheme('src/components/Admin.tsx');
