from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "client/src/lib/expandedCatalog.ts"
TOOLS_PATH = ROOT / "client/src/lib/tools.ts"

text = CATALOG_PATH.read_text(encoding="utf-8")
start = text.index("export const expandedCatalog =")
start = text.index("[", start)
end = text.rfind("]") + 1
catalog = json.loads(text[start:end])

tools_text = TOOLS_PATH.read_text(encoding="utf-8")
seed_names = set(re.findall(r'^\s*\["([^"]+)",', tools_text, flags=re.MULTILINE))

resource_categories = {
    "Related Awesome Lists", "Related Resources", "Related lists", "Learning resources",
    "Articles", "Examples", "Overview", "Contributing to awesome-ai-tools",
    "Community", "Stable Diffusion resources", "Machine Learning", "Deep Learning",
    "Python", "JavaScript", "Go", "Academia",
}
resource_name_markers = (
    "awesome", "full list", "introduction", "guide", "course", "learning", "roadmap",
    "roadmap", "resources", "tutorial", "books", "how to learn", "landscape",
    "specialization", "stanford university", "prompt engineering guide",
)
model_markers = (
    "llama", "mistral", "hermes", "glm-", "qwen", "gemma", "deepseek", "phi-",
    "mixtral", "command r", "yi-", "falcon", "openchat", "nous hermes",
)

def is_resource(item: dict) -> bool:
    name = str(item.get("name", "")).lower()
    category = str(item.get("category", ""))
    if category in resource_categories:
        return True
    return any(marker in name for marker in resource_name_markers)

def is_model(item: dict) -> bool:
    name = str(item.get("name", "")).lower()
    category = str(item.get("category", ""))
    return category in {"Models", "Model libraries", "Fully Free Providers"} or any(marker in name for marker in model_markers)

actual_tools = [item for item in catalog if not is_resource(item) and not is_model(item)]
actual_plus_models = [item for item in catalog if not is_resource(item)]

print(json.dumps({
    "catalog_total": len(catalog),
    "seed_recommendations": len(seed_names),
    "resource_or_education": len(catalog) - len(actual_plus_models),
    "actual_tools_excluding_models": len(actual_tools),
    "actual_tools_including_models": len(actual_plus_models),
    "category_counts": Counter(item["category"] for item in catalog),
    "resource_examples": [item["name"] for item in catalog if is_resource(item)][:40],
    "model_examples": [item["name"] for item in catalog if is_model(item)][:40],
    "first_actual_tools": [item["name"] for item in actual_tools[:40]],
}, ensure_ascii=False, indent=2, default=dict))
