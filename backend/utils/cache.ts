import { LRUCache } from "lru-cache";

const options = {
  max: 100, // Maximum number of items in the cache
  ttl: 3600000, // Time-to-live in milliseconds (1 hour)
};

// Create an instance of LRUCache with the specified options
const cache = new LRUCache(options);

/*
To set a value in the cache:
cache.set("exampleKey", "exampleValue");

To get a value from the cache:
const exampleValue = cache.get("exampleKey");
console.log(exampleValue); // Output: "exampleValue"
*/

export default cache;
