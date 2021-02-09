function longestCommonSubseq(s1, s2) {
    let longest = "";
    let temp = "";

    for (let i = 0, j = 0; i < s1.length; i++) {

        for (; j < s2.length;) {
            if (s1[i] === s2[j++]) {
                temp += s1[i];
                break;
            }
        }  
        
        if (j === s2.length) {
            if (temp.length > longest.length) longest = temp;
            temp = "";
            j = 0;
        }
    }

    return longest;
}

assert("AC", longestCommonSubseq("ArtyhC", "BACBAD"))
assert("ABAD", longestCommonSubseq("ABAZDC", "BACBAD"))
assert("GTAB", longestCommonSubseq("AGGTAB", "GXTXAYB"))
assert("aa", longestCommonSubseq("aaaa", "aa"))
assert("", longestCommonSubseq("", "..."))
assert("ABBA", longestCommonSubseq("ABBA", "ABCABA"))

function assert(expected, actual) {
    if (expected !== actual) {
        console.error(`Assertion Error: \nExpected: ${expected} \nActual: ${actual}`);
    } 
}