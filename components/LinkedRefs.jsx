import Link from "next/link";
const LinkedRefs = ({ backlinks }) => {
  return (
    <div>
      <hr className="mt-8"/>
      <h3 className="italic pt-4 text-lg pb-2">Referenced in</h3>
      {backlinks.map((backlink) => {
        return (
          <Link href={`/posts/${backlink.slug.current}`}>
            <a className="hover:underline text-green-500">{backlink.title}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default LinkedRefs;
