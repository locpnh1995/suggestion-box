# Apply to your Search Box
## Installation
#### Download
Download these files and put it in your project.
` search-box.css`
`search-box.js`

#### Include in Your HTML
Just link these files in your HTML.
```
<link rel="stylesheet" type="text/css" href="css/search-box.css" />
<script src="js/search-box.js"></script>
```


## Creating an input
All that's required is the script included in your page along with:
1. An `<input>` element.
2. A wrapper with css property `position: relative` to render the suggestion box.
```
----------CSS--------------
.example-wrapper {
	position: relative
}
----------HTML--------------
<div class="example-wrapper">
	<input id="search-box" type="text" placeholder="Search..." />
</div>
```


In this example, we create a suggestion box for a dataset and render that in your page.
***Datasets should follow bellow example data structure and exact object key name***
```
<script>
	let configs =  {
		isGetSuggestionTerm:  true,
		isGetCollection:  true,
		isGetProduct:  true,
		datasets:  {
			"suggestionTerms":  [
				{
				"term":  "black t-shirt",
				"url":  "http://bing.com/images/search?q=back+t-shirt"
				}
			],
			"collections":  [
				{
				"id":  "1",
				"title":  "Tops",
				"url":  "https://bing.com/images/search?q=Tops+Collection"
				}
			],
			"products":  [
				{
				"id":  "1",
				"title":  "Best Black T-Shirt",
				"url":  "https://bing.com/images/search?q=Best+Black+T-Shirt",
				"brand":  "Dior",
				"price":  6.12,
				"image":  "https://assets.ajio.com/medias/sys_master/root/h78/h6d/13022058709022/-1117Wx1400H-440979854-black-MODEL.jpg"
				}
			]
		},
	};
	
	let searchElement = document.getElementById("search-box");
	let mySuggestionBox =  new SuggestionBox(searchElement, configs);
	// Call init() to inititalize the suggestion box
	mySuggestionBox.init();
</script>
```

## Changing data
You can update your datasets by the way bellow.
```
	mySuggestionBox.configs.datasets = yourData;
	mySuggestionBox.update();
```


## Display options
You can change the display option with `setConfig` function.
```
	// setConfig(configName, value);
	
	// Do not display products suggestion
	mySuggestionBox.setConfig("isGetProduct", false);
```
