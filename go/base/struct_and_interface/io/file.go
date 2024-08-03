package io

/*
A struct can have fields and methods.
If a struct implements all the methods defined in an interface, it satisfies that interface implicitly:
*/
type File struct {
    Name string
    Data []byte
}

func (f *File) Read(p []byte) (n int, err error) {
    copy(p, f.Data)
    return len(f.Data), nil
}

func (f *File) Write(p []byte) (n int, err error) {
    f.Data = append(f.Data, p...)
    return len(p), nil
}
