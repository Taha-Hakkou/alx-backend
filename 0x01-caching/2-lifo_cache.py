#!/usr/bin/env python3
""" 2-lifo_cache """
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """ LIFO caching system class """
    def __init__(self):
        """ LIFOCache constructor """
        super().__init__()

    def put(self, key, item):
        """ assigns to dictionary the item for the key """
        if key and item:
            if len(self.cache_data) == BaseCaching.MAX_ITEMS:
                discarded_key = sorted(self.cache_data.keys())[-1]
                del self.cache_data[discarded_key]
                print(f'DISCARD: {discarded_key}')
            self.cache_data[key] = item

    def get(self, key):
        """ returns item linked to the key """
        return self.cache_data.get(key)
