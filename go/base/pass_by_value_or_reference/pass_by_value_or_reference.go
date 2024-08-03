package pass_by_value_or_reference

func editBool(v bool) {
	// fmt.Printf("editBool: %t ->", v)
	v = !v
	// fmt.Printf(" %t \n", v)
}

func editBoolPtr(v *bool) {
	// fmt.Printf("editBoolPtr: %t ->", *v)
	*v = !*v
	// fmt.Printf(" %t \n", *v)
}

func editInt(v int) {
	// fmt.Printf("editInt: %t ->", v)
	v = 10
	// fmt.Printf(" %t \n", v)
}

func editIntPtr(v *int) {
	// fmt.Printf("editIntPtr: %t ->", *v)
	*v = 10
	// fmt.Printf(" %t \n", *v)
}

func editString(v string) {
	// fmt.Printf("editString: %t ->", v)
	v = "edited"
	// fmt.Printf(" %t \n", v)
}

func editStringPtr(v *string) {
	// fmt.Printf("editStringPtr: %t ->", *v)
	*v = "edited"
	// fmt.Printf(" %t \n", *v)
}

func editArray(v [3]int) {
	// fmt.Printf("editArray: %t ->", v)
	v[0] = 10
	// fmt.Printf(" %t \n", v)
}

func editArrayPtr(v *[3]int) {
	// fmt.Printf("editArrayPtr: %t ->", *v)
	v[0] = 10
	// fmt.Printf(" %t \n", *v)
}

func reassignArrayPtr(v *[3]int) {
	// fmt.Printf("reassignArrayPtr: %t ->", *v)
	v = &[3]int{10, 20, 30}
	// fmt.Printf(" %t \n", *v)
}

func editSlice(v []int) {
	// fmt.Printf("editSlice: %t ->", v)
	v[0] = 10
	// fmt.Printf(" %t \n", v)
}

func editSlicePtr(v *[]int) {
	// fmt.Printf("editSlicePtr: %t ->", *v)
	(*v)[0] = 10
	// fmt.Printf(" %t \n", *v)
}

func appendSlice(v []int) {
	// fmt.Printf("appendSlice: %t ->", v)
	v = append(v, 10)
	// fmt.Printf(" %t \n", v)
}

func appendSlicePtr(v *[]int) {
	// fmt.Printf("appendSlicePtr: %t ->", *v)
	*v = append(*v, 10)
	// fmt.Printf(" %t \n", *v)
}

func editMap(v map[string]int) {
	// fmt.Printf("editMap: %t ->", v)
	v["a"] = 10
	// fmt.Printf(" %t \n", v)
}

func editMapPtr(v *map[string]int) {
	// fmt.Printf("editMapPtr: %t ->", *v)
	(*v)["a"] = 10
	// fmt.Printf(" %t \n", *v)
}

func appendMap(v map[string]int) {
	// fmt.Printf("appendMap: %t ->", v)
	v["d"] = 10
	// fmt.Printf(" %t \n", v)
}

func appendMapPtr(v *map[string]int) {
	// fmt.Printf("appendMapPtr: %t ->", *v)
	(*v)["d"] = 10
	// fmt.Printf(" %t \n", *v)
}

func editStruct(v struct{ A int }) {
	// fmt.Printf("editStruct: %t ->", v)
	v.A = 10
	// fmt.Printf(" %t \n", v)
}

func editStructPtr(v *struct{ A int }) {
	// fmt.Printf("editStructPtr: %t ->", *v)
	(*v).A = 10
	// fmt.Printf(" %t \n", *v)
}

func editInterface(v interface{}) {
	// fmt.Printf("editInterface: %t ->", v)
	v = 10
	// fmt.Printf(" %t \n", v)
}

func editInterfacePtr(v *interface{}) {
	// fmt.Printf("editInterfacePtr: %t ->", *v)
	*v = 10
	// fmt.Printf(" %t \n", *v)
}

func editChannel(v chan int) {
	// fmt.Printf("editChannel: %t ->", v)
	v <- 10
	// fmt.Printf(" %t \n", v)
}

func editChannelPtr(v *chan int) {
	// fmt.Printf("editChannelPtr: %t ->", *v)
	*v <- 10
	// fmt.Printf(" %t \n", *v)
}