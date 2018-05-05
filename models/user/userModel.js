function User(username, password, firstName, middleName, lastName, phone, email) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
};


User.prototype = {

    setUsername: function(username) {
        this.username = username;
        return this;
    },

    setPassword: function(password) {
        this.password = password;
        return this;
    },

    setFirstName: function(firstName) {
        this.firstName = firstName;
        return this;
    },

    setMiddleName: function(middleName) {
        this.middleName = middleName;
        return this;
    },

    setLastName: function(lastName) {
        this.lastName = lastName;
        return this;
    },

    setPhone: function(phone) {
        this.phone = phone;
        return this;
    },

    setEmail: function(email) {
        this.email = email;
        return this;
    },

    /* 
     * This method checks that all of the mandatory parameters of user should be present.
     */
    checkRequiredFields: function() {
        if (this.username == '' || this.password == '' || this.firstName == '' || this.phone == '')
            return false;
        else
            return true;
    }
};

module.exports = User;