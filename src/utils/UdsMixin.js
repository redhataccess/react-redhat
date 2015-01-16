Q = require('q');
// Use long stack trace support
_ = require('lodash');

Mixin = {
    getRandomId: function() {
        var id;
        id = "";
        while (id.length < 8) {
            id += Math.random().toString(36).substr(2);
        }
        return id.substr(0, 8);
    },
    loadTags: function() {
        var deferred = Q.defer();

        Q($.get("/user/metadata/tags?where=skillName like \"%25\""))
        .then(function(result) {
            var tags;
            if (result != null && result.length > 0) {
                tags = _.isObject(result) ? result : JSON.parse(result);
                deferred.resolve(tags);
            } else {
                deferred.resolve([]);
            }
        })
        .catch(function(err) { deferred.reject(err); })
        .done();

        return deferred.promise;
    },
    loadSbrs: function() {
        var deferred = Q.defer();

        Q($.get("/user/metadata/sbrs?where=sbrName like \"%25%25\""))
        .then(function(result) {
            var sbrs;
            if (result != null && result.length > 0) {
                sbrs = _.isObject(result) ? result : JSON.parse(result);
                deferred.resolve(_.chain(sbrs).map(function (sbr) { return sbr.resource.sbr}).sort().value());
            } else {
                deferred.resolve([]);
            }
        })
        .catch(function(err) { deferred.reject(err); })
        .done();

        return deferred.promise;
    },
    queryUser: function(opts) {
        var id = opts.id || new Error("You must supply an id to the arguments hash.");
        var deferred = Q.defer();

        Q($.get("/user/" + id))
            .then(function(result) {
                var user;
                if (result != null) {
                    user = _.isString(result) ? JSON.parse(result) : result;
                    user = _.isArray(user) ? user[0] : user;
                    deferred.resolve(user);
                } else {
                    deferred.resolve([]);
                }
            })
            .catch(function(err) { deferred.reject(err); })
            .done();

        return deferred.promise;
    },
    queryUsers: function(opts) {
        var query = opts.query || new Error("You must supply a query to the arguments hash.");
        var limit = opts.limit || 20;
        var deferred = Q.defer();

        var criterias, sbrCriteriaRegex, sbrCriterias, skillCriteriaRegex, skillCriterias;
        sbrCriteriaRegex = /sbrName is "[^"]+"/g;
        skillCriteriaRegex = /skillName is "[^"]+"( and skillLevel (is|<=|>=) [012])?/g;
        sbrCriterias = [];
        skillCriterias = [];
        if (sbrCriteriaRegex.test(query)) {
            sbrCriterias = query.match(sbrCriteriaRegex);
            query = query.replace(sbrCriteriaRegex, "");
        }
        if (skillCriteriaRegex.test(query)) {
            skillCriterias = query.match(skillCriteriaRegex);
            query = query.replace(skillCriteriaRegex, "");
        }
        query = this.repairQuery(query);
        criterias = this.pairCriterias(query.trim(), sbrCriterias, skillCriterias);

        // TODO -- this needs to be rewritten to Q style promises to catch errors
        $.when.apply(this, criterias.map(function(criteria) {
            console.debug("Mapping criteria: " + criteria);
            return $.ajax("/user?where=" + criteria + "&limit=" + limit);
        })).done((function(results) {
            if (results != null && results.length > 0) {
                results = _.isArray(results) ? results : [results];
                deferred.resolve(_.chain(results).sort(function(u) {return u.resource.lastName}).value());
            } else {
                deferred.resolve([]);
            }
        }).bind(this));

        return deferred.promise;
    },
    pairCriterias: function(baseQuery, sbrCriterias, skillCriterias) {
        var i, _i, _ref1, _results;
        if (sbrCriterias.length === 0 && skillCriterias.length === 0) {
            return [baseQuery];
        } else {
            _results = [];
            for (i = _i = 0, _ref1 = Math.max(sbrCriterias.length, skillCriterias.length) - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
                _results.push([baseQuery.length > 0 ? baseQuery : void 0, i < sbrCriterias.length ? sbrCriterias[i] : void 0, i < skillCriterias.length ? skillCriterias[i] : void 0].filter(function(x) {
                    return x !== void 0;
                }).reduce(function(a, b) {
                    return "" + a + " and " + b;
                }));
            }
            return _results;
        }
    },
    repairQuery: function(query) {
        var andandRegex, andendRegex, startandRegex;
        andandRegex = /and(\s+and)+/g;
        andendRegex = /and\s*$/;
        startandRegex = /^\s*and/;
        return query.replace(andandRegex, "and").replace(andendRegex, "").replace(startandRegex, "");
    }
};

module.exports = Mixin;