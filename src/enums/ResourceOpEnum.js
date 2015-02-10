(function() {
  var ResourceOp, _;

  _ = require('lodash');

  ResourceOp = {};

  ResourceOp.TAKE_FTS = {
    name: 'FTS',
    display: 'Take FTS Role',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'FTS': ResourceOp.TAKE_FTS
  });

  ResourceOp.TAKE_OWNERSHIP = {
    name: 'TAKE_OWNERSHIP',
    display: 'Take ownership',
    grammar: 'of'
  };

  _.defaults(ResourceOp, {
    'TAKE_OWNERSHIP': ResourceOp.TAKE_OWNERSHIP
  });

  ResourceOp.COLLABORATE = {
    name: 'COLLABORATE',
    display: 'Collaborate',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'COLLABORATE': ResourceOp.COLLABORATE
  });

  ResourceOp.CONTRIBUTE = {
    name: 'CONTRIBUTE',
    display: 'Contribute',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'CONTRIBUTE': ResourceOp.CONTRIBUTE
  });

  ResourceOp.UPDATE = {
    name: 'UPDATE',
    display: 'Update'
  };

  _.defaults(ResourceOp, {
    'UPDATE': ResourceOp.UPDATE
  });

  ResourceOp.SET_SBRS = {
    name: 'SET_SBRS',
    display: 'Set SBRs',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'SET_SBRS': ResourceOp.SET_SBRS
  });

  ResourceOp.SET_TAGS = {
    name: 'SET_TAGS',
    display: 'Set tags',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'SET_TAGS': ResourceOp.SET_TAGS
  });

  ResourceOp.TRANSLATE = {
    name: 'TRANSLATE',
    display: 'Translate'
  };

  _.defaults(ResourceOp, {
    'TRANSLATE': ResourceOp.TRANSLATE
  });

  ResourceOp.NOOP = {
    name: 'NOOP',
    display: 'No action required',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'NOOP': ResourceOp.NOOP
  });

  ResourceOp.FOLLOW_UP_WITH_ENGINEERING = {
    name: 'FOLLOW_UP_WITH_ENGINEERING ',
    display: 'Follow up with engineering',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'FOLLOW_UP_WITH_ENGINEERING': ResourceOp.FOLLOW_UP_WITH_ENGINEERING
  });

  ResourceOp.FOLLOW_UP_WITH_PM = {
    name: 'FOLLOW_UP_WITH_PM ',
    display: 'Follow up with PM',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'FOLLOW_UP_WITH_PM': ResourceOp.FOLLOW_UP_WITH_PM
  });

  ResourceOp.FOLLOW_UP_WITH_SALES = {
    name: 'FOLLOW_UP_WITH_SALES',
    display: 'Follow up with sales',
    grammar: 'on'
  };

  _.defaults(ResourceOp, {
    'FOLLOW_UP_WITH_SALES': ResourceOp.FOLLOW_UP_WITH_SALES
  });

  ResourceOp.NNO = {
    name: 'NNO',
    display: 'Needs new owner',
    grammar: 'for'
  };

  _.defaults(ResourceOp, {
    'NNO': ResourceOp.NNO
  });

  ResourceOp.NNO_NA = {
    name: 'NNO_NA',
    display: 'Needs new NA owner',
    grammar: 'for'
  };

  _.defaults(ResourceOp, {
    'NNO_NA': ResourceOp.NNO_NA
  });

  ResourceOp.NNO_APAC = {
    name: 'NNO_APAC',
    display: 'Needs new APAC owner',
    grammar: 'for'
  };

  _.defaults(ResourceOp, {
    'NNO_APAC': ResourceOp.NNO_APAC
  });

  ResourceOp.NNO_EMEA = {
    name: 'NNO_EMEA',
    display: 'Needs new EMEA owner',
    grammar: 'for'
  };

  _.defaults(ResourceOp, {
    'NNO_EMEA': ResourceOp.NNO_EMEA
  });

  ResourceOp.NNO_INDIA = {
    name: 'NNO_INDIA',
    display: 'Needs new India owner',
    grammar: 'for'
  };

  _.defaults(ResourceOp, {
    'NNO_INDIA': ResourceOp.NNO_INDIA
  });

  ResourceOp.CREATE_KCS = {
    name: 'CREATE_KCS',
    display: 'Create KCS Content',
    grammar: 'for'
  };

  _.defaults(ResourceOp, {
    'CREATE_KCS': ResourceOp.CREATE_KCS
  });

  ResourceOp.getOpFromCase = function(c) {
    if ((c.resource.escalateToGeo != null) && c.resource.escalateToGeo !== '') {
      switch (c.resource.escalateToGeo) {
        case 'NA':
          return ResourceOp.NNO_NA;
        case 'APAC':
          return ResourceOp.NNO_APAC;
        case 'INDIA':
          return ResourceOp.NNO_INDIA;
        case 'EMEA':
          return ResourceOp.NNO_EMEA;
        default:
          return ResourceOp.NNO;
      }
    } else {
      switch (c.resource.internalStatus) {
        case 'Closed':
          return ResourceOp.NOOP;
        case 'Waiting on Owner':
          return ResourceOp.UPDATE;
        case 'Waiting on Engineering':
          return ResourceOp.FOLLOW_UP_WITH_ENGINEERING;
        case 'Waiting on Customer':
          return ResourceOp.NOOP;
        case 'Unassigned':
          return ResourceOp.TAKE_OWNERSHIP;
        case 'Waiting on PM':
          return ResourceOp.FOLLOW_UP_WITH_PM;
        case 'Waiting on QA':
          return ResourceOp.UPDATE;
        case 'Waiting on Contributor':
          return ResourceOp.CONTRIBUTE;
        case 'Waiting on Sales':
          return ResourceOp.FOLLOW_UP_WITH_SALES;
        case 'Waiting on 3rd Party Vendor':
          return ResourceOp.NOOP;
        case 'Waiting on Collaboration':
          return ResourceOp.COLLABORATE;
        case 'Waiting on Translation':
          return ResourceOp.UPDATE;
        default:
          return ResourceOp.UPDATE;
      }
    }
  };

  module.exports = ResourceOp;

}).call(this);

//# sourceMappingURL=ResourceOpEnum.js.map
