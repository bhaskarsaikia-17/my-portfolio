import React from 'react';
import ScrollFadeIn from './ScrollFadeIn';

function HomePage() {
  return (
    <div className="space-y-16 p-10">
      <ScrollFadeIn>
        <div className="h-64 bg-red-300 rounded-lg flex items-center justify-center text-black font-bold text-xl">
          Section 1
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className="h-64 bg-green-300 rounded-lg flex items-center justify-center text-black font-bold text-xl">
          Section 2
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className="h-64 bg-blue-300 rounded-lg flex items-center justify-center text-black font-bold text-xl">
          Section 3
        </div>
      </ScrollFadeIn>
    </div>
  );
}

export default HomePage; 