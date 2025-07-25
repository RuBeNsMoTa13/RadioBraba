import { useEffect } from 'react';

declare const Instafeed: any;

export function InstaFeed() {
  useEffect(() => {
    const feed = new Instafeed({
      accessToken: '355163398aa156d8de89484191ddc9a9',
      limit: 8,
      template: `
        <div class="item">
          <a href="{{link}}" target="_blank">
            <img src="{{image}}" />
          </a>
        </div>
      `,
      after: function () {
        // Ativa o carousel depois que os posts foram renderizados
        // Exemplo com OwlCarousel (se estiver usando):
        // $('.owl-carousel').owlCarousel({ ... });
      },
    });

    feed.run();
  }, []);
  return (
    <div>
      <h1>Instagram Feed</h1>
      <div id="instafeed" className="owl-carousel"></div>
    </div>
  );
}
