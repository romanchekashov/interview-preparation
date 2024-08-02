package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"sort"
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
		var n, k, m int
		fmt.Fscan(in, &n, &k)
		fmt.Fscan(in, &m)
		
		a := make([]int, m)
		for j := 0; j < m; j++ {
			fmt.Fscan(in, &a[j])
		}

		fmt.Fprintf(out, "%d\n", solve(n, k, a))
	}
}

func solve(n int, k int, a []int) int {

	sort.Slice(a, func(i, j int) bool {
		return a[i] > a[j]
	})

	for i := 0; i < len(a); i++ {
		a[i] = int(math.Pow(2, float64(a[i])))
	}
	// fmt.Println(n, k, a)

	transfers := int(0)
	visited := make([]bool, len(a))
	visitedCount := 0
	startIdx := 0

	for len(a) != visitedCount {
		m := n
		for m > 0 {
			j := k
			isSetStartIdx := false
			for i := startIdx; i < len(a); i++ {
				if !visited[i] {
					if j >= a[i] {
						j -= a[i]
						visited[i] = true
						visitedCount++
					} else if !isSetStartIdx {
						startIdx = i
						isSetStartIdx = true
					}
				}
			}
			m--
		}
		transfers++
		// fmt.Printf("len(visitedSet): %d, transfers: %d\n", len(visitedSet), transfers)
	}
	return transfers
}
