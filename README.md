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
