const OGLink = ({ url }) => {
  return (
    <a className="mb-5" href={url.openGraph.url}>
    <div className="max-w-container mx-auto">
      <div>
        <h2 className="text-3xl font-semibold pb-6">{url.meta.title}</h2>
        <p className="pb-8">{url.openGraph.description}</p>
      </div>
      <img className="max-w-2xl pb-8" src={url.openGraph.image} />
    </div>
    </a>
  );
};

export default OGLink;
