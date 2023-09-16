import { resourceStatus } from "@/utils/constants";
import prisma from "./prisma";

/* 
 - Submit Resources
 - upVote downVote
 - get Trending (algorithm)
*/

export async function submitResources(formBody) {
  try {
    if (formBody && formBody != null) {
      await prisma.resource_entries.create({
        data: formBody,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
}
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
      orderBy: {
        score: "desc",
      },
      take: 4,
    });
    return publishedResources;
  } catch (error) {
    return error;
  }
}

export async function getResourceByID(resourceID) {
  try {
    const resource = await prisma.resource_entries.findUnique({
      where: {
        id: resourceID,
      },
    });
    return resource;
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

export async function getResourcesByProduct(
  productName,
  status,
  page,
  pageSize,
  resourceTypes,
  searchQuery,
  orderBy
) {
  try {
    const actualPage = page - 1;
    const skip = actualPage * pageSize;

    const where = {
      productName: productName,
      status: status,
    };

    if (resourceTypes && resourceTypes.length > 0) {
      where.resourceType = {
        in: resourceTypes,
      };
    }

    if (searchQuery != "") {
      where.OR = [
        { resourceName: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    const allResources = await prisma.resource_entries.findMany({
      where: where,
      skip: skip,
      take: pageSize,
      orderBy: {
        [orderBy]: "desc",
      },
    });
    return allResources;
  } catch (error) {
    return error;
  }
}

export async function addVoteToPublishedResource(resourceID, action) {
  try {
    const votes = await prisma.resource_entries.update({
      where: {
        id: resourceID,
      },
      data: {
        upVotes:
          action == "up"
            ? { increment: 1 }
            : action == "down"
            ? { decrement: 1 }
            : {},
      },
    });
    return votes;
  } catch (err) {
    return err;
  }
}

export async function addClicksToPublishedResource(resourceID) {
  try {
    const addClick = prisma.resource_entries.update({
      where: {
        id: resourceID,
      },
      data: {
        clicks: { increment: 1 },
      },
    });
    return addClick;
  } catch (err) {
    console.log(err);
  }
}

export async function getUpvotes(resourceID) {
  try {
    const vote = await prisma.resource_entries.findUnique({
      where: {
        id: resourceID,
      },
    });
    return vote.upVotes;
  } catch (error) {
    return error;
  }
}

export async function updateResourceScore(resourceID, newScore) {
  try {
    const score = await prisma.resource_entries.update({
      where: {
        id: resourceID,
      },
      data: {
        score: newScore,
      },
    });
    return score;
  } catch (err) {
    console.log(err);
  }
}
