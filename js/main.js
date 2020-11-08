//NOTE: Database picker
function pickFromDatabase(queryString) {
  let result = {
    suggestionTerms: null,
    collections: null,
    products: null,
  };

  const { isGetSuggestionTerm, isGetCollection, isGetProduct } = currentConfigs;
  switch (queryString) {
    case "t":
      if (isGetSuggestionTerm) {
        result.suggestionTerms = SuggestionTermDB.slice(0, 3);
      }
      if (isGetCollection) {
        result.collections = CollectionDB;
      }
      if (isGetProduct) {
        result.products = ProductDB.slice(0, 3);
      }
      break;
    case "to":
      if (isGetSuggestionTerm) {
        result.suggestionTerms = SuggestionTermDB.slice(2, 6);
      }
      if (isGetCollection) {
        result.collections = CollectionDB;
      }
      if (isGetProduct) {
        result.products = ProductDB.slice(2, 5);
      }
      break;
    case "top":
      if (isGetSuggestionTerm) {
        result.suggestionTerms = SuggestionTermDB.slice(
          SuggestionTermDB.length - 4,
          SuggestionTermDB.length
        );
      }
      if (isGetCollection) {
        result.collections = CollectionDB;
      }
      if (isGetProduct) {
        result.products = ProductDB.slice(
          ProductDB.length - 3,
          ProductDB.length
        );
      }
      break;
    default:
      break;
  }

  return result;
}

// NOTE: fake API Sever
const sugesstionApi = (queryString) => {
  return new Promise((resolve) => {
    if (!queryString) {
      return setTimeout(
        () => resolve({ error: true, message: "Query not found." }),
        250
      );
    }

    setTimeout(
      () => resolve({ error: false, data: pickFromDatabase(queryString) }),
      250
    );
  });
};

let currentConfigs = {
  isGetSuggestionTerm: true,
  isGetCollection: true,
  isGetProduct: true,
  datasets: null,
};

$(document).ready(function () {
  let searchElement = document.getElementById("search-box");
  let mySuggestionBox = new SuggestionBox(searchElement, currentConfigs);
  mySuggestionBox.init();

  // NOTE: handle input text change
  $(searchElement).on("input", function (event) {
    let inputValue = event.target.value;

    if (inputValue) {
      sugesstionApi(inputValue).then((response) => {
        if (response && !response.error) {
          mySuggestionBox.configs.datasets = response.data;
          mySuggestionBox.update();
        }
      });
    } else {
      mySuggestionBox.configs.datasets = null;
      mySuggestionBox.update();
    }
  });

  // NOTE: handle options search box change
  let checkBoxOptions = $('input[type="checkbox"]');
  $(checkBoxOptions).each(function (index, checkBoxElement) {
    $(checkBoxElement).change(function (event) {
      let isCheck = event.target.checked;
      let checkOptionName = event.target.name;

      mySuggestionBox.setConfig(checkOptionName, isCheck);
    });
  });
});
