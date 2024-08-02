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
		var n, m int
		fmt.Fscan(in, &m, &n)

		resource_freq := make([][][]int, n*m)
		resource_coords := make([][][]int, 10)

		city := make([][][]int, m)
		for i := range city {
			city[i] = make([][]int, n)
		}

		var k int
		fmt.Fscan(in, &k)

		for j := 0; j < k; j++ {
			var r int
			fmt.Fscan(in, &r)
			idx := r - 1
			
			if resource_freq[idx] == nil {
				resource_freq[idx] = make([][]int, 0)
			}

			resource_coords[j] = make([][]int, 0)

			for ; r > 0; r-- {
				var x, y int
				fmt.Fscan(in, &x, &y)
				if city[x-1][y-1] == nil {
					city[x-1][y-1] = make([]int, 0)
				}
				city[x-1][y-1] = append(city[x-1][y-1], j + 1)
				resource_freq[idx] = append(resource_freq[idx], []int{x-1, y-1})
				resource_coords[j] = append(resource_coords[j], []int{x-1, y-1})
			}
		}

		fmt.Fprintf(out, "%d\n", solve(k, city, resource_freq, resource_coords))
	}
}

type MinResource struct {
	resource int
	count int
	x int
	y int
}
/*
[      y 
	x [[]    [1] [1]] 
	  [[]    []  [2]] 
	  [[0 2] []  []]
]

// Test case 2
[
	[[2 4 7] [1]] 
	[[2]     [2 6]] 
	[[2 5]   [2 3]] 
	[[2 6 8] [5]] 
	[[]      [2 3 6]]
]

// Test case 3
[
	[[1 5] [1] [1 3] [1 5] [1 3]] 
	[[1 5 6 7] [1 2 4 5] [1 3] [1 4 5] [5]]
] 

1
2 5
7
9
1 3
1 2
1 1
2 1
2 4
2 3
1 4
2 2
1 5
1
2 2
3
1 5
1 3
2 3
2
2 2
2 4
6
2 1
2 2
1 4
2 5
1 1
2 4
1
2 1
1
2 1

Test case 1
[
	[[3]] [[]] [[]] [[]] [[]] [[2]] [[]] [[1 3 5]] [[]] [[4]]
]

1
10 1
5
1
8 1
1
6 1
2
1 1
8 1
1
10 1
1
8 1

// Test case 2
1
3 3
8
1
3 3
1
3 1
3
2 3
2 1
3 1
1
2 1
1
3 2
1
2 1
2
1 2
3 1
1
3 3

[
	[[]      [7] []] 
	[[3 4 6] []  [3]] 
	[[2 3 7] [5] [1 8]]
]
*/
func solve(k int, a [][][]int, resource_freq [][][]int, resource_coords [][][]int) int {
	fmt.Println(k, a)
	// fmt.Println()
	// fmt.Println("resource_freq", resource_freq)
	fmt.Println("resource_coords", resource_coords)

	// find min resource index
	sort.Slice(resource_coords, func(i, j int) bool {
		return len(resource_coords[i]) < len(resource_coords[j])
	})
	var minResouceIdx int
	for ii := range resource_coords {
		if len(resource_coords[ii]) == 0 {
			continue
		}
		minResouceIdx = ii
		break
	}

	minSquare := math.MaxInt32

	fmt.Println("minResouceIdx", resource_coords[minResouceIdx])

	for _, v := range resource_coords[minResouceIdx] {
		if len(v) == 0 {
			continue
		}

		visited := make(map[Point]*struct{}, 0)
		visited[Point{v[0], v[1]}] = &struct{}{}

		for i := minResouceIdx + 1; i < len(resource_coords); i++ {
			minDistance := math.MaxInt32
			var minPoint Point
			for _, v2 := range resource_coords[i] {
				if len(v2) == 0 {
					continue
				}
				distance := distance(v[0], v[1], v2[0], v2[1])
				if distance < minDistance {
					minDistance = distance
					minPoint = Point{v2[0], v2[1]}
				}
			}
			visited[minPoint] = &struct{}{}
			fmt.Println("resource_coords[i]", i, resource_coords[i])
			fmt.Println()
		}

		minX, minY, maxX, maxY := findBoundCoordinates(visited)
		square := (maxX - minX + 1) * (maxY - minY + 1)
		fmt.Println("square", square)
		minSquare = minInt(minSquare, square)
	}


	
	// freq_resources := make(map[int]*MinResource)
	// x := make([]map[int]*struct{}, len(a))
	// y := make([]map[int]*struct{}, len(a[0]))
	
	// mergedSet := make(map[int]*struct{})
	// visited := make(map[Point]*struct{}, 0)
	// for _, v := range resource_freq {
	// 	if v != nil {
	// 		sort.Slice(v, func(i, j int) bool {
	// 			if v[i][0] == v[j][0] {
	// 				return v[i][1] > v[j][1]
	// 			}
	// 			return v[i][0] > v[j][0]
	// 		})
	// 		for i := 0; i < len(v); i++ {
	// 			x, y := v[i][0], v[i][1]
	// 			for _, v := range a[x][y] {
	// 				// fmt.Println("a[x][y]", a[x][y], v)
	// 				mergedSet[v] = &struct{}{}
	// 			}

	// 			visited[Point{x, y}] = &struct{}{}
				
	// 			if len(mergedSet) == k {
	// 				minX, minY, maxX, maxY := findBoundCoordinates(visited)
	// 				// fmt.Println(minX + 1, minY + 1, maxX + 1, maxY + 1)
	// 				// fmt.Println("answer", (maxX - minX + 1) * (maxY - minY + 1))
	// 				return (maxX - minX + 1) * (maxY - minY + 1)
	// 			}
	// 		}
	// 	}
	// }

	// ====================================

	// for _, v := range resource_freq {
	// 	if v != nil {
	// 		sort.Slice(v, func(i, j int) bool {
	// 			if v[i][0] == v[j][0] {
	// 				return v[i][1] > v[j][1]
	// 			}
	// 			return v[i][0] > v[j][0]
	// 		})
	// 		counter := 2
	// 		prevX, prevY := -1, -1
	// 		for i := 0; i < len(v); i++ {
	// 			// fmt.Println(v[i])
	// 			if prevX != v[i][0] || prevY != v[i][1] {
	// 				minSquare = minInt(minSquare, find(k, a, v[i][0], v[i][1], nil, nil))
	// 			}
	// 			prevX, prevY = v[i][0], v[i][1]
	// 			counter--
	// 			if 0 == counter {
	// 				break
	// 			}
	// 			// fmt.Println("minSquare", minSquare)
	// 			// return find(k, a, v[i][0], v[i][1], nil, nil)
	// 		}
	// 		break
	// 	}
	// }

	// ====================================

	// for i := range a {
	// 	for j := range a[i] {
	// 		for _, v := range a[i][j] {
	// 			if _, ok := freq_resources[v]; !ok {
	// 				freq_resources[v] = &MinResource{resource: v, count: 0, x: i, y: j}
	// 			}
	// 			freq_resources[v].count++
	// 		}
	// 	}
	// }

	// min_resource := &MinResource{resource: 0, count: math.MaxInt32, x: 0, y: 0}

	// for _, v := range freq_resources {
	// 	if v.count < min_resource.count {
	// 		min_resource = v
	// 	}
	// }



	// for i := range x {
	// 	for j := range y {
	// 		// merge x[i] and y[j]
	// 		mergedSet := make(map[int]*struct{})
	// 		for k := range x[i] {
	// 			mergedSet[k] = &struct{}{}
	// 		}
	// 		for k := range y[j] {
	// 			mergedSet[k] = &struct{}{}
	// 		}
	// 		fmt.Println(i, j, len(mergedSet), k)
	// 		if len(mergedSet) == k {
	// 			if i == 0 && j == 0 && len(a[i][j]) != k {
	// 				continue
	// 			}
	// 			// print mergedSet keys
	// 			fmt.Println(i, j, mergedSet, (i + 1) * (j + 1))
	// 			for key := range mergedSet {
	// 				fmt.Println(key)
	// 			}
	// 			minSquare = minInt(minSquare, (i + 1) * (j + 1))
	// 		}
	// 	}
	// }

	// if minSquare == math.MaxInt32 {
	// 	fmt.Println("\n", k, a)
	// }

	return minSquare
}

type Point struct {
	x int
	y int
}

func find(k int, a [][][]int, x int, y int, mergedSet map[int]*struct{}, visited map[Point]*struct{}) int {
	// fmt.Println(x, y, a[x][y], "visited", len(visited), &visited)
	if mergedSet == nil {
		mergedSet = make(map[int]*struct{}, 0)
	}
	if visited == nil {
		visited = make(map[Point]*struct{}, 0)
	}

	visited[Point{x, y}] = &struct{}{}

	for _, v := range a[x][y] {
		// fmt.Println("a[x][y]", a[x][y], v)
		mergedSet[v] = &struct{}{}
	}

	fmt.Println("x = ", x, ", y = ", y, a[x][y], " visited: ", len(visited))
	printMap(mergedSet)

	if len(mergedSet) == k {
		minX, minY, maxX, maxY := findBoundCoordinates(visited)
		// fmt.Println(minX + 1, minY + 1, maxX + 1, maxY + 1)
		fmt.Println("answer", (maxX - minX + 1) * (maxY - minY + 1))
		return (maxX - minX + 1) * (maxY - minY + 1)
	}

	minSquare := math.MaxInt32

	if x - 1 >= 0 && visited[Point{x - 1, y}] == nil {
		minSquare = minInt(minSquare, find(k, a, x - 1, y, copyMap(mergedSet), copyPointMap(visited)))
	}
	if x + 1 < len(a) && visited[Point{x + 1, y}] == nil {
		minSquare = minInt(minSquare, find(k, a, x + 1, y, copyMap(mergedSet), copyPointMap(visited)))
	}
	if y - 1 >= 0 && visited[Point{x, y - 1}] == nil {
		minSquare = minInt(minSquare, find(k, a, x, y - 1, copyMap(mergedSet), copyPointMap(visited)))
	}
	if y + 1 < len(a[0]) && visited[Point{x, y + 1}] == nil {
		minSquare = minInt(minSquare, find(k, a, x, y + 1, copyMap(mergedSet), copyPointMap(visited)))
	}

	return minSquare
}

func findBoundCoordinates(visited map[Point]*struct{}) (int, int, int, int) {
	minX, minY := math.MaxInt32, math.MaxInt32
	maxX, maxY := 0, 0
	for k, _ := range visited {
		fmt.Println("findBoundCoordinates", k)
		minX = minInt(minX, k.x)
		minY = minInt(minY, k.y)
		maxX = maxInt(maxX, k.x)
		maxY = maxInt(maxY, k.y)
	}
	return minX, minY, maxX, maxY
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func copyMap(m map[int]*struct{}) map[int]*struct{} {
	newMap := make(map[int]*struct{})
	for k, v := range m {
		newMap[k] = v
	}
	return newMap
}

func copyPointMap(m map[Point]*struct{}) map[Point]*struct{} {
	newMap := make(map[Point]*struct{})
	for k, v := range m {
		newMap[k] = v
	}
	return newMap
}

func printMap(m map[int]*struct{}) {
	fmt.Print("map: size: ", len(m), ", keys: ")
	for k, _ := range m {
		fmt.Print(k, ", ")
	}
	fmt.Println()
}

// distance calculates the Euclidean distance between two points (x1, y1) and (x2, y2)
func distance(x1, y1, x2, y2 int) int {
    return int(math.Sqrt(math.Pow(float64(x2-x1), 2) + math.Pow(float64(y2-y1), 2)))
}
