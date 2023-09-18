import Header from "@/components/links/Header";
import LinkLayout from "@/components/links/LinkLayout";
import { SelectSeparator } from "@/components/ui/select";
import { data } from "@/data/links";

export default function ToolsPage({ params }) {
  const filteredObjects = data.filter(
    (obj) => obj.tag === decodeURI(params.name)
  );
  return (
    <div className="flex flex-col space-y-6">
      <div className="telegram">
        <Header name="🔗🔥 Links" />
        <SelectSeparator className="my-2" />
        <div className="mt-4">
          {filteredObjects.length > 0 ? (
            <div className="space-y-4">
              {filteredObjects.map((obj, index) => (
                <LinkLayout key={index} name={obj.name} link={obj.link} />
              ))}
            </div>
          ) : (
            <p1 className="font-nothing">NO LINKS FOUND :(</p1>
          )}
        </div>
      </div>
    </div>
  );
}
