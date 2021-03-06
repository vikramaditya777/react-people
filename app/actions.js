var CountryService = require('./services/CountryService');
var PeopleService = require('./services/PeopleService');

var constants = require('./constants');

var methods = {
  country: {
    initCountries: function() {
      this.dispatch(constants.COUNTRY.INIT_COUNTRY);
      CountryService.getCountryList().then(
          function(countries) {
            this.dispatch(constants.COUNTRY.INIT_COUNTRY_SUCCESS, {countries: countries});
          }.bind(this)
      ).catch(function(err) {
            this.dispatch(constants.COUNTRY.INIT_COUNTRY_FAIL, {error: err});
          }).bind(this);
    },
    changeCountry: function(country) {
      if (this.flux.dispatcher.currentDispatch == null) {
        this.dispatch(constants.COUNTRY.CHANGE_COUNTRY, {country: country});
        this.dispatch(constants.PEOPLE.LOAD_PEOPLE_LIST, {country: country});
      }
      PeopleService.loadPeopleList(country).then(
          function(people) {
            this.dispatch(constants.PEOPLE.LOAD_PEOPLE_LIST_SUCCESS, {people: people});
          }.bind(this)
      ).catch(function(err) {
            this.dispatch(constants.PEOPLE.LOAD_PEOPLE_LIST_FAIL, {error: err});
          }.bind(this)
      );
    }
  },
  people: {
    changePerson : function(idPerson) {
      if (this.flux.dispatcher.currentDispatch == null) {
        this.dispatch(constants.PEOPLE.LOAD_PERSON, {idPerson: idPerson});
      }
      PeopleService.loadPersonById(idPerson).then(
          function(person) {
            this.dispatch(constants.PEOPLE.LOAD_PERSON_SUCCESS, {person: person});
          }.bind(this)
      ).catch(function(err) {
            this.dispatch(constants.PEOPLE.LOAD_PERSON_FAIL, {error: err});
          }.bind(this)
      );
    }
  },

  routes: {
    transition: function(path, params) {
      this.dispatch(constants.ROUTE.TRANSITION, {path: path, params: params});
    }
  }
};

module.exports = {
  methods: methods,
  constants: constants
};
