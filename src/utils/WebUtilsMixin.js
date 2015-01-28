Mixin = {
    isDefined: function(obj,path) {
        if(!obj)
        {
            return false;
        }
        if(obj && !path)
        {
            return true;
        }
        var props = path.split(".");
        var currentObject = obj;
        var i = 0;
        while (i < props.length) {
            currentObject=currentObject[props[i]];
            if(!currentObject)
            {
                return false;
                
            }
            i++;
        }
        return true;
    },

    getDefined: function(obj,path) {
        var props= path.split(".");
        var currentObject=obj;
        var i=0;
        while(i<props.length)
        {
            currentObject=currentObject[props[i]];
            if(!currentObject)
            {
                return null;
                
            }
            i++;
        }
        return currentObject;
    }
};

module.exports = Mixin;