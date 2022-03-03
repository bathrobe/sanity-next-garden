const OGLink = ({ url }) => {
  return (
    <a className="mb-5" href={url.openGraph.url}>
    <div className="flex justify-evenly items-center max-w-container mx-auto">
      <div>
        <h2 className="text-3xl font-serif font-semibold pb-6">{url.meta.title}</h2>
        <p>{url.openGraph.description}</p>
      </div>
      <img className="max-w-2xl" src={url.openGraph.image} />
    </div>
    </a>
  );
};

export default OGLink;
