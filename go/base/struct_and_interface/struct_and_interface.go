package struct_and_interface

import (
	"fmt"

	"example.com/base/struct_and_interface/io"
)

/*
### Summary

- Struct:
  - Groups together data fields.
  - Defines concrete data types.
  - Can have methods associated with it.
  - Used for modeling real-world entities with attributes.

- Interface:
  - Defines a set of method signatures.
  - Specifies behavior without implementing it.
  - Allows polymorphism and decoupled code design.
  - Used for defining abstract types that multiple types can implement.

Both structs and interfaces are powerful tools in Go, allowing for flexible and efficient code design.
Structs are about data, while interfaces are about behavior.

Вообщем структуры в го описывают состояние, а интерфейсы описывают поведение
*/

/*
### Key Points

- Interfaces: Only method signatures.
- Structs: Can have fields and methods.
- Implementation: A type satisfies an interface by implementing its methods, not by declaring it explicitly.

This design promotes decoupling and flexibility in Go programs, allowing types to fulfill multiple interfaces
and interfaces to be satisfied by multiple types without rigid inheritance hierarchies.
*/

func Example1() {
	p := Person{Name: "Alice", Age: 30}
	fmt.Println(p)
	fmt.Println(p.GetName())
	fmt.Println(p.Name)
	p.Name = "Tom"
	fmt.Println(p.GetName())
	p.SetName("Bart")
	fmt.Println(p.GetName())

	var s Stringer = p
	fmt.Println(s)
}

func Example2() {
    var r io.Reader
    var w io.Writer

    f := &io.File{Name: "example.txt"}
    
    r = f
    w = f

    // Now `f` can be used wherever `Reader` and `Writer` interfaces are expected
    fmt.Println("Reader", r)
    fmt.Println("Writer", w)
}
