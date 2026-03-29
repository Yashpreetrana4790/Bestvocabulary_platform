/**
 * Player ranks: each tier has an emblem (SVG in /public/emblems/) and a minimum XP.
 * XP is derived from saved words (see XP_PER_SAVED_WORD).
 *
 * `disabled: true` — shown on profile as locked “Coming soon”; not earnable yet.
 */

export const XP_PER_SAVED_WORD = 20;

/** @typedef {{ level: number, title: string, minXp: number, emblem: string, description?: string, disabled?: boolean }} LevelTier */

/** @type {LevelTier[]} */
export const LEVEL_TIERS = [
  { level: 1, title: 'Novice', minXp: 0, emblem: 'turtle.svg', description: 'Your vocabulary journey begins.' },
  { level: 2, title: 'Curious', minXp: 60, emblem: 'penguine.svg', description: 'Dipping into new words.' },
  { level: 3, title: 'Gatherer', minXp: 140, emblem: 'squirel.svg', description: 'Collecting meanings one by one.' },
  { level: 4, title: 'Watcher', minXp: 260, emblem: 'owl.svg', description: 'Sharp eyes for nuance.' },
  { level: 5, title: 'Explorer', minXp: 420, emblem: 'kangaroo.svg', description: 'Leaping between ideas.' },
  { level: 6, title: 'Collector', minXp: 620, emblem: 'panda.svg', description: 'A steady habit of learning.' },
  { level: 7, title: 'Hunter', minXp: 900, emblem: 'wolf.svg', description: 'Tracking the right word.' },
  { level: 8, title: 'Strategist', minXp: 1280, emblem: 'lion.svg', description: 'Command of expression.' },
  { level: 9, title: 'Guardian', minXp: 1760, emblem: 'bear.svg', description: 'Depth and grounding.' },
  { level: 10, title: 'Soarer', minXp: 2380, emblem: 'eagle.svg', description: 'Seeing patterns from above.' },
  { level: 11, title: 'Deep Diver', minXp: 3160, emblem: 'shark.svg', description: 'Precision under pressure.' },
  { level: 12, title: 'Voyager', minXp: 4120, emblem: 'whale.svg', description: 'Breadth of language.' },
  { level: 13, title: 'Mythic', minXp: 5280, emblem: 'dragon.svg', description: 'Rare and memorable words.' },
  { level: 14, title: 'Stinger', minXp: 6680, emblem: 'scorpio.svg', description: 'Exact and unforgettable.' },
  { level: 15, title: 'Ancient', minXp: 8360, emblem: 'rheinosauraus.svg', description: 'Power and endurance.' },
  { level: 16, title: 'Radiant', minXp: 10340, emblem: 'peakock.svg', description: 'Colorful expression.' },
  { level: 17, title: 'Phoenix', minXp: 12600, emblem: 'firebird.svg', description: 'Peak rank — for now.' },
  // Placeholder tiers: visible on profile, emblem unlock disabled until product defines rules
  {
    level: 18,
    title: 'Ascendant',
    minXp: 16000,
    emblem: 'lion.svg',
    description: 'Reserved for future challenges.',
    disabled: true,
  },
  {
    level: 19,
    title: 'Transcendent',
    minXp: 20000,
    emblem: 'dragon.svg',
    description: 'Coming in a future update.',
    disabled: true,
  },
];

export function emblemSrc(emblemFile) {
  return `/emblems/${emblemFile}`;
}

export function getTotalXp(savedWordCount) {
  return Math.max(0, (savedWordCount || 0) * XP_PER_SAVED_WORD);
}

/**
 * Highest tier index the player has reached by XP (skips `disabled` tiers for *current* rank).
 */
export function getEarnableTierIndex(totalXp) {
  let idx = 0;
  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    const t = LEVEL_TIERS[i];
    if (t.disabled) continue;
    if (totalXp >= t.minXp) idx = i;
  }
  return idx;
}

/**
 * Progress card + bar (next tier may be disabled — bar caps at last earnable).
 */
export function getPlayerLevel(savedWordCount) {
  const totalXp = getTotalXp(savedWordCount);
  const tierIndex = getEarnableTierIndex(totalXp);
  const currentTier = LEVEL_TIERS[tierIndex];

  let nextIdx = tierIndex + 1;
  while (nextIdx < LEVEL_TIERS.length && LEVEL_TIERS[nextIdx].disabled) {
    nextIdx += 1;
  }
  const nextTier = nextIdx < LEVEL_TIERS.length ? LEVEL_TIERS[nextIdx] : null;

  let progress = 100;
  if (nextTier && !nextTier.disabled) {
    const span = nextTier.minXp - currentTier.minXp;
    progress = span > 0 ? ((totalXp - currentTier.minXp) / span) * 100 : 100;
    progress = Math.max(0, Math.min(100, progress));
  }

  return {
    totalXp,
    level: currentTier.level,
    tierIndex,
    levelName: currentTier.title,
    xp: totalXp,
    /** @type {number | null} */
    nextLevelXp: nextTier && !nextTier.disabled ? nextTier.minXp : null,
    progress,
    nextTier,
    currentTier,
  };
}

/**
 * Profile ladder row: unlocked if XP met and tier is not `disabled`.
 */
export function isTierUnlocked(totalXp, tier) {
  if (tier.disabled) return false;
  return totalXp >= tier.minXp;
}

