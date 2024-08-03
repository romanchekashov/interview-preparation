package pass_by_value_or_reference

import (
	"fmt"
	"testing"
	"time"
)

const ONE_MILLION = 1000000
const execTimes = ONE_MILLION

func TestEditBool(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassIntPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := true
	fmt.Printf("passBool: %t \n", v)
	editBool(v)
	fmt.Printf("passBool: %t \n", v)

	for i := 0; i < execTimes; i++ {
		v = true
        editBool(v)
    }
}

func TestEditBoolPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassIntPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := true
	fmt.Printf("passBoolPtr: %t \n", v)
	editBoolPtr(&v)
	fmt.Printf("passBoolPtr: %t \n", v)

	for i := 0; i < execTimes; i++ {
		v = true
        editBoolPtr(&v)
    }
}

func TestEditInt(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassInt: Time took: %v\n\n", time.Since(t1)) }()

	v := 5
	fmt.Printf("passInt: %d \n", v)
	editInt(v)
	fmt.Printf("passInt: %d \n", v)

	for i := 0; i < execTimes; i++ {
		v = 5
		editInt(v)
	}
}

func TestEditIntPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassIntPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := 5
	fmt.Printf("passIntPtr: %d \n", v)
	editIntPtr(&v)
	fmt.Printf("passIntPtr: %d \n", v)

	for i := 0; i < execTimes; i++ {
		v = 5
		editIntPtr(&v)
	}
}

func TestEditString(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassString: Time took: %v\n\n", time.Since(t1)) }()

	v := "original"
	fmt.Printf("passString: %s \n", v)
	editString(v)
	fmt.Printf("passString: %s \n", v)

	for i := 0; i < execTimes; i++ {
		v = "original"
		editString(v)
	}
}

func TestEditStringPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassStringPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := "original"
	fmt.Printf("passStringPtr: %s \n", v)
	editStringPtr(&v)
	fmt.Printf("passStringPtr: %s \n", v)

	for i := 0; i < execTimes; i++ {
		v = "original"
		editStringPtr(&v)
	}
}

func TestEditArray(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassArray: Time took: %v\n\n", time.Since(t1)) }()

	v := [3]int{1, 2, 3}
	fmt.Printf("editArray: %v -> ", v)
	editArray(v)
	fmt.Printf("%v \n", v)

	for i := 0; i < execTimes; i++ {
		v = [3]int{1, 2, 3}
		editArray(v)
	}
}

func TestEditArrayPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassArrayPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := [3]int{1, 2, 3}
	fmt.Printf("editArrayPtr: %v -> ", v)
	editArrayPtr(&v)
	fmt.Printf("%v \n", v)

	for i := 0; i < execTimes; i++ {
		v = [3]int{1, 2, 3}
		editArrayPtr(&v)
	}
}

func TestReassignArrayPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestReassignArrayPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := [3]int{1, 2, 3}
	fmt.Printf("reassignArrayPtr: (%p) %v -> ", &v, v)
	reassignArrayPtr(&v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = [3]int{1, 2, 3}
		reassignArrayPtr(&v)
	}
}

func TestEditSlice(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassSlice: Time took: %v\n\n", time.Since(t1)) }()

	v := []int{1, 2, 3}
	fmt.Printf("editSlice: (%p) %v -> ", &v, v)
	editSlice(v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = []int{1, 2, 3}
		editSlice(v)
	}
}

func TestEditSlicePtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassSlicePtr: Time took: %v\n\n", time.Since(t1)) }()

	v := []int{1, 2, 3}
	fmt.Printf("editSlicePtr: (%p) %v -> ", &v, v)
	editSlicePtr(&v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = []int{1, 2, 3}
		editSlicePtr(&v)
	}
}

func TestAppendSlice(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestAppendSlice: Time took: %v\n\n", time.Since(t1)) }()

	v := []int{1, 2, 3}
	fmt.Printf("appendSlice: (%p) %v -> ", &v, v)
	appendSlice(v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = []int{1, 2, 3}
		appendSlice(v)
	}
}

func TestAppendSlicePtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestAppendSlicePtr: Time took: %v\n\n", time.Since(t1)) }()

	v := []int{1, 2, 3}
	fmt.Printf("appendSlicePtr: (%p) %v -> ", &v, v)
	appendSlicePtr(&v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = []int{1, 2, 3}
		appendSlicePtr(&v)
	}
}

func TestEditMap(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassMap: Time took: %v\n\n", time.Since(t1)) }()

	v := map[string]int{"a": 1, "b": 2, "c": 3}
	fmt.Printf("editMap: (%p) %v -> ", &v, v)
	editMap(v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = map[string]int{"a": 1, "b": 2, "c": 3}
		editMap(v)
	}
}

func TestEditMapPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassMapPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := map[string]int{"a": 1, "b": 2, "c": 3}
	fmt.Printf("editMapPtr: (%p) %v -> ", &v, v)
	editMapPtr(&v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = map[string]int{"a": 1, "b": 2, "c": 3}
		editMapPtr(&v)
	}
}

func TestAppendMap(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestAppendMap: Time took: %v\n\n", time.Since(t1)) }()

	v := map[string]int{"a": 1, "b": 2, "c": 3}
	fmt.Printf("appendMap: (%p) %v -> ", &v, v)
	appendMap(v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = map[string]int{"a": 1, "b": 2, "c": 3}
		appendMap(v)
	}
}

func TestAppendMapPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestAppendMapPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := map[string]int{"a": 1, "b": 2, "c": 3}
	fmt.Printf("appendMapPtr: (%p) %v -> ", &v, v)
	appendMapPtr(&v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = map[string]int{"a": 1, "b": 2, "c": 3}
		appendMapPtr(&v)
	}
}

func TestEditStruct(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassStruct: Time took: %v\n\n", time.Since(t1)) }()

	v := struct{ A int }{1}
	fmt.Printf("editStruct: (%p) %v -> ", &v, v)
	editStruct(v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = struct{ A int }{1}
		editStruct(v)
	}
}

func TestEditStructPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassStructPtr: Time took: %v\n\n", time.Since(t1)) }()

	v := struct{ A int }{1}
	fmt.Printf("editStructPtr: (%p) %v -> ", &v, v)
	editStructPtr(&v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = struct{ A int }{1}
		editStructPtr(&v)
	}
}

func TestEditInterface(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassInterface: Time took: %v\n\n", time.Since(t1)) }()

	v := interface{}(1)
	fmt.Printf("editInterface: (%p) %v -> ", &v, v)
	editInterface(v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = interface{}(1)
		editInterface(v)
	}
}

func TestEditInterfacePtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassInterfacePtr: Time took: %v\n\n", time.Since(t1)) }()

	v := interface{}(1)
	fmt.Printf("editInterfacePtr: (%p) %v -> ", &v, v)
	editInterfacePtr(&v)
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		v = interface{}(1)
		editInterfacePtr(&v)
	}
}

func TestEditChannel(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassChannel: Time took: %v\n\n", time.Since(t1)) }()

	ch := make(chan int, 1)
	fmt.Printf("editChannel: (%p) %v -> ", &ch, ch)
	editChannel(ch)
	v := <-ch
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		ch = make(chan int, 1)
		editChannel(ch)
		v = <-ch
	}
}

func TestEditChannelPtr(t *testing.T) {
	t1 := time.Now()
	defer func() { fmt.Printf("TestPassChannelPtr: Time took: %v\n\n", time.Since(t1)) }()

	ch := make(chan int, 1)
	fmt.Printf("editChannelPtr: (%p) %v -> ", &ch, ch)
	editChannelPtr(&ch)
	v := <-ch
	fmt.Printf("(%p) %v \n", &v, v)

	for i := 0; i < execTimes; i++ {
		ch = make(chan int, 1)
		editChannelPtr(&ch)
		v = <-ch
	}
}