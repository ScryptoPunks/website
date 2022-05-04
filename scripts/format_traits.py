import json

f = open("./../public/json/_reset.json")
data = json.load(f)

options = []

for layer, val in data.items():
    for trait in val:
        options.append({"value": trait, "label": trait})

with open("./../public/json/_options.json", "w") as handler:
    json.dump(options, handler)