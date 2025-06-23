declare module "@analytics/google-analytics" {
  export interface GoogleAnalyticsConfig {
    /**
     * Google Analytics tracking/measurement ID(s)
     */
    measurementIds: string[];
    /**
     * Custom Google analytics tracker name
     */
    trackingId?: string;
    /**
     * Custom dimensions for Google Analytics
     */
    customDimensions?: Record<string, any>;
    /**
     * Enable Google Analytics debugging mode
     */
    debug?: boolean;
    /**
     * Setting this to true will disable google analytics from firing tracking events.
     * This is useful for development environments.
     */
    enabled?: boolean;
    /**
     * Configuration options for setting up Google Analytics
     */
    gtagConfig?: Record<string, any>;
  }

  /**
   * Google Analytics plugin for Analytics
   */
  export default function googleAnalyticsPlugin(
    config: GoogleAnalyticsConfig
  ): {
    name: string;
    config: GoogleAnalyticsConfig;
    initialize: () => void;
    page: (data: any) => void;
    track: (data: any) => void;
    identify: (data: any) => void;
    loaded: () => boolean;
  };
}

declare module "analytics" {
  export interface AnalyticsConfig {
    /**
     * Name of your application
     */
    app: string;
    /**
     * Version of your application
     */
    version?: string;
    /**
     * Array of analytics plugins
     */
    plugins?: any[];
    /**
     * Debug analytics
     */
    debug?: boolean;
  }

  export interface AnalyticsInstance {
    /**
     * Track page views
     */
    page: (data?: any) => void;
    /**
     * Track custom events
     */
    track: (eventName: string, payload?: any) => void;
    /**
     * Identify users
     */
    identify: (userId: string, traits?: any) => void;
    /**
     * Get user data
     */
    user: () => any;
    /**
     * Reset current user data & storage
     */
    reset: () => void;
    /**
     * Fire ready callback when analytics library is loaded
     */
    ready: (callback: () => void) => void;
    /**
     * Check if analytics is ready
     */
    isReady: () => boolean;
    /**
     * On event callback
     */
    on: (event: string, callback: (data: any) => void) => void;
    /**
     * Enable analytics plugin
     */
    enable: (pluginName: string) => void;
    /**
     * Disable analytics plugin
     */
    disable: (pluginName: string) => void;
    /**
     * Get state of plugin
     */
    getState: () => any;
    /**
     * Storage utilities
     */
    storage: any;
  }

  export default function Analytics(config: AnalyticsConfig): AnalyticsInstance;
}
