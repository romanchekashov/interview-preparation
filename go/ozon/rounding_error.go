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

	/*
		Первая строка содержит целое число t (1 ≤ t ≤ 10^5) — количество наборов входных данных.
		Далее следует описание наборов входных данных.
		Первая строка каждого набора входных данных содержит два целых числа n и p
		Следующие n строк каждого набора содержат по одному целому числу a[i]
	*/
	var t int
	fmt.Fscan(in, &t)

	for i := 0; i < t; i++ {
		var n, p int
		fmt.Fscan(in, &n, &p)
		
		a := make([]int, n)
		for j := 0; j < n; j++ {
			fmt.Fscan(in, &a[j])
		}

		fmt.Fprintf(out, "%.2f\n", solve(a, p))
	}
}

func solve(a []int, p int) float32 {
	commission := int(0)
	for i := 0; i < len(a); i++ {
		commission += (a[i] * p) % 100
		// fmt.Printf("price: %d, commission: %d\n", a[i], commission)
	}
	return float32(commission) / 100
}
