import prisma from "../prisma";

export async function submitResources(formBody) {
  try {
    if (formBody && formBody != null) {
      await prisma.resource_entries.create({
        data: formBody,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getLinkForResource(file) {
  const link = "danka-naka";
  return link;
}
