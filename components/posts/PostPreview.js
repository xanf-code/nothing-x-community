import { timeAgo } from "@/lib/utils";
import Avatar from "boring-avatars";
import Link from "next/link";
import { Badge } from "../ui/badge";

const PostPreview = (props) => {
  return (
    <div className="p-2 rounded-md space-y-2 cursor-cell select-none">
      <div className="flex space-x-2 items-center mb-2 ml-0">
        <Badge variant="secondary">{props.tag}</Badge>
        <p className="text-xs text-slate-400 font-nothing">
          {timeAgo(props.date)} ago
        </p>
      </div>
      <Link href={`/posts/${props.slug}`}>
        <h2 className="font-nothing text-violet-600 hover:underline">
          {props.title}
        </h2>
      </Link>
      <div className="flex space-x-2 items-center">
        <Avatar size={20} name={props.author} variant="beam" square={false} />
        <p className="text-xs font-nothing">{props.author}</p>
      </div>
    </div>
  );
};

export default PostPreview;
