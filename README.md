# interview-preparation

# JS

Run JS files:
node --expose-gc ./SpotStoreImpl.js

Transpile TS -> JS files:
tsc --lib es2015,dom ./SpotStoreImpl.ts

Run TS
1: creates JS file:
tsc greet.ts | node greet.js

2:
ts-node -O '{"lib": [ "es2015", "dom" ]}' ./SpotStoreImpl.ts

### Started course to lear algo: https://stepik.org/course/217/info
https://stepik.org/lesson/9173/step/3
JavaScript (Node.js v10.13.0)
Run command: 
```
node --max-old-space-size={memory limit}
// Examples:
node --max-old-space-size=1 index.js #increase to 1Mb
node --max-old-space-size=64 index.js #increase to 64Mb
node --max-old-space-size=1024 index.js #increase to 1gb
```
