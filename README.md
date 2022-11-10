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
node --max-old-space-size=3 index.js #increase to 3Mb - min to run programm
node --max-old-space-size=64 index.js #increase to 64Mb
node --max-old-space-size=1024 index.js #increase to 1gb
```
### Run command example:
```
node --expose-gc --max-old-space-size=64 index.js
```

### [Data Structures](js/datastructures/README.md)
### [LeetCode Patterns](js/leetcode/patterns/README.md)

### How to prepare to tech interview
- Solve more Medium problems on LeetCode: easy(20%) + medium(60%) + hard(20%)
- There will be no multiple submits during the interview! 
  - Submit failure in practice might be equal to rejection in the actual interview. 
  - Treat your submitted solution as the final solution in the interview! 
  - Try to find your own corner test cases to check before submitting. Recheck you solution and think that you can Submit ONLY ONCE!
- Interview lasts between 45 min to 1 hour! Try to reduce solving time for medium problem from 45 min to 30 min at least.
- Some LeetCode problems can be solved more optimal if input data would be sorted!
- If you want to make your life easier you should break your solution to helpers functions if possible. 
Advantages of HELPER FUNCTION:
  - You don't look like a newbie.
  - Makes debugging easy.
  - Pass interview with incomplete code.
- Pay attention to your interviewer! Use your interviewer wisely:
  - Clearly explain your solution
  - Pay attention to clarifying question
- Concentrate on your Circle of Control and keep improving yourself:
  - You prepared Data Structure Algorithms?
  - You practiced enough questions?
  - If you will be on time
- PRACTICE A LOT!!!
- https://www.youtube.com/watch?v=NW6CPOmlV2M

### How to solve LeetCode problems
- Just solve 145 problems from: https://leetcode.com/problem-list/top-interview-questions/?sorting=W3sic29ydE9yZGVyIjoiQVNDRU5ESU5HIiwib3JkZXJCeSI6IkRJRkZJQ1VMVFkifV0%3D&page=1
- Solve Easy problems then move to Medium
- The Approach:
  - 1 - come to solution in your brain(don't think about how to code, just think how to solve problem if you don't know programming). 
  Think 15 min before coding and come to solution!
  - 2 - code the solution
- If you cannot solve problem in 1 hour give up! Even if you solved the problem: 
Look at 3 most voted solutions and choose the easiest one. 
Understand solution and code it(NOT just read)!
- How to know then you are ready? If you can CONSTANTLY solve medium problems in 30-35 min then YOU ARE READY!
- https://youtu.be/xF554Tlzo-c

### How to prepare Data Structure Algorithms
- Mistakes:
  - Overlearning - learn firstly that asked more often on interviews
  - Overconfidence
  - It's not enough
- https://youtu.be/s2mYsPWzLjg

