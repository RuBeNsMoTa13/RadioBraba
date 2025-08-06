
export function GalleryPage() {

  return (
    <div className="page-container">
      <div className="w-full rounded-xl page-container h-full md:h-80  lg:h-full mb-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">INSTA DA BRABA!</h2>
      </div>      
      <iframe
        src="https://widget.tagembed.com/295579?website=1"
        scrolling="no"
        className="w-full min-h-[300vh] border-none"
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          border: "none"
        }}
        title="Tagembed Widget"
      />
    </div>
    </div>
  );
}