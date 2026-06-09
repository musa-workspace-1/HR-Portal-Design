const fs = require('fs');

const logPath = 'C:\\Users\\Agent Anonymous\\.gemini\\antigravity-ide\\brain\\c43ff1e4-d622-4d7b-b426-40be1432e523\\.system_generated\\logs\\transcript.jsonl';
const outPath = 'C:\\Users\\Agent Anonymous\\Desktop\\New HR  Portal Design\\reference.html';

const lines = fs.readFileSync(logPath, 'utf-8').split('\n').filter(Boolean).reverse();
for (const line of lines) {
    try {
        const data = JSON.parse(line);
        if (data.type === 'USER_INPUT' && data.content && data.content.includes('System Instruction & Reskin Workflow:')) {
            fs.writeFileSync(outPath, data.content, 'utf-8');
            console.log('Extracted reference.html');
            process.exit(0);
        }
    } catch (e) {
    }
}
console.log('Could not find the message.');
