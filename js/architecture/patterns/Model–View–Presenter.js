/**
MVP is a user interface architectural pattern engineered to facilitate automated unit testing 
and improve the separation of concerns in presentation logic:

* The model is an interface defining the data to be displayed or otherwise acted upon in the user interface.

* The view is a passive interface that displays data (the model) and routes user commands (events) 
to the presenter to act upon that data.

* The presenter acts upon the model and the view. It retrieves data from repositories (the model), 
and formats it for display in the view.
 */

class Model {
    constructor(fullName, email) {
        this.fullName = fullName;
        this.email = email;
    }

    toString() {
        return 'Email : ' + this.email + '\nFullName : ' + this.fullName;
    }
}

class View {
    updateUserInfoTextView(info) {
        console.log(info);
    }

    showProgressBar() {}

    hideProgressBar() {}
}

class Presenter {
    constructor(view) {
        this.model = new Model();
        this.view = view;
    }

    updateFullName(fullName) {
        this.model.fullName = fullName;
        this.view.updateUserInfoTextView(this.model.toString());
    }

    updateEmail(email) {
        this.model.email = email;
        this.view.updateUserInfoTextView(this.model.toString());
    }
}
