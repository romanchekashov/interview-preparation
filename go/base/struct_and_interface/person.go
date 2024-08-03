package struct_and_interface

/**
Definition:
   - A struct in Go is a composite data type that groups together variables under a single name.
   These variables are called fields.

Usage:
   - Structs are used to create concrete data types that represent real-world entities with attributes.

Instantiation:
   - You create an instance of a struct by specifying field values:
      p := Person{Name: "Alice", Age: 30}

Use Cases:
   - Use structs when you need to model entities with various attributes and behaviors.
*/

import "fmt"

type Person struct {
	Name string
	Age  int
}

/*
*
Methods:
  - Structs can have methods associated with them.
    These methods can either have a pointer receiver or a value receiver:
*/
func (p Person) GetName() string {
	return p.Name
}

func (p *Person) SetName(name string) {
	p.Name = name
}

// String implements interfaces.Stringer.
func (p Person) String() string {
	return string(rune(95)) + string(rune(97) + rune(95)) + ": " + p.Name + " " + fmt.Sprint(p.Age)
}
