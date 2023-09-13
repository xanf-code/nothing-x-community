function Resource({ resource }) {
  return (
    <div>
      <h1 className="text-base font-mono cursor-cell">
        {resource.resourceName}
      </h1>
    </div>
  );
}

export default Resource;
