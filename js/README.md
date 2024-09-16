JavaScript
---

Run JavaScript files:
```shell
node --expose-gc ./SpotStoreImpl.js
```

Transpile TypeScript -> JavaScript files:
```shell
tsc --lib es2015,dom ./SpotStoreImpl.ts
```

Run TypeScript:
```shell
# 1: creates JS file:
tsc greet.ts | node greet.js
# 2:
ts-node -O '{"lib": [ "es2015", "dom" ]}' ./SpotStoreImpl.ts
```

- [Stepik: Алгоритмы: теория и практика. Методы](https://stepik.org/course/217/info)
- [Stepik: Language versions](https://stepik.org/lesson/9173/step/3)
- JavaScript (Node.js v18.17.1) Run command: 
```
node --max-old-space-size={memory limit}
// Examples:
node --max-old-space-size=3 index.js #increase to 3Mb - min to run programm
node --max-old-space-size=64 index.js #increase to 64Mb
node --max-old-space-size=1024 index.js #increase to 1gb
```
- Run command example:
```
node --expose-gc --max-old-space-size=64 index.js
```
