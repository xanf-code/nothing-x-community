"use server";

import {
  addClicksToPublishedResource,
  addVoteToPublishedResource,
  getResourceByID,
  getUpvotes,
  updateResourceScore,
} from "@/lib/resources";

export async function calculateTrendingScore(id) {
  const post = await getResourceByID(id);
  const clicksWeight = 0.5;
  const scoreWeight = 0.3;
  const timeWeight = 0.2;
  const timeDecayHalfLife = 60 * 60 * 1000;

  const clicksScore = post.clicks * clicksWeight;
  const likesScore = post.upVotes >= 0 ? post.upVotes * scoreWeight : 0;
  const timeDiff = Date.now() - new Date(post.approved).getTime();
  const timeDecay = Math.exp(-timeDiff / timeDecayHalfLife);
  const timeScore = timeDecay * timeWeight;

  const score = clicksScore + likesScore + timeScore;
  await updateResourceScore(id, Math.round(score));
}

export async function getLatestLikes(resourceID) {
  const ups = await getUpvotes(resourceID);
  return Number(ups);
}

export async function createClick(resourceID) {
  await addClicksToPublishedResource(resourceID);
  await calculateTrendingScore(resourceID);
}

export async function createVote(resourceID, action) {
  await addVoteToPublishedResource(resourceID, action);
  await Promise.allSettled([
    getLatestLikes(resourceID),
    calculateTrendingScore(resourceID),
  ]);
}
