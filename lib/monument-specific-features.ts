/**
 * Monument-specific feature detection for accurate recognition
 * This helps distinguish between similar monuments
 */

export const MONUMENT_DISTINGUISHING_FEATURES = {
  // Taj Mahal vs Gol Gumbaz distinction
  "taj-mahal": {
    unique_features: [
      "four_corner_minarets",
      "white_marble_material",
      "central_onion_dome",
      "reflecting_pool_in_front",
      "perfect_symmetry",
      "pointed_arches",
      "ivory_white_color",
    ],
    not_features: ["massive_single_dome", "dark_stone_material", "cubic_base_structure"],
  },

  "bijapur-gol-gumbaz": {
    unique_features: [
      "massive_central_dome_only",
      "dark_gray_stone_material",
      "cubic_base_structure",
      "four_corner_towers_octagonal",
      "no_reflecting_pool",
      "single_large_dome",
      "fortress_like_appearance",
    ],
    not_features: ["white_marble", "four_tall_minarets", "reflecting_pool", "multiple_domes"],
  },

  // Tipu Palace vs Taj Mahal distinction
  "tipu-sultan-summer-palace-bangalore": {
    unique_features: [
      "wooden_structure",
      "two_story_building",
      "brown_wood_color",
      "carved_wooden_pillars",
      "flat_roof_structure",
      "indo_islamic_wooden_arches",
      "balconies_with_wooden_railings",
    ],
    not_features: ["white_marble", "dome_structure", "stone_material", "minarets"],
  },

  // Badami Caves vs Sanchi Stupa distinction
  "badami-cave-temples": {
    unique_features: [
      "rock_cut_caves",
      "red_sandstone_material",
      "hillside_location",
      "multiple_cave_openings",
      "carved_stone_pillars",
      "natural_rock_formation",
      "orange_red_color",
    ],
    not_features: ["hemispherical_dome", "circular_structure", "torana_gates", "buddhist_stupa_shape"],
  },

  "sanchi-stupa": {
    unique_features: [
      "hemispherical_dome_structure",
      "circular_base",
      "four_torana_gates",
      "buddhist_architecture",
      "stone_railings",
      "umbrella_on_top",
      "weathered_stone_color",
    ],
    not_features: ["cave_openings", "red_sandstone", "hillside_caves", "carved_pillars_in_caves"],
  },

  "mysore-palace": {
    unique_features: [
      "indo_saracenic_architecture",
      "multiple_small_domes",
      "tall_central_tower",
      "palace_complex",
      "gray_stone_with_domes",
      "ornate_facade",
      "five_story_tower",
    ],
    not_features: ["single_massive_dome", "white_marble", "wooden_structure"],
  },

  "golden-temple": {
    unique_features: [
      "golden_color_building",
      "surrounded_by_water",
      "sikh_architecture",
      "marble_causeway",
      "golden_dome",
      "bright_yellow_gold_color",
      "water_reflection",
    ],
    not_features: ["white_color", "red_color", "stone_material_only", "no_water_around"],
  },

  "red-fort": {
    unique_features: [
      "massive_red_walls",
      "red_sandstone_material",
      "fort_architecture",
      "deep_red_color",
      "mughal_fort_gates",
      "defensive_walls",
      "brick_red_appearance",
    ],
    not_features: ["white_color", "dome_structure", "palace_architecture", "golden_color"],
  },
}

/**
 * Advanced feature matching for monument distinction
 */
export function calculateFeatureMatchScore(detectedFeatures: string[], monumentId: string): number {
  const monumentFeatures = MONUMENT_DISTINGUISHING_FEATURES[monumentId]
  if (!monumentFeatures) return 0

  let score = 0

  // Positive scoring for matching unique features
  const uniqueMatches = detectedFeatures.filter((feature) =>
    monumentFeatures.unique_features.some(
      (unique) =>
        feature.toLowerCase().includes(unique.replace(/_/g, " ")) ||
        unique.replace(/_/g, " ").includes(feature.toLowerCase()),
    ),
  ).length

  score += (uniqueMatches / monumentFeatures.unique_features.length) * 60

  // Negative scoring for conflicting features
  const conflictingFeatures = detectedFeatures.filter((feature) =>
    monumentFeatures.not_features.some(
      (notFeature) =>
        feature.toLowerCase().includes(notFeature.replace(/_/g, " ")) ||
        notFeature.replace(/_/g, " ").includes(feature.toLowerCase()),
    ),
  ).length

  score -= conflictingFeatures * 20

  return Math.max(0, score)
}
