import json
import os

log_path = r"C:\Users\Agent Anonymous\.gemini\antigravity-ide\brain\c43ff1e4-d622-4d7b-b426-40be1432e523\.system_generated\logs\transcript.jsonl"
out_path = r"C:\Users\Agent Anonymous\Desktop\New HR  Portal Design\reference.html"

found = False
with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for line in reversed(lines):
        try:
            data = json.loads(line)
            if data.get('type') == 'USER_INPUT' and 'System Instruction & Reskin Workflow:' in data.get('content', ''):
                content = data['content']
                # Extract everything between ''' <!DOCTYPE html> and the end if possible, or just dump the whole content
                with open(out_path, 'w', encoding='utf-8') as out:
                    out.write(content)
                print("Extracted reference.html")
                found = True
                break
        except Exception as e:
            pass

if not found:
    print("Could not find the message.")
