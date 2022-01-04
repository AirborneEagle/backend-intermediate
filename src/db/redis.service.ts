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
      

    async getCacheListQuery<T extends Model>(entity: ModelCtor<T>, where: object){
        const queryKey = JSON.stringify(where)
        const cacheVal = await this.redisCache.get(queryKey)
        const arrayObjs = JSON.parse(cacheVal)
        if(cacheVal || !Array.isArray(arrayObjs)) {
            return entity.findAll({where: where})
        } else {
            return arrayObjs.map((val, index, all) => {
                return val as T
            })
        }
    }

    async getCacheOneQuery<T extends Model>(entity: ModelCtor<T>){
        entity.findOne
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