import json
import re
from collections import Counter
from pathlib import Path

path = Path('/home/ubuntu/ai-tools-directory-recovery/client/src/lib/toolCatalog.ts')
text = path.read_text()
start = text.index('= [', text.index('export const directoryTools')) + 2
end = text.index('\n];', start) + 2
items = json.loads(text[start:end])

print('TOTAL', len(items))
print('SOURCE_CATEGORY', Counter(item.get('sourceCategory') for item in items).most_common())
print('SOURCE', Counter(item.get('source') for item in items).most_common(20))
print('CATEGORY', Counter(item.get('category') for item in items).most_common())

model_words = ('model', 'llama', 'mistral', 'hermes', 'qwen', 'gemma', 'mixtral', 'phi-', 'deepseek-r')
wrapper_words = ('desktop', 'macgpt', 'quickgpt', 'chatterbox', 'writemage', 'palettebrain', 'machato', 'wondergpt', 'petey', 'intellibar', 'chatbox')
models = [item for item in items if any(word in (item['name'] + ' ' + item['description']).lower() for word in model_words)]
wrappers = [item for item in items if any(word in (item['name'] + ' ' + item['description']).lower() for word in wrapper_words) or 'awesome-chatgpt' in item['source'].lower()]
print('MODEL_LIKE', len(models))
print('WRAPPER_LIKE', len(wrappers))
print('SAMPLE', [(item['name'], item['source'], item['url']) for item in items[:20]])
