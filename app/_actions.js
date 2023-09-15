"use server";

import {
  addClicksToPublishedResource,
  addDownVoteToPublishedResource,
  addUpVoteToPublishedResource,
  getDownvotes,
  getUpvotes,
} from "@/lib/resources";

export async function computeLikes(resourceID) {
  const ups = await getUpvotes(resourceID);
  const downs = await getDownvotes(resourceID);
  return Number(ups + downs);
}

export async function createClick(resourceID) {
  await addClicksToPublishedResource(resourceID);
}

export async function createLike(resourceID) {
  await addUpVoteToPublishedResource(resourceID);
  await computeLikes(resourceID);
}

export async function createDislike(resourceID) {
  await addDownVoteToPublishedResource(resourceID);
  await computeLikes(resourceID);
}
