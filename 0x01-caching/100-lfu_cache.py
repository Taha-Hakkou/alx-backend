#!/usr/bin/env python3
""" 100-lfu_cache """
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFU caching system class """
    def __init__(self):
        """ LFUCache constructor """
        self.frequency_record = {}
        self.usage_record = []
        super().__init__()

    def put(self, key, item):
        """ assigns to dictionary the item for the key """
        if key and item:
            if key in self.cache_data:
                self.frequency_record[key] += 1
                self.usage_record.remove(key)
            else:
                self.frequency_record[key] = 0
            self.usage_record.append(key)
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                keys = self.usage_record
                dkeys = [keys[0]]
                for k in keys[:-1]:
                    fk = self.frequency_record.get(k)
                    fdk = self.frequency_record.get(dkeys[0])
                    if fk < fdk:
                        dkeys = [k]
                    elif fk == fdk:
                        dkeys.append(k)
                if len(dkeys) == 1:
                    discarded_key = dkeys[0]
                else:
                    index = self.usage_record.index(dkeys[0])
                    for k in dkeys:
                        if k != key and self.usage_record.index(k) < index:
                            index = self.usage_record.index(k)
                    discarded_key = self.usage_record[index]

                del self.cache_data[discarded_key]
                del self.frequency_record[discarded_key]
                self.usage_record.remove(discarded_key)
                print(f'DISCARD: {discarded_key}')

    def get(self, key):
        """ returns the item linked to key """
        if key in self.cache_data:
            self.frequency_record[key] += 1
            self.usage_record.remove(key)
            self.usage_record.append(key)
        return self.cache_data.get(key)
