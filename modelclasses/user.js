/**
 * New node file
 */

var user=function(userId, firstName, lastName, emailId, mobileNumber){
	this.userId = userId;
	this.firstName=firstName;
	this.lastName=lastName;
	this.emailId=emailId;
	this.mobileNumber=mobileNumber;
}

user.prototype.setUserId = function(userId) {
	this.userId = userId;
}

user.prototype.getUserId = function() {
    return this.userId;
}

user.prototype.setFirstName = function(firstName) {
	this.firstName = firstName;
}

user.prototype.getFirstName= function() {
    return this.firstName;
}
user.prototype.setLastName = function(lastName) {
	this.lastName = lastName;
}

user.prototype.getLastName= function() {
    return this.lastName;
}
user.prototype.setEmailId = function(emailId) {
	this.emailId = emailId;
}

user.prototype.getEmailId = function() {
    return this.emailId;
}

user.prototype.setMobileNumber = function(mobileNumber) {
	this.mobileNumber = mobileNumber;
}

user.prototype.getMobileNumber = function() {
    return this.mobileNumber;
}
