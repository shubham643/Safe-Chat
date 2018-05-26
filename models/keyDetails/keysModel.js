function Keys(keyName, keyID, owner, creationDate, encryptAccess, decryptAccess) {
    this.keyName = keyName;
    this.keyID = keyID;
    this.owner = owner;
    this.creationDate = creationDate;
    this.encryptAccess = encryptAccess;
    this.decryptAccess = decryptAccess;
};

Keys.prototype = {

    setKeyName: function(keyName) {
        this.keyName = keyName;
        return this;
    },

    setKeyID: function(keyID) {
        this.keyID = keyID;
        return this;
    },

    setOwner: function(owner) {
        this.owner = owner;
        return this;
    },

    setCreationDate: function(creationDate) {
        this.creationDate = creationDate;
        return this;
    },

    setEncryptAccess: function(encryptAccess) {
        this.encryptAccess = encryptAccess;
        return this;
    },

    setDecryptAccess: function(decryptAccess) {
        this.decryptAccess = decryptAccess;
        return this;
    }
};

module.exports = Keys;
