#!/usr/bin/env python3
""" 0-basic_cache """
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ caching system class """
    def put(self, key, item):
        """ assign to the dictionary the item for the key """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ returns the item linked to the key """
        return self.cache_data.get(key)
