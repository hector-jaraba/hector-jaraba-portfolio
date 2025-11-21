/**
 * Feature flags configuration
 *
 * These flags control the visibility of features.
 * Can be controlled via environment variables or default values.
 */

export const FEATURES = {
  /**
   * Blog feature flag
   * Set to true to enable the blog
   * Can be overridden with BLOG_ENABLED=true environment variable
   */
  BLOG_ENABLED: false,

  /**
   * i18n / Language switching feature flag
   * Set to true to enable language switching
   * Can be overridden with I18N_ENABLED=true environment variable
   */
  I18N_ENABLED: false,
} as const;

/**
 * Check if a feature is enabled
 * First checks environment variable, then falls back to default value
 */
export function isFeatureEnabled(feature: keyof typeof FEATURES): boolean {
  if (import.meta.env.DEV) {
    return true;
  }
  return FEATURES[feature];
}
