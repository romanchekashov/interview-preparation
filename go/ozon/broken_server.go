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
	frequencyMap := make(map[int]int)
	for i := 0; i < len(a); i++ {
		frequencyMap[a[i]]++
		i++
		n := a[i]
		for ; n > 0; n-- {
			i++
			frequencyMap[a[i]]++
		}
	}

	for k, v := range frequencyMap {
		if v == 1 {
			return k
		}
	}
	return 0
}
