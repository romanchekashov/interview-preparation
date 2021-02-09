const { assert, measurePerformance } = require("./Utils");

/**
 * https://www.ics.uci.edu/~eppstein/161/960229.html
 * 
 * https://interviewing.io/recordings/Javascript-Google-3/
 */

/**
 * Recursive LCS:

    int lcs_length(char * A, char * B)
    {
	if (*A == '\0' || *B == '\0') return 0;
	else if (*A == *B) return 1 + lcs_length(A+1, B+1);
	else return max(lcs_length(A+1,B), lcs_length(A,B+1));
    }

    This is a correct solution but it's very time consuming. 
    For example, if the two strings have no matching characters, so the last line always gets executed, 
    the the time bounds are binomial coefficients, which (if m=n) are close to 2^n.
 */
function longestCommonSubsequencesRecursive(s1, s2) {
  if (s1.length === 0 || s2.length === 0) return "";

  if (s1[0] === s2[0])
    return (
      s1[0] +
      longestCommonSubsequencesRecursive(s1.substring(1), s2.substring(1))
    );

  const first = longestCommonSubsequencesRecursive(s1.substring(1), s2);
  const second = longestCommonSubsequencesRecursive(s1, s2.substring(1));
  return first.length > second.length ? first : second;
}

/**
 * Memoizing LCS:

    char * A;
    char * B;
    array L;

    int lcs_length(char * AA, char * BB)
    {
	A = AA; B = BB;
	allocate storage for L;
	for (i = 0; i <= m; i++)
	    for (j = 0; j <= m; j++)
		L[i,j] = -1;

	return subproblem(0, 0);
    }

    int subproblem(int i, int j)
    {
	if (L[i,j] < 0) {
	    if (A[i] == '\0' || B[j] == '\0') L[i,j] = 0;
	    else if (A[i] == B[j]) L[i,j] = 1 + subproblem(i+1, j+1);
	    else L[i,j] = max(subproblem(i+1, j), subproblem(i, j+1));
	}
	return L[i,j];
    }
    
    Time analysis: each call to subproblem takes constant time. 
    We call it once from the main routine, and at most twice every time we fill in an entry of array L. 
    There are (m+1)(n+1) entries, so the total number of calls is at most 2(m+1)(n+1)+1 and the time is O(mn).

    As usual, this is a worst case analysis. The time might sometimes better, if not all array entries get filled out. 
    For instance if the two strings match exactly, we'll only fill in diagonal entries and the algorithm will be fast. 
 */
function longestCommonSubsequencesRecursiveMemoization(s1, s2) {
  let memo = [];
  for (let i = 0; i <= s1.length; i++) {
    memo[i] = [];
  }

  function lcsRecursive(s1Idx, s2Idx) {
    if (memo[s1Idx][s2Idx] === undefined) {
      if (s1[s1Idx] === undefined || s2[s2Idx] === undefined) {
        memo[s1Idx][s2Idx] = "";
      } else if (s1[s1Idx] === s2[s2Idx]) {
        memo[s1Idx][s2Idx] = s1[s1Idx] + lcsRecursive(s1Idx + 1, s2Idx + 1);
      } else {
        const first = lcsRecursive(s1Idx + 1, s2Idx);
        const second = lcsRecursive(s1Idx, s2Idx + 1);
        memo[s1Idx][s2Idx] = first.length > second.length ? first : second;
      }
    }
    return memo[s1Idx][s2Idx];
  }

  const result = lcsRecursive(0, 0);
  return result;
}

/**
 * Iterative LCS:

    int lcs_length(char * A, char * B)
    {
	allocate storage for array L;
	for (i = m; i >= 0; i--)
	    for (j = n; j >= 0; j--)
	    {
		if (A[i] == '\0' || B[j] == '\0') L[i,j] = 0;
		else if (A[i] == B[j]) L[i,j] = 1 + L[i+1, j+1];
		else L[i,j] = max(L[i+1, j], L[i, j+1]);
	    }
	return L[0,0];
    }

    Advantages of this method include the fact that iteration is usually faster than recursion, 
    we don't need to initialize the matrix to all -1's, and we save three if statements per iteration 
    since we don't need to test whether L[i,j], L[i+1,j], and L[i,j+1] have already been computed 
    (we know in advance that the answers will be no, yes, and yes). 
    One disadvantage over memoizing is that this fills in the entire array even when 
    it might be possible to solve the problem by looking at only a fraction of the array's cells 
 */
function longestCommonSubsequencesIterative(s1, s2) {
  const memo = [];

  for (let i = s1.length; i >= 0; i--) {
    if (i <= s1.length - 2) {
      memo[i] = memo[i + 2];
    } else {
      memo[i] = [];
    }

    for (let j = s2.length; j >= 0; j--) {
      if (s1[i] === undefined || s2[j] === undefined) {
        memo[i][j] = "";
      } else if (s1[i] === s2[j]) {
        memo[i][j] = s1[i] + (memo[i + 1][j + 1] || "");
      } else {
        const first = memo[i + 1][j] || "";
        const second = memo[i][j + 1] || "";
        memo[i][j] = first.length > second.length ? first : second;
      }
    }
  }
  return memo[0][0];
}

function lcsIterative(s1, s2) {
  const memo = [];

  function lcsLength() {
    for (let i = s1.length; i >= 0; i--) {
      memo[i] = [];

      for (let j = s2.length; j >= 0; j--) {
        if (s1[i] === undefined || s2[j] === undefined) {
          memo[i][j] = 0;
        } else if (s1[i] === s2[j]) {
          memo[i][j] = 1 + (memo[i + 1][j + 1] || 0);
        } else {
          const first = memo[i + 1][j] || 0;
          const second = memo[i][j + 1] || 0;
          memo[i][j] = first.length > second.length ? first : second;
        }
      }
    }

    return memo[0][0];
  }

  function getSequence() {
    let s = "";
    let i = 0;
    let j = 0;

    while (i < s1.length && j < s2.length) {
      if (s1[i] === s2[j]) {
        s += s1[i];
        i++;
        j++;
      } else if (memo[i + 1][j] >= memo[i][j + 1]) {
        i++;
      } else j++;
    }

    return s;
  }

  lcsLength();
  const sequence = getSequence();
  return sequence;
}

const solutions = [
  longestCommonSubsequencesRecursive,
  longestCommonSubsequencesRecursiveMemoization,
  longestCommonSubsequencesIterative,
  lcsIterative,
];

solutions.forEach((solution) => {
  console.log(`Run tests for: ${solution.name}`);
  measurePerformance(() => {
    assert("AC", solution("ArtyhC", "BACBAD"));
    assert("ABAD", solution("ABAZDC", "BACBAD"));
    assert("GTAB", solution("AGGTAB", "GXTXAYB"));
    assert("aa", solution("aaaa", "aa"));
    assert("", solution("", "..."));
    assert("ABBA", solution("ABBA", "ABCABA"));
    assert("", solution("qwertyuiop", "asdfghjklzxcvbnm"));
  });
});
