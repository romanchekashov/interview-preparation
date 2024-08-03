package struct_and_interface

/*
Definition:
   - An interface in Go is a type that specifies a set of method signatures but does not implement them.
   It defines behavior that types must satisfy.

Usage:
   - Interfaces are used to define abstract types and enable polymorphism.

Can interface in golang contain fields?
	No, interfaces in Go cannot contain fields. They can only contain method signatures.
	This design allows interfaces to specify behavior without dictating the data layout
	or structure of the types that implement the interface.
*/

type Stringer interface {
	String() string
}

/*
Implementation:
   - Any type that implements the methods specified in an interface implicitly satisfies the interface:

   type Person struct {
       Name string
   }

   func (p Person) String() string {
       return p.Name
   }

   var s Stringer = Person{Name: "Alice"}

Methods:
   - Interfaces themselves do not have method implementations. They only declare method signatures:

   type Reader interface {
       Read(p []byte) (n int, err error)
   }

Use Cases:
   - Use interfaces to define behavior that multiple types can share and to write flexible and decoupled code.
*/