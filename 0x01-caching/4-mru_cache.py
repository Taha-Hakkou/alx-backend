#!/usr/bin/env python3
""" 4-mru_cache """
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """ MRU caching system class """
    def __init__(self):
        """ MRUCache constructor """
        self.usage_record = []
        super().__init__()

    def put(self, key, item):
        """"""
        if key and item:
            if key in self.usage_record:
                self.usage_record.remove(key)
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                discarded_key = self.usage_record[0]
                del self.cache_data[discarded_key]
                self.usage_record.remove(discarded_key)
                print(f'DISCARD: {discarded_key}')
            self.usage_record.insert(0, key)

    def get(self, key):
        """ returns the item linked to key """
        if key in self.usage_record:
            self.usage_record.remove(key)
            self.usage_record.insert(0, key)
        return self.cache_data.get(key)
