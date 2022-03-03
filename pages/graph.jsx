import Link from "next/link";
import Graph from "react-graph-network";
import Layout from "../components/Layout.jsx";
import { client } from "../lib/sanity/client.js";
import { graphQuery } from "../lib/sanity/graphQuery.js";

const makeNodes = (posts) => {
  const postNodes = posts?.map((post) => {
    let nodeObject = {
      id: post._id,
      title: post.title,
      slug: post.slug,
      type: post.category,
    };
    return nodeObject;
  });
  return postNodes;
};

const makeEdges = (posts) => {
  let edges = [];
  posts.map((post) => {
    return post.backlinks.map((backlink) => {
      edges.push({ source: backlink._id, target: post._id });
    });
  });
  return edges;
};

const Node = ({ node }) => {
  let color = "black";
  switch (node.type) {
    case "link":
      color = "cyan";
      break;
    case "book":
      color = "pink";
      break;
    case "note":
      color = "lightgreen";
      break;
    case "journal":
      color = "purple";
      break;
    case "code":
      color = "orange";
      break;
  }
  return (
    <>
      <Link href={`/posts/${node.slug}`}>
        <a>
          <circle r={10} fill={color} />
          <text x="-50" y="40">
            {node.title}
          </text>
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
        <div style={{ width: "100vw", height: "100vh" }}>
          <Graph
            data={data}
            id="graph"
            nodeDistance={1050}
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
