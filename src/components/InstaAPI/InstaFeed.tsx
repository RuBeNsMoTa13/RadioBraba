import React from "react";

export const InstaFeed: React.FC = () => {
  return (
    <div className="w-full rounded-xl page-container h-[430px] md:h-80  lg:h-[620px] mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">INSTA DA BRABA!</h2>
          <p className="text-xl text-secondary">Fique sempre ligado nas novidades.</p>
        </div>
      <iframe
        src="https://widget.tagembed.com/294900?website=1"
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          border: "none"
        }}
        title="Tagembed Widget"
      />
    </div>
  );
};

export default InstaFeed;
