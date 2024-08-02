package main

import (
	"bufio"
	"encoding/json"
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

	var result []interface{}

	var t int
	fmt.Fscan(in, &t)

	for i := 0; i < t; i++ {
		var n int
		fmt.Fscan(in, &n)

		_, err := in.ReadString('\n')
		if err != nil {
			break
		}

		var jsonString string
		for ; n > 0; n-- {
			line, err := in.ReadString('\n')
			if err != nil {
				break
			}
			// fmt.Println("n:", n, "line:", line)
			jsonString += line
		}

		result = append(result, solve(jsonString))
	}

	b, err := json.Marshal(result)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Fprintf(out, "%s\n", b)
}

func solve(jsonString string) interface{} {
	var jsonObject interface{}
    err := json.Unmarshal([]byte(jsonString), &jsonObject)
    if err != nil {
        // fmt.Println("Error unmarshalling JSON:", err)
        return ""
    }

	res := interface{}(nil)

    switch v := jsonObject.(type) {
    case map[string]interface{}:
        // fmt.Printf("Mapped JSON Object: %+v\n", v)
		res = checkObjectForEmpty(v)
    case []interface{}:
		// fmt.Printf("Mapped JSON Array: %+v\n", v)
		res = checkArrayForEmpty(v)
    default:
        // fmt.Println("Unknown JSON type")
        return ""
    }
	
	return res
}

func checkArrayForEmpty(obj []interface{}) []interface{} {
	res := []interface{}{}

	for _, val := range obj {
		if val == nil || IsEmpty(val) {
			continue
		}

		switch v := val.(type) {
        case []interface{}:
			new_val := checkArrayForEmpty(v)
            if len(new_val) != 0 {
                res = append(res, new_val)
            }
        case map[string]interface{}:
			new_val := checkObjectForEmpty(v)
            if len(new_val) != 0 {
                res = append(res, new_val)
            }
		case string:
            res = append(res, val)
        }
	}

	return res
}

func checkObjectForEmpty(obj map[string]interface{}) map[string]interface{} {
	res := map[string]interface{}{}

	for key, val := range obj {
		if val == nil || IsEmpty(val) {
			continue
		}

		switch v := val.(type) {
        case []interface{}:
			new_val := checkArrayForEmpty(v)
            if len(new_val) != 0 {
                res[key] = new_val
            }
        case map[string]interface{}:
			new_val := checkObjectForEmpty(v)
            if len(new_val) != 0 {
                res[key] = new_val
            }
		case string:
            res[key] = val
        }
	}

	return res
}

func IsEmpty(obj interface{}) bool {
	if obj == nil {
		return true
	}

	switch v := obj.(type) {
	case []interface{}:
		if len(v) == 0 {
			return true
		}
		return false
	case map[string]interface{}:
		if len(v) == 0 {
			return true
		}
		return false
	default:
		return false
	}
}

func isString(obj interface{}) bool {
	switch obj.(type) {
	case string:
		return true
	default:
		return false
	}
}