import { Injectable } from "@nestjs/common";
import { Model, ModelCtor } from "sequelize/dist";

var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-ioredis');

@Injectable()
export class RedisCacheService {
    private redisCache = cacheManager.caching({
        store: redisStore,
        host: process.env.REDIS_HOST, // default value
        port: process.env.REDIS_PORT, // default value
        ttl: 60 * 10
      });
      

    async getOrCacheListQuery<T extends Model>(entity: ModelCtor<T>, where: object){
        const queryKey = JSON.stringify(where)
        const cacheVal = await this.redisCache.get(queryKey)
        const arrayObjs = JSON.parse(cacheVal)
        if(!cacheVal || !Array.isArray(arrayObjs)) {
            const freshData = await entity.findAll({where: where})
            await this.set(queryKey, JSON.stringify(freshData))
            return freshData
        } else {
            return arrayObjs.map((val, index, all) => {
                return val as T
            })
        }
    }

    async getCacheOneQuery<T extends Model>(entity: ModelCtor<T>, where: object){
        const queryKey = JSON.stringify(where)
        const cacheVal = await this.redisCache.get(queryKey)
        const object = JSON.parse(cacheVal)
        if(!cacheVal) {
            const freshData = await entity.findOne({where: where})
            await this.set(queryKey, JSON.stringify(freshData))
            return freshData
        } else {
            return object as T
        }

    }

    async get(key: string) {
        return await this.redisCache.get(key)
    }

    async set(key: string, value: any) {
        return await this.redisCache.set(key, value, ['EX', 10])
    }

    async del(key: string) {
        return await this.redisCache.get(key)
    }
}