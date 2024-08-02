package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var in *bufio.Reader
	var out *bufio.Writer
	in = bufio.NewReader(os.Stdin)
	out = bufio.NewWriter(os.Stdout)
	defer out.Flush()
	// defer fmt.Println("Time took:", time.Since(time.Now()))

	var t int
	fmt.Fscan(in, &t)

	for i := 0; i < t; i++ {
		var n int
		fmt.Fscan(in, &n)

		a := make([]int, n)
		for j := 0; j < n; j++ {
			fmt.Fscan(in, &a[j])
		}

		fmt.Fprintf(out, "%d\n", solve(a))
	}
}

func solve(a []int) int {
	maxReqSequence := 0
	left := 0
	m := make(map[int]int)

	for right := 0; right < len(a); right++ {
		m[a[right]]++
		for ; len(m) > 2 ; {
			m[a[left]]--
			if m[a[left]] == 0 {
				delete(m, a[left])
			}
			left++
		}

		maxReqSequence = maxInt(maxReqSequence, right - left + 1)
	}
	return maxReqSequence
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}
