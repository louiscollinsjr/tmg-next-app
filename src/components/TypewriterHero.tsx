'use client';

import Typewriter from 'typewriter-effect';

export default function TypewriterHero() {
  return (
    <span className="inline-block min-w-[200px] text-primary">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(50)
            .changeDeleteSpeed(40)
            .typeString('Reimagine')
            .pauseFor(4000)
            .deleteAll()
            .typeString('Transform')
            .pauseFor(4000)
            .deleteAll()
            .typeString('Renovate')
            .pauseFor(4000)
            .deleteAll()
            .typeString('Upgrade')
            .pauseFor(4000)
            .deleteAll()
            .typeString('Refresh')
            .pauseFor(4000)
            .deleteAll()
            .typeString('Beautify')
            .pauseFor(4000)
            .deleteAll()
            .typeString('Restore')
            .pauseFor(4000)
            .deleteAll()
            .start();
        }}
        options={{
          loop: true,
          cursor: '',
        }}
      />
    </span>
  );
}
