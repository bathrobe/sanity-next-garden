import Link from "next/link";
import Graph from "react-graph-network";
import Layout from "../components/Layout.jsx";
import { client } from "../lib/sanity/client.js";
import { graphQuery } from "../lib/sanity/graphQuery.js";

const makeNodes = (posts) => {
  const postNodes = posts?.map((post) => {
    let nodeObject = { id: post._id, title: post.title, slug: post.slug };
    return nodeObject;
  });
  return postNodes;
};

const makeEdges = (posts) => {
  let edges = [];
  posts.map((p) => {
    return p.backlinks.map((b) => {
      edges.push({ source: b._id, target: p._id });
    });
  });
    return edges
};

const Node = ({ node }) => {
  return (
    <>
      <Link href={`/posts/${node.slug}`}>
        <a>
          <circle r={10} stroke="black" />
          <text x="-70" y="35">{node.title}</text>
        </a>
      </Link>
    </>
  );
};

const GraphPage = ({ posts }) => {
  const nodes = makeNodes(posts);
  const edges = makeEdges(posts);
  const data = {
    nodes: nodes,
    links: edges,
  };
  return (
    <Layout>
      <div>
        <div style={{ height: "100vh" }}>
          <Graph
            data={data}
            id="graph"
            nodeDistance={22000}
            NodeComponent={Node}
            pullIn={true}
            enableDrag={true}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GraphPage;

export async function getStaticProps({ params }) {
  const posts = await client.fetch(graphQuery);

  return {
    props: {
      posts,
    },
  };
}
