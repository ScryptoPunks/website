import json

f = open("./../public/json/rarity.json")
data = json.load(f)

options = {}

index = 0
for layer, val in data.items():
    option = []
    for trait in val:
        option.append({"value": trait, "label": trait})
    options[layer] = option
    index += 1
    
with open("./../public/json/_options.json", "w") as handler:
    json.dump(options, handler)
