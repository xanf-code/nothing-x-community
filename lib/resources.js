import { resourceStatus } from "@/utils/constants";
import prisma from "./prisma";

/* 
 - Submit Resources
 - upVote downVote
 - get Trending (algorithm)
*/

export async function getAllResources() {
  try {
    const resources = await prisma.resource_entries.findMany();
    return resources;
  } catch (error) {
    return error;
  }
}

export async function getPublishedResources() {
  try {
    const publishedResources = await prisma.resource_entries.findMany({
      where: {
        status: resourceStatus.PUBLISHED,
      },
    });
    return publishedResources;
  } catch (error) {
    return error;
  }
}

export async function getDraftResources() {
  try {
    const draftResources = await prisma.resource_entries.findMany({
      where: {
        status: resourceStatus.DRAFT,
      },
    });
    return draftResources;
  } catch (error) {
    return error;
  }
}

export async function getDeletedResources() {
  try {
    const deletedResources = await prisma.resource_entries.findMany({
      where: {
        status: resourceStatus.DELETED,
      },
    });
    return deletedResources;
  } catch (error) {
    return error;
  }
}

export async function getByResourceType(resourceType) {
  try {
    const resources = await prisma.resource_entries.findMany({
      where: {
        resourceType: resourceType,
        status: resourceStatus.PUBLISHED,
      },
    });
    return resources;
  } catch (error) {
    return error;
  }
}

export async function getCountPublished(resourceType) {
  try {
    const resourceCount = await prisma.resource_entries.count({
      where: {
        resourceType: resourceType,
        status: resourceStatus.PUBLISHED,
      },
    });
    return resourceCount;
  } catch (error) {
    return error;
  }
}

export async function getResourcesByProduct(productName, status) {
  try {
    const allResources = await prisma.resource_entries.findMany({
      where: {
        productName: productName,
        status: status,
      },
    });
    return allResources;
  } catch (error) {
    return error;
  }
}
