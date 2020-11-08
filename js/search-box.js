(function () {
  const WRAPPER_CLASSNAME = "suggestion-result-wrapper";

  function SuggestionBox(element, configs) {
    this.inputElement = element;
    this.configs = {
      isGetSuggestionTerm: true,
      isGetCollection: true,
      isGetProduct: true,
      datasets: null,
      ...configs,
    };
  }

  function generateSuggestionTermsElement(inputElement, suggestionTerms) {
    let inputValue = inputElement.value;

    let suggestionTermWrapper = document.createElement("div");
    suggestionTermWrapper.setAttribute(
      "class",
      "section-wrapper suggestion-term"
    );

    let sectionHeader = document.createElement("div");
    sectionHeader.setAttribute("class", "section-header");
    sectionHeader.innerText = "Suggestions";

    suggestionTermWrapper.appendChild(sectionHeader);

    let termList = document.createElement("ul");
    termList.setAttribute("class", "result-list");
    suggestionTerms.map(function (suggestionTerm) {
      let termItem = document.createElement("li");

      if (inputValue.length > 1) {
        let indexOfMatchText = suggestionTerm.term.indexOf(inputValue);
        termItem.innerHTML = `${suggestionTerm.term.substring(
          0,
          indexOfMatchText
        )}<b>${suggestionTerm.term.substr(
          indexOfMatchText,
          inputValue.length
        )}</b>${suggestionTerm.term.substring(
          indexOfMatchText + inputValue.length,
          suggestionTerm.term.length
        )}`;
      } else {
        termItem.innerText = suggestionTerm.term;
      }

      termItem.onclick = function () {
        window.location = suggestionTerm.url;
      };

      termList.appendChild(termItem);
    });

    suggestionTermWrapper.appendChild(termList);

    return suggestionTermWrapper;
  }

  function generateCollectionsElement(collections) {
    let collectionsWrapper = document.createElement("div");
    collectionsWrapper.setAttribute("class", "section-wrapper collection");

    let sectionHeader = document.createElement("div");
    sectionHeader.setAttribute("class", "section-header");
    sectionHeader.innerText = "Collections";

    collectionsWrapper.appendChild(sectionHeader);

    let collectionList = document.createElement("ul");
    collectionList.setAttribute("class", "result-list");
    collections.map(function (collection) {
      let collectionItem = document.createElement("li");
      collectionItem.innerText = collection.title;
      collectionItem.onclick = function () {
        window.location = collection.url;
      };

      collectionList.appendChild(collectionItem);
    });

    collectionsWrapper.appendChild(collectionList);

    return collectionsWrapper;
  }

  function generateProductsElement(products) {
    let productWrapper = document.createElement("div");
    productWrapper.setAttribute("class", "section-wrapper product");

    let sectionHeader = document.createElement("div");
    sectionHeader.setAttribute("class", "section-header");
    sectionHeader.innerText = "Products";

    productWrapper.appendChild(sectionHeader);

    let productList = document.createElement("ul");
    productList.setAttribute("class", "result-list");
    products.map(function (product) {
      let productItem = document.createElement("li");

      let imageWrapper = document.createElement("div");
      imageWrapper.setAttribute("class", "image-wrapper");

      let productImage = document.createElement("img");
      productImage.setAttribute("src", product.image);
      imageWrapper.appendChild(productImage);

      let productInfo = document.createElement("div");
      productInfo.setAttribute("class", "product-info");

      let productName = document.createElement("p");
      productName.setAttribute("class", "product-name");
      productName.innerText = product.title;

      let productBrand = document.createElement("p");
      productBrand.setAttribute("class", "product-brand");
      productBrand.innerText = product.brand;

      let productPrice = document.createElement("p");
      productPrice.setAttribute("class", "product-price");
      productPrice.innerText = `$${product.price}`;

      productInfo.append(productName, productBrand, productPrice);

      productItem.append(imageWrapper, productInfo);

      productItem.onclick = function () {
        window.location = product.url;
      };

      productList.appendChild(productItem);
    });

    productWrapper.appendChild(productList);

    return productWrapper;
  }

  function isSuggestionOpen(inputElement) {
    return !!inputElement.parentNode.querySelector(`.${WRAPPER_CLASSNAME}`);
  }

  function removeSuggestionElement(inputElement) {
    let oldSuggestionWrapper = inputElement.parentNode.querySelector(
      `.${WRAPPER_CLASSNAME}`
    );
    if (oldSuggestionWrapper) {
      oldSuggestionWrapper.remove();
    }
  }

  function createElements(inputElement, options, data) {
    removeSuggestionElement(inputElement);

    if (data) {
      let suggestionWrapper = document.createElement("div");
      suggestionWrapper.setAttribute(
        "class",
        `${inputElement.id}-suggestion-wrapper ${WRAPPER_CLASSNAME}`
      );

      const { suggestionTerms, collections, products } = data;
      const { isGetSuggestionTerm, isGetCollection, isGetProduct } = options;

      //NOTE: For Suggestion Terms
      if (
        isGetSuggestionTerm &&
        suggestionTerms &&
        suggestionTerms.length > 0
      ) {
        suggestionWrapper.appendChild(
          generateSuggestionTermsElement(inputElement, suggestionTerms)
        );
      }

      //NOTE: For Collection
      if (isGetCollection && collections && collections.length > 0) {
        suggestionWrapper.appendChild(generateCollectionsElement(collections));
      }

      //NOTE: For Product
      if (isGetProduct && products && products.length > 0) {
        suggestionWrapper.appendChild(generateProductsElement(products));
      }

      inputElement.parentNode.appendChild(suggestionWrapper);
    }
  }

  SuggestionBox.prototype.init = function () {
    this.update();

    if (this.inputElement) {
      // NOTE: Handle hide element when click outside
      document.addEventListener("click", (event) => {
        if (
          this.inputElement.parentNode &&
          !this.inputElement.parentNode.contains(event.target)
        ) {
          removeSuggestionElement(this.inputElement);
        }
      });

      //NOTE: Handle focus back in text input
      this.inputElement.addEventListener("focus", () => {
        this.update();
      });
    }
  };

  SuggestionBox.prototype.setConfig = function (configName, value) {
    if (typeof this.configs[configName] !== "undefined") {
      this.configs[configName] = value;

      if (isSuggestionOpen(this.inputElement)) {
        this.update();
      }
    }
  };

  SuggestionBox.prototype.update = function () {
    if (this.inputElement) {
      let options = {
        isGetSuggestionTerm: this.configs.isGetSuggestionTerm,
        isGetCollection: this.configs.isGetCollection,
        isGetProduct: this.configs.isGetProduct,
      };

      createElements(this.inputElement, options, this.configs.datasets);
    }
  };

  window.SuggestionBox = SuggestionBox;
})();
