import { Injectable } from "@nestjs/common";

var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-ioredis');

@Injectable()
export class RedisCacheService {
    // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){}
    private redisCache = cacheManager.caching({
        store: redisStore,
        host: process.env.REDIS_HOST, // default value
        port: process.env.REDIS_PORT, // default value
        // password: 'XXXXX',
        // db: 0,
        ttl: 60 * 10
      });
      

    _testCache(key: string){
        // TODO check the cache, if it is not there
    }

    async get(key: string) {
        return await this.redisCache.get(key)
    }

    async set(key: string, value: object) {
        return await this.redisCache.set(key, value)
    }

    async del(key: string) {
        return await this.redisCache.get(key)
    }
}