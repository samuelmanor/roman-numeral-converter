import { LRUCache } from "lru-cache";

const options = {
  max: 100, // Maximum number of items in the cache
  ttl: 3600000, // Time-to-live in milliseconds (1 hour)
};

/**
 * This is an LRU (Least Recently Used) cache that stores key-value pairs.
 * It uses the `lru-cache` library to manage the cache.
 * The cache will store up to 100 items, and each item will expire after 1 hour (3600000 milliseconds).
 */
const cache = new LRUCache(options);

/*
To set a value in the cache:
cache.set("exampleKey", "exampleValue");

To get a value from the cache:
const exampleValue = cache.get("exampleKey");
console.log(exampleValue); // Output: "exampleValue"
*/

export default cache;
