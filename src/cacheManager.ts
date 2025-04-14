// utils/cacheManager.ts

type CacheItem<T> = {
    data: T;
    timestamp: number;
  };
  
  class CacheManager {
    private defaultTTL: number;
  
    constructor(defaultTTL = 10 * 60 * 1000) { // Default 5 minutes
      this.defaultTTL = defaultTTL;
    }
  
    /**
     * Get an item from cache
     * @param key Cache key
     * @param ttl Optional custom TTL in milliseconds
     * @returns The cached data or null if not found or expired
     */
    get<T>(key: string, ttl?: number): T | null {
      try {
        const cachedItem = localStorage.getItem(key);
        
        if (!cachedItem) return null;
        
        const { data, timestamp }: CacheItem<T> = JSON.parse(cachedItem);
        const now = Date.now();
        const maxAge = ttl || this.defaultTTL;
        
        // Check if cache is expired
        if (now - timestamp > maxAge) {
          // Remove expired cache
          this.remove(key);
          return null;
        }
        
        return data;
      } catch (error) {
        console.error(`Error reading from cache for key ${key}:`, error);
        return null;
      }
    }
  
    /**
     * Save item to cache
     * @param key Cache key
     * @param data Data to cache
     */
    set<T>(key: string, data: T): void {
      try {
        const cacheItem: CacheItem<T> = {
          data,
          timestamp: Date.now(),
        };
        
        localStorage.setItem(key, JSON.stringify(cacheItem));
      } catch (error) {
        console.error(`Error saving to cache for key ${key}:`, error);
      }
    }
  
    /**
     * Remove item from cache
     * @param key Cache key
     */
    remove(key: string): void {
      try {
        localStorage.setItem(key, '');
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing from cache for key ${key}:`, error);
      }
    }
  
    /**
     * Clear all cache items or items with a specific prefix
     * @param prefix Optional prefix to filter which items to clear
     */
    clear(prefix?: string): void {
      try {
        if (prefix) {
          // Clear only items with the given prefix
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
              localStorage.removeItem(key);
            }
          }
        } else {
          // Clear all
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error clearing cache:', error);
      }
    }
  
    /**
     * Get all cache keys
     * @param prefix Optional prefix to filter which keys to return
     * @returns Array of cache keys
     */
    keys(prefix?: string): string[] {
      try {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (!prefix || key.startsWith(prefix))) {
            keys.push(key);
          }
        }
        return keys;
      } catch (error) {
        console.error('Error getting cache keys:', error);
        return [];
      }
    }
  }
  
  export const cacheManager = new CacheManager();
  
  export default CacheManager;