
'use client';

import mockCarouselMessages from "../../mockData/mockCarousalMessage.json"


import Carousal from '@/components/carousal';

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-customPurple text-white ">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold gradient-text">
            Unveil the Power of Anonymous
            <br />
            Expression
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Veil Voice - Where your identity remains a secret.
          </p>
        </section>

        <Carousal items={mockCarouselMessages} />
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-white-900 text-black">
        © 2024 Veil Voice. All rights reserved.
      </footer>
    </>
  );
}
