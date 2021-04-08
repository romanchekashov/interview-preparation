/**
    MVC Pattern stands for Model-View-Controller Pattern. This pattern is used to separate application's concerns (SoC).

    * Model - Model represents an object carrying data. 
      It can also have logic to update controller if its data changes.

    * View - View represents the visualization of the data that model contains.

    * Controller - Controller acts on both model and view. 
      It controls the data flow into model object and updates the view whenever data changes. 
      It keeps view and model separate.
 */

class StudentModel {
    rollNo;
    name;
}

class StudentView {
    printStudentDetails(studentName, studentRollNo) {
        console.log('Student: ');
        console.log('Name: ' + studentName);
        console.log('Roll No: ' + studentRollNo);
    }
}

class StudentController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    setStudentName(name) {
        this.model.name = name;
    }

    getStudentName() {
        return this.model.name;
    }

    setStudentRollNo(rollNo) {
        this.model.rollNo = rollNo;
    }

    getStudentRollNo() {
        return this.model.rollNo;
    }

    updateView() {
        this.view.printStudentDetails(this.model.name, this.model.rollNo);
    }
}

// run
function retriveStudentFromDatabase() {
    const student = new StudentModel();
    student.name = 'Robert';
    student.rollNo = '10';
    return student;
}

function main() {
    //fetch student record based on his roll no from the database
    const model = retriveStudentFromDatabase();

    //Create a view : to write student details on console
    const view = new StudentView();

    const controller = new StudentController(model, view);

    controller.updateView();

    //update model data
    controller.setStudentName('John');

    controller.updateView();
}

main();
