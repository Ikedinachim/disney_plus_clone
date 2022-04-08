var statesAndLocalGov = require("./statesAndLocalGov.json");

function _lower(input) {
  return input.toLowerCase().trim();
}

// export function all() {
//   return statesAndLocalGov;
// }

// export function states() {
//   return statesAndLocalGov.map(function (nigeriaStates) {
//     return nigeriaStates.state;
//   });
// }

// export function senatorial_districts(state) {
//   state = _lower(state);

//   if (!state || state === "") {
//     throw new Error("Invalid Nigeria State");
//   }

//   if (["fct", "f.c.t", "abuja", "f c t"].includes(state)) {
//     state = "Federal Capital Territory";
//   }

//   const response = statesAndLocalGov.find(function (nigeriaStates) {
//     return _lower(nigeriaStates.state) === _lower(state);
//   });
//   return response.senatorial_districts;
// }

// export function lgas(state) {
//   state = _lower(state);

//   if (!state || state === "") {
//     throw new Error("Invalid Nigeria State");
//   }

//   if (["fct", "f.c.t", "abuja", "f c t"].includes(state)) {
//     state = "Federal Capital Territory";
//   }

//   return statesAndLocalGov.find(function (nigeriaStates) {
//     return _lower(nigeriaStates.state) === _lower(state);
//   });
// }

const NaijaStates = {
  all: function () {
    return statesAndLocalGov;
  },
  states: function () {
    return statesAndLocalGov.map(function (nigeriaStates) {
      return nigeriaStates;
    });
  },
  senatorial_districts: function (state) {
    state = _lower(state);

    if (!state || state === "") {
      throw new Error("Invalid Nigeria State");
    }

    if (["fct", "f.c.t", "abuja", "f c t"].includes(state)) {
      state = "Federal Capital Territory";
    }

    const response = statesAndLocalGov.find(function (nigeriaStates) {
      return _lower(nigeriaStates.state) === _lower(state);
    });
    return response.senatorial_districts;
  },

  lgas: function (state) {
    state = _lower(state);

    if (!state || state === "") {
      throw new Error("Invalid Nigeria State");
    }

    if (["fct", "f.c.t", "abuja", "f c t", "FCT"].includes(state)) {
      state = "FCT";
    }

    return statesAndLocalGov.find(function (nigeriaStates) {
      return _lower(nigeriaStates.name) === _lower(state);
    });
  },

  areas: function (lga) {
    lga = _lower(lga);

    if (!lga || lga === "") {
      throw new Error("Invalid Nigeria State");
    }

    const response = statesAndLocalGov
      .map((nigeriaArea) => nigeriaArea)
      .find(
        (areas) => areas.lgas.some((item) => _lower(item.name) === _lower(lga))
        // map((area) => area.areas)
      )
      .lgas.find((lgas) => _lower(lgas.name) === _lower(lga));
    return response;
  },
};

export default NaijaStates;
