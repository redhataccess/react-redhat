Mixin = {
    getRandomId: function() {
        var id;
        id = "";
        while (id.length < 8) {
            id += Math.random().toString(36).substr(2);
        }
        return id.substr(0, 8);
    }
};

module.exports = Mixin;