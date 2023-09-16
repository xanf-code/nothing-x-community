"use server";

import {
  addClicksToPublishedResource,
  addVoteToPublishedResource,
  getUpvotes,
} from "@/lib/resources";

export async function getLatestLikes(resourceID) {
  const ups = await getUpvotes(resourceID);
  return Number(ups);
}

export async function createClick(resourceID) {
  await addClicksToPublishedResource(resourceID);
}

export async function createVote(resourceID, action) {
  await addVoteToPublishedResource(resourceID, action);
  await getLatestLikes(resourceID);
}
