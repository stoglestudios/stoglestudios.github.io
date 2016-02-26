String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
}

angular.module('testApp', [])
    .controller('runStuff', [function() {
        this.thoseNames = ["Thomas", "Richards", "Harrison"];
        this.Names = [];
        for (var i=0; i<this.thoseNames.length; i++) {
            this.Names[i] = {
                id: i+1,
                Name: this.thoseNames[i],
                Formal: "Mr. " + this.thoseNames[i]
            }
        }
        this.addMe = function() {
            this.Names.push({
                id: this.Names.length+1,
                Name: "Ogle",
                Formal: "Mr. Ogle"
            });
        }
        this.addNew = function() {
            if (this.newName) {
                var theNewName = this.newName.ucfirst();
                    this.Names.push({
                    id: this.Names.length+1,
                    Name: theNewName,
                    Formal: "Mr. " + theNewName
                });
            } else {
                alert("You must enter your last name");
            }
        }
    }]);