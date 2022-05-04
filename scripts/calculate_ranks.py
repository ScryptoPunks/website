import json

metadatas = json.load(open("./../public/json/_metadata.json"))
occurences = json.load(open("./../public/json/_rarity.json"))
rarity = []
ranks = {}

for nft in metadatas:
    nft_rarity = 1
    nonce = nft["edition"]
    for attribute in nft["attributes"]:
        type = attribute["trait_type"]
        value = attribute["value"]
        occ = occurences[type][value]
        trait_rarity = round(occ / 10000 * 100, 2)
        nft_rarity *= trait_rarity
    rarity.append((nonce, nft_rarity))

rarity.sort(key=lambda tup: tup[1])
rarity = dict(rarity)
keys = list(rarity.keys())
for i in range(1, 10001):
    ranks[i] = keys.index(i) + 1

with open("./../public/json/_ranks.json", "w") as handler:
    json.dump(ranks, handler)