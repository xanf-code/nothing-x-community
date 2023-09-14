import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";
import { ClockIcon, LapTimerIcon } from "@radix-ui/react-icons";
import Avatar from "boring-avatars";

function Resource({ resource }) {
  const timestamp = new Date(resource.approved).getTime();
  const fullName = resource.firstName + " " + resource.lastName;

  return (
    <div>
      <div className="p-3 space-y-3">
        <h1 className="cursor-cell text-justify leading-tight hover:underline underline-offset-2">
          {resource.resourceName}
        </h1>
        <div className="flex space-x-4">
          <Badge variant="secondary">{resource.resourceType}</Badge>
          <div className="flex items-center space-x-1">
            <ClockIcon className="h-3.5 w-3.5" />
            <p className="text-xs font-light">{timeAgo(timestamp)}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Avatar size={20} name={fullName} variant="beam" square={false} />
            <p className="text-xs font-light">{fullName}</p>
          </div>
        </div>
      </div>
      <hr className="w-full my-1" />
    </div>
  );
}

export default Resource;
