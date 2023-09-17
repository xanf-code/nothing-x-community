"use server";

import {
  addClicksToPublishedResource,
  addVoteToPublishedResource,
  getResourceByID,
  updateResourceScore,
} from "@/lib/resources";
import { revalidatePath } from "next/cache";

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

export async function createClick(resourceID) {
  await addClicksToPublishedResource(resourceID);
  await calculateTrendingScore(resourceID);
  revalidatePath("/");
}

export async function createVote(resourceID, action) {
  try {
    await addVoteToPublishedResource(resourceID, action);
    await calculateTrendingScore(resourceID);
    revalidatePath("/");
    return "OK";
  } catch (e) {
    return "ERROR";
  }
}
