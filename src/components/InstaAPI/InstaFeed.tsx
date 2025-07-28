// src/components/InstagramFeed.tsx

import { useEffect } from 'react';
// @ts-ignore
import $ from 'jquery';

declare const Instafeed: any;

export default function InstagramFeed() {
  useEffect(() => {
    const feed = new Instafeed({
      accessToken: 'EACJ6bPjuZBYQBPMujojxWDDPv86N8JG2YNdZCr8kAzZBa4yHWNWMFtLaYjFWyUVWngYy5IqHZC0nYrYDCCZCGCdyJXzOYZAl6rnB2nV9JAqwQtVZAGlF85ejHbSZBEfkPgAuzf7onOgDIPt2UEoOQQ5pNLQ4rc2Sz4UZCOV0VZAbAUtwK82rr4XmDjwfGft7sk',
      target: 'instafeed',
      limit: 8,
      template: `
        <div class="item">
          <a href="{{link}}" target="_blank">
            <img src="{{image}}" alt="Instagram post" />
          </a>
        </div>
      `,
      after: function () {
        // Ativa o carousel depois de carregar os posts
        // $('#instafeed').owlCarousel({
        //   items: 3,
        //   margin: 10,
        //   loop: true,
        //   dots: true,
        //   responsive: {
        //     0: { items: 1 },
        //     600: { items: 2 },
        //     1000: { items: 3 }
        //   }
        // });
      }
    });

    feed.run();
  }, []);
<h1>gsrge5yhehwas</h1>
  return <div id="instafeed" className="owl-carousel" />;
}
