import json

f = open("./../public/json/_rarity.json")
data = json.load(f)
r = {}

for layer, val in data.items():
    reset = {}
    for trait in val:
        reset[trait] = []
    r[layer] = reset

with open("./../public/json/_reset.json", "w") as handler:
    json.dump(r, handler)