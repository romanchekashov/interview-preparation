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

	var n, m int
	fmt.Fscan(in, &n)
	s := make([]string, n)
	for j := 0; j < n; j++ {
		fmt.Fscan(in, &s[j])
	}

	fmt.Fscan(in, &m)
	t := make([]string, m)
	for j := 0; j < m; j++ {
		fmt.Fscan(in, &t[j])
	}

	result := solve(s, t)
	for _, v := range result {
		fmt.Fprintf(out, "%d\n", v)
	}
}

// TrieNode represents each node in the Trie
type TrieNode struct {
    children map[rune]*TrieNode
    isEnd    bool
}

// Trie represents the Trie itself
type Trie struct {
    root *TrieNode
}

// NewTrieNode initializes a new TrieNode
func NewTrieNode() *TrieNode {
    return &TrieNode{
        children: make(map[rune]*TrieNode),
        isEnd:    false,
    }
}

// NewTrie initializes a new Trie
func NewTrie() *Trie {
    return &Trie{
        root: NewTrieNode(),
    }
}

// Insert inserts a word into the Trie
func (t *Trie) Insert(word string) {
    node := t.root
    for _, char := range word {
        if _, ok := node.children[char]; !ok {
            node.children[char] = NewTrieNode()
        }
        node = node.children[char]
    }
    node.isEnd = true
}

// Search returns true if the word is in the Trie
func (t *Trie) Search(runes []rune) bool {
	node := t.root
	swapped := false
	for i := 0; i < len(runes); {
		if _, ok := node.children[runes[i]]; !ok {
			if !swapped && i + 1 < len(runes) {
				if _, ok := node.children[runes[i + 1]]; !ok {
					return false
				}

				node = node.children[runes[i + 1]]
				if _, ok := node.children[runes[i]]; !ok {
					return false
				}
				
				node = node.children[runes[i]]
				i += 2
				swapped = true
				continue
			}
			return false
		}
		node = node.children[runes[i]]
		i++
	}
	return node.isEnd
}

func (t *Trie) Search2(runes []rune, i int, node *TrieNode, canSwap bool) bool {
	if i >= len(runes) {
		return node.isEnd
	}

	if canSwap {
		if t.Search2(swapChars(runes, i, i + 1), i, node, false) {
			return true
		}
		swapChars(runes, i, i + 1)
	} else {
		for j := i ; j < len(runes); j++ {
			if _, ok := node.children[runes[j]]; !ok {
				return false
			}
			node = node.children[runes[j]]
		}
		return node.isEnd
	}

	if _, ok := node.children[runes[i]]; !ok {
		return false
	}
	node = node.children[runes[i]]

	return t.Search2(runes, i + 1, node, true)
}

type FreqMapKey struct {
	length int
	sumCharCodes int
}

func solve(existing []string, new_logins []string) [] int {
	freqMap := make(map[FreqMapKey]*Trie)
    
    for _, word := range existing {
		key := FreqMapKey{len(word), sumCharCodes(word)}
		trie, exists := freqMap[key]
		if !exists {
			trie = NewTrie()
			freqMap[key] = trie
		}
        trie.Insert(word)
    }

	result := make([]int, len(new_logins))
	for i, word := range new_logins {
		key := FreqMapKey{len(word), sumCharCodes(word)}
		if trie, exists := freqMap[key]; exists {
            runes := []rune(word)
            if trie.Search(runes) || trie.Search2(runes, 0, trie.root, true) {
                result[i] = 1
            }
        }
	}
	return result
}

func swapChars(runes []rune, i, j int) []rune {
    if i < 0 || j < 0 || i >= len(runes) || j >= len(runes) {
        return runes // Return the original string if indices are out of bounds
    }

    runes[i], runes[j] = runes[j], runes[i] // Swap the characters
    return runes // Convert the rune slice back to a string
}

var sumCharCodesCache = make(map[string]int)
func sumCharCodes(s string) int {
	if sum, ok := sumCharCodesCache[s]; ok {
		return sum
	}

    sum := 0
    for _, char := range s {
        sum += int(char)
    }
	sumCharCodesCache[s] = sum
    return sum
}
