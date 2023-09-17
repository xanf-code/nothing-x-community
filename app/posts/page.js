import { default as PostPreview } from "@/components/posts/PostPreview";
import { default as getPostMetadata } from "@/components/posts/getPostMetadata";

export default function page() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return <div className="flex flex-col space-y-4">{postPreviews}</div>;
}
