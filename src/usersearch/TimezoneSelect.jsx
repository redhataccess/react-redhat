var React           = require('react');
var Input           = require('react-bootstrap/Input');
var Popover         = require('react-bootstrap/Popover');
var OverlayTrigger  = require('react-bootstrap/OverlayTrigger');
var RandomUtilsMixin = require('../utils/randomUtilsMixin');

// TODO -- This is also accessible via moment.tz.names, there are 582 listed though, not sure we want to show them all?
timezones = ["Pacific/Apia", "Pacific/Midway", "Pacific/Niue", "Pacific/Pago_Pago", "Pacific/Samoa", "America/Adak", "America/Atka", "Pacific/Fakaofo", "Pacific/Honolulu", "Pacific/Johnston", "Pacific/Rarotonga", "Pacific/Tahiti", "Pacific/Marquesas", "America/Anchorage", "America/Juneau", "America/Nome", "America/Yakutat", "Pacific/Gambier", "America/Dawson", "America/Ensenada", "America/Los_Angeles", "America/Santa_Isabel", "America/Tijuana", "America/Vancouver", "America/Whitehorse", "Pacific/Pitcairn", "America/Boise", "America/Cambridge_Bay", "America/Chihuahua", "America/Dawson_Creek", "America/Denver", "America/Edmonton", "America/Hermosillo", "America/Inuvik", "America/Mazatlan", "America/Ojinaga", "America/Phoenix", "America/Shiprock", "America/Yellowknife", "America/Belize", "America/Cancun", "America/Chicago", "America/Costa_Rica", "America/El_Salvador", "America/Guatemala", "America/Indiana/Knox", "America/Indiana/Tell_City", "America/Knox_IN", "America/Managua", "America/Matamoros", "America/Menominee", "America/Merida", "America/Mexico_City", "America/Monterrey", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Rainy_River", "America/Rankin_Inlet", "America/Regina", "America/Swift_Current", "America/Tegucigalpa", "America/Winnipeg", "Pacific/Easter", "Pacific/Galapagos", "America/Atikokan", "America/Bogota", "America/Cayman", "America/Coral_Harbour", "America/Detroit", "America/Fort_Wayne", "America/Grand_Turk", "America/Guayaquil", "America/Havana", "America/Indiana/Indianapolis", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Indianapolis", "America/Iqaluit", "America/Jamaica", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Lima", "America/Louisville", "America/Montreal", "America/Nassau", "America/New_York", "America/Nipigon", "America/Panama", "America/Pangnirtung", "America/Port-au-Prince", "America/Resolute", "America/Thunder_Bay", "America/Toronto", "America/Caracas", "America/Anguilla", "America/Antigua", "America/Argentina/San_Luis", "America/Aruba", "America/Asuncion", "America/Barbados", "America/Blanc-Sablon", "America/Boa_Vista", "America/Campo_Grande", "America/Cuiaba", "America/Curacao", "America/Dominica", "America/Eirunepe", "America/Glace_Bay", "America/Goose_Bay", "America/Grenada", "America/Guadeloupe", "America/Guyana", "America/Halifax", "America/La_Paz", "America/Manaus", "America/Marigot", "America/Martinique", "America/Moncton", "America/Montserrat", "America/Port_of_Spain", "America/Porto_Acre", "America/Porto_Velho", "America/Puerto_Rico", "America/Rio_Branco", "America/Santiago", "America/Santo_Domingo", "America/St_Barthelemy", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Thule", "America/Tortola", "America/Virgin", "America/St_Johns", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/ComodRivadavia", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Bahia", "America/Belem", "America/Buenos_Aires", "America/Catamarca", "America/Cayenne", "America/Cordoba", "America/Fortaleza", "America/Godthab", "America/Jujuy", "America/Maceio", "America/Mendoza", "America/Miquelon", "America/Montevideo", "America/Paramaribo", "America/Recife", "America/Rosario", "America/Santarem", "America/Sao_Paulo", "America/Noronha", "America/Scoresbysund", "Africa/Abidjan", "Africa/Accra", "Africa/Bamako", "Africa/Banjul", "Africa/Bissau", "Africa/Casablanca", "Africa/Conakry", "Africa/Dakar", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Lome", "Africa/Monrovia", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Sao_Tome", "Africa/Timbuktu", "America/Danmarkshavn", "Europe/Belfast", "Europe/Dublin", "Europe/Guernsey", "Europe/Isle_of_Man", "Europe/Jersey", "Europe/Lisbon", "Europe/London", "Africa/Algiers", "Africa/Bangui", "Africa/Brazzaville", "Africa/Ceuta", "Africa/Douala", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Luanda", "Africa/Malabo", "Africa/Ndjamena", "Africa/Niamey", "Africa/Porto-Novo", "Africa/Tunis", "Africa/Windhoek", "Europe/Amsterdam", "Europe/Andorra", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Budapest", "Europe/Copenhagen", "Europe/Gibraltar", "Europe/Ljubljana", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Monaco", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Rome", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Skopje", "Europe/Stockholm", "Europe/Tirane", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zurich", "Africa/Blantyre", "Africa/Bujumbura", "Africa/Cairo", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Kigali", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Tripoli", "Asia/Amman", "Asia/Beirut", "Asia/Damascus", "Asia/Gaza", "Asia/Istanbul", "Asia/Jerusalem", "Asia/Nicosia", "Asia/Tel_Aviv", "Europe/Athens", "Europe/Bucharest", "Europe/Chisinau", "Europe/Helsinki", "Europe/Istanbul", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Mariehamn", "Europe/Minsk", "Europe/Nicosia", "Europe/Riga", "Europe/Simferopol", "Europe/Sofia", "Europe/Tallinn", "Europe/Tiraspol", "Europe/Uzhgorod", "Europe/Vilnius", "Europe/Zaporozhye", "Africa/Addis_Ababa", "Africa/Asmara", "Africa/Asmera", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Kampala", "Africa/Khartoum", "Africa/Mogadishu", "Africa/Nairobi", "Asia/Aden", "Asia/Baghdad", "Asia/Bahrain", "Asia/Kuwait", "Asia/Qatar", "Asia/Riyadh", "Europe/Moscow", "Europe/Samara", "Europe/Volgograd", "Asia/Riyadh87", "Asia/Riyadh88", "Asia/Riyadh89", "Asia/Tehran", "Asia/Baku", "Asia/Dubai", "Asia/Muscat", "Asia/Tbilisi", "Asia/Yerevan", "Asia/Kabul", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Ashkhabad", "Asia/Dushanbe", "Asia/Karachi", "Asia/Oral", "Asia/Samarkand", "Asia/Tashkent", "Asia/Yekaterinburg", "Asia/Calcutta", "Asia/Colombo", "Asia/Kolkata", "Asia/Kathmandu", "Asia/Katmandu", "Asia/Almaty", "Asia/Bishkek", "Asia/Dacca", "Asia/Dhaka", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Qyzylorda", "Asia/Thimbu", "Asia/Thimphu", "Asia/Rangoon", "Asia/Bangkok", "Asia/Ho_Chi_Minh", "Asia/Hovd", "Asia/Jakarta", "Asia/Krasnoyarsk", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Saigon", "Asia/Vientiane", "Asia/Brunei", "Asia/Choibalsan", "Asia/Chongqing", "Asia/Chungking", "Asia/Harbin", "Asia/Hong_Kong", "Asia/Irkutsk", "Asia/Kashgar", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Macao", "Asia/Macau", "Asia/Makassar", "Asia/Manila", "Asia/Shanghai", "Asia/Singapore", "Asia/Taipei", "Asia/Ujung_Pandang", "Asia/Ulaanbaatar", "Asia/Ulan_Bator", "Asia/Urumqi", "Australia/Perth", "Australia/West", "Australia/Eucla", "Asia/Dili", "Asia/Jayapura", "Asia/Pyongyang", "Asia/Seoul", "Asia/Tokyo", "Asia/Yakutsk", "Pacific/Palau", "Australia/Adelaide", "Australia/Broken_Hill", "Australia/Darwin", "Australia/North", "Australia/South", "Australia/Yancowinna", "Asia/Sakhalin", "Asia/Vladivostok", "Australia/ACT", "Australia/Brisbane", "Australia/Canberra", "Australia/Currie", "Australia/Hobart", "Australia/Lindeman", "Australia/Melbourne", "Australia/NSW", "Australia/Queensland", "Australia/Sydney", "Australia/Tasmania", "Australia/Victoria", "Pacific/Guam", "Pacific/Port_Moresby", "Pacific/Saipan", "Pacific/Truk", "Pacific/Yap", "Australia/LHI", "Australia/Lord_Howe", "Asia/Anadyr", "Asia/Kamchatka", "Asia/Magadan", "Pacific/Efate", "Pacific/Guadalcanal", "Pacific/Kosrae", "Pacific/Noumea", "Pacific/Ponape", "Pacific/Norfolk", "Pacific/Auckland", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Nauru", "Pacific/Tarawa", "Pacific/Wake", "Pacific/Wallis", "Pacific/Chatham", "Pacific/Enderbury", "Pacific/Tongatapu", "Pacific/Kiritimati"];

//require('typeahead.js/dist/typeahead.bundle');

module.exports = React.createClass({
    mixins: [RandomUtilsMixin],
    getInitialState: function() {
        return {id: this.getRandomId()};
    },
    componentDidMount: function() {
        var self = this;
        $(`#${this.state.id}`).typeahead({
            hint: false,
            highlight: true,
            minLenght: 1
        }, {
            name: "timezone",
            displayKey: "value",
            source: this.substringMatcher(timezones)
        });
        $(`#${this.state.id}`).bind("typeahead:selected", (function(a, selected, c) {
            self.valueChanged({
                target: {
                    value: selected.value
                }
            });
        }));
    },
    valueChanged: function(event) {
        if (this.props.valueChanged != null) {
            this.props.valueChanged(event.target.value);
        }
    },
    substringMatcher: function(values) {
        return function(q, cb) {
            var matches;
            matches = [];
            values.forEach(function(value) {
                if (value.indexOf(q) >= 0) {
                    return matches.push({
                        value: value
                    });
                }
            });
            cb(matches);
        };
    },
    // Refs are not showing up
    //<input ref="timezone" type="text" onChange={this.valueChanged} label={this.props.label}/>
    render: function() {
        var popover = (
            <Popover title="Tip!">
                You don't have to specify timezone explicitly.
                <br/>
                E.g. enter&nbsp;<strong>Europe/</strong>&nbsp; to get all timezones in Europe.
            </Popover>
        );
        return (
            <OverlayTrigger trigger="focus" placement="top" overlay={popover}>
                <Input id={this.state.id} ref="timezone" type="text" onChange={this.valueChanged} label={this.props.label} />
            </OverlayTrigger>
        );
    }
});

