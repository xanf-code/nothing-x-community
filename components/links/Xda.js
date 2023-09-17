import LinkLayout from "./LinkLayout";

export default function Xda() {
  return (
    <div className="flex flex-col space-y-4">
      <LinkLayout
        link="https://forum.xda-developers.com/f/nothing-phone-1.12585/"
        name="Nothing Phone (1) Forum"
      />
      <LinkLayout
        link="https://forum.xda-developers.com/f/nothing-phone-2.12739/"
        name="Nothing Phone (2) Forum"
      />
    </div>
  );
}
