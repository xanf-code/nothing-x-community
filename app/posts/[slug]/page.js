import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/components/posts/getPostMetadata";
import { timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function generateMetadata({ params }) {
  const { slug } = params;
  const { data } = getPostContent(slug);

  return {
    title: `${data.title} | Nothing Resources`,
  };
}

const getPostContent = (slug) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = (props) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div>
      <div className="my-4 text-start space-y-3">
        <h1 className="text-2xl font-nothing">{post.data.title}</h1>
        <p className="font-nothing text-xs">
          posted {timeAgo(post.data.date)} ago.
        </p>
        <Badge variant="secondary">{post.data.tag}</Badge>
      </div>
      <article className="prose dark:prose-invert">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
