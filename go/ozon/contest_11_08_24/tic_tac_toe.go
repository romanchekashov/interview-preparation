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

	var t int
	fmt.Fscan(in, &t)

	for i := 0; i < t; i++ {
		var k, n, m int
		fmt.Fscan(in, &k)
		fmt.Fscan(in, &n, &m)

		table := make([][]rune, n)
		for j := 0; j < n; j++ {
			var s string
			fmt.Fscan(in, &s)
			table[j] = []rune(s)
			//for l := 0; l < m; l++ {
			//	fmt.Fscan(in, &table[j][l])
			//}
		}

		fmt.Fprintf(out, "%s\n", solve(k, n, m, table))
	}
}

type Direction string

const (
	Down      Direction = "DOWN"
	Right     Direction = "RIGHT"
	Diagonal  Direction = "DIAGONAL"
	Diagonal2 Direction = "DIAGONAL2"
	Diagonal3 Direction = "DIAGONAL3"
	Diagonal4 Direction = "DIAGONAL4"
)

func solve(k int, rows int, cols int, table [][]rune) string {
	//fmt.Println(k, rows, cols, table)
	MARK_X := rune('X')
	MARK_0 := rune('O')
	MARK_DOT := rune('.')

	canWinByAddingOneXOrAlreadyWon := func(i int, j int, kk int, dir Direction, wonMark rune) (bool, bool) {
		kk--
		missed := 0
		countX := 1
		for ; kk > 0; kk-- {
			switch dir {
			case Down:
				if j+1 < cols {
					if table[i][j+1] == wonMark {
						j++
						countX++
					} else if table[i][j+1] == MARK_DOT {
						missed++
						j++
						if missed > 1 {
							return false, false
						}
					} else {
						return false, false
					}
				}
			case Right:
				if i+1 < rows {
					if table[i+1][j] == wonMark {
						i++
						countX++
					} else if table[i+1][j] == MARK_DOT {
						missed++
						i++
						if missed > 1 {
							return false, false
						}
					} else {
						return false, false
					}
				}
			case Diagonal:
				if i+1 < rows && j+1 < cols {
					if table[i+1][j+1] == wonMark {
						i++
						j++
						countX++
					} else if table[i+1][j+1] == MARK_DOT {
						missed++
						i++
						j++
						if missed > 1 {
							return false, false
						}
					} else {
						return false, false
					}
				}
			case Diagonal2:
				if i+1 < rows && j-1 >= 0 {
					if table[i+1][j-1] == wonMark {
						i++
						j--
						countX++
					} else if table[i+1][j-1] == MARK_DOT {
						missed++
						i++
						j--
						if missed > 1 {
							return false, false
						}
					} else {
						return false, false
					}
				}
			case Diagonal3:
				if i-1 >= 0 && j+1 < cols {
					if table[i-1][j+1] == wonMark {
						i--
						j++
						countX++
					} else if table[i-1][j+1] == MARK_DOT {
						missed++
						i--
						j++
						if missed > 1 {
							return false, false
						}
					} else {
						return false, false
					}
				}
			case Diagonal4:
				if i-1 >= 0 && j-1 >= 0 {
					if table[i-1][j-1] == wonMark {
						i--
						j--
						countX++
					} else if table[i-1][j-1] == MARK_DOT {
						missed++
						i--
						j--
						if missed > 1 {
							return false, false
						}
					} else {
						return false, false
					}
				}
			}
		}
		//fmt.Println(wonMark, string(wonMark), x, y, table[x][y], dir, missed, countX, k, "canWin", missed == 1, "won", missed == 0 && countX == k)
		return missed == 1 && countX == k-1, missed == 0 && countX == k
	}

	canWin := false
	for i := 0; i < len(table); i++ {
		for j := 0; j < len(table[i]); j++ {
			if table[i][j] == MARK_X {
				canWin2, won := canWinByAddingOneXOrAlreadyWon(i, j, k, Down, MARK_X)
				if canWin2 {
					canWin = true
				}
				if won {
					return "NO"
				}

				canWin2, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Right, MARK_X)
				if canWin2 {
					canWin = true
				}
				if won {
					return "NO"
				}

				canWin2, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Diagonal, MARK_X)
				if canWin2 {
					canWin = true
				}
				if won {
					return "NO"
				}

				canWin2, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Diagonal2, MARK_X)
				if canWin2 {
					canWin = true
				}
				if won {
					return "NO"
				}

				canWin2, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Diagonal3, MARK_X)
				if canWin2 {
					canWin = true
				}
				if won {
					return "NO"
				}

				canWin2, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Diagonal4, MARK_X)
				if canWin2 {
					canWin = true
				}
				if won {
					return "NO"
				}
			} else if table[i][j] == MARK_0 {
				_, won := canWinByAddingOneXOrAlreadyWon(i, j, k, Down, MARK_0)
				if won {
					return "NO"
				}
				_, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Right, MARK_0)
				if won {
					return "NO"
				}
				_, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Diagonal, MARK_0)
				if won {
					return "NO"
				}
				_, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Diagonal2, MARK_0)
				if won {
					return "NO"
				}
				_, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Diagonal3, MARK_0)
				if won {
					return "NO"
				}
				_, won = canWinByAddingOneXOrAlreadyWon(i, j, k, Diagonal4, MARK_0)
				if won {
					return "NO"
				}
			}
		}
	}

	if canWin {
		return "YES"
	}
	return "NO"
}
