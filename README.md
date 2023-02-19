# SEI Project 2: RECIPE FINDER

## Description & Deployment Link

Recipe Finder is an app to help users decide what to cook next, for a quiet dinner or a dinner party. The app lets users sort by category, as well as search all recipes for a particular dish.

We built this in a team of two, after just over a week of learning React. It was my first experience using React to build a full front-end app, as well as my first experience using the Material UI component library. The app consumes TheMealDB, a public REST API, and was built over 4 days.

### Link to deployed site:

https://louis-recipefinder.netlify.app/￼

<br />

---

<br />

## Installation

- Clone the repository
- cd into the project directory
- Run npm install
- Run npm start
- Open http://localhost:3001/ in the browser (or whichever port you are running the app on)
- Enjoy tasty recipes from around the world

<br />

---

<br />

## Brief

The brief was to build a front-end application using React, with the following conditions:

> - Must consume a public API – this could be anything but it must make sense for the project.
> - Must have several functional components.
> - Should have a router with several “pages”.
> - The team should use wireframes to design before building the app.
> - The app must be deployed online and accessible to the public.

<br />

---

<br />

## Timeframe & Working Team

This was a 4-day project, working in a team of 2:

- [Louis Grant](https://github.com/ljsgrant/) (me)
- [Melanie Speckens](https://github.com/elanieca/)

<br />

---

<br />

## Technologies Used

### Front End:

- React
- Axios
- React-Router-DOM
- Sass
- Material UI

### API:

- [The Meal DB](https://www.themealdb.com/api.php)

### Other Tools:

- Postman
- VS Code
- Git
- GitHub
- Chrome DevTools
- Excalidraw (for wireframing)

<br />

---

<br />

## Planning

From our first module projects we’d learned the importance of taking time to discuss and plan a project before jumping in and starting to code, and figured this went double when working in a shared repository with the potential for merge conflicts. We were both keen to do something with recipes, and spent the night before the first full project day testing APIs. We settled on TheMealDB as having a good range of data and a variety of endpoints. We then took the first half of our first day as our planning time, drew out wireframes, and figured out which components we’d need so we could divide up responsibilities. We decided on a structure that nested each “page” component within a sidebar nav component:

![Project wireframes](/readme_assets/project-2-wireframes.png)


We also made the decision to use a component library. We both wanted to challenge ourselves a bit beyond what we’d covered in class, and decided this was a good opportunity to experiment with Material UI, as a balance between range of features and ease of use. We spent some of our planning time looking through the MUI documentation, making sure we had at least an elementary grasp of how to use MUI components in the project.

Our visual design for the site was inspired by the MUI Paper component, which makes it easy to control the drop shadow and apparent “height” of the component through a single “elevation” prop. As all the recipes in the API are from different sources and cover a load of different cuisines, we wanted the site to have a bit of a scrapbook vibe - like recipes clipped from magazines and stuck in a binder.

<br />

---

<br />

## Programming

We started with some pair programming, to set up the App.js and the routes we needed. As we had a fairly basic site structure, we decided to make most of the routes and add placeholders for our main components early on, meaning that we could work within our own components and keep our work separate as we built out functionality, to avoid merge conflicts.

We decided that while Mell would work more on large structural pages, like the list of recipes and list of ingredients, I would make repeatable ‘card’ components which would be used by the larger pages to display a brief summary of each recipe and category in lists. Then while Mell incorporated these in her components, I would work on the main RecipeShow component, to display a full recipe with its image, ingredients, and instructions.

I began by making a basic RecipeCard for Mell to use on the landing page. This needed to be a summary of the recipe, so I gave the component props for recipe name, imageUrl and recipeId, which would be passed in from the card’s parent component when mapping over the array of recipes from the API. To structure the component I used Material UI’s Card component, using the CardMedia to display the image, and MUI Typography components for the text. 

Final version shown here in the deployed site:

![Main page](/readme_assets/project-2-main-page.png)

In order to test the component in isolation and check everything looked right, and without a parent component yet to pass props from, I added a useEffect hook with a temporary API request for a single recipe, set some state for the `testRecipe`, and passed in the values:

```js
<Card sx={{ maxWidth: 400, borderRadius: '5px' }}>
         {' '}
  <Link>
             {' '}
    <CardMedia
      sx={{ maxHeight: 90 }}
      component="img"
      height="140"
      image={testRecipe.meals[0].strMealThumb}
      alt={testRecipe.meals[0].strMeal}
    />
              <CardContent sx={{ paddingBottom: 0 }}>
                 {' '}
      <Typography gutterBottom variant="h5" component="div">
                      {testRecipe.meals[0].strMeal}           {' '}
      </Typography>
                  <Typography variant="body2" color="text.secondary">
                      <span>{testRecipe.meals[0].strCategory}</span> ·          
            <span> {testRecipe.meals[0].strArea}</span> |              {' '}
        <span>
                          <Link size="small"> Make this recipe</Link>           
           {' '}
        </span>
                   {' '}
      </Typography>         {' '}
    </CardContent>       {' '}
  </Link>
       {' '}
</Card>
```

Satisfied everything was working correctly, I removed the API request, replaced the `testRecipe` values with the component’s props, and handed the component off to Mell to use in the Landing component.

<br />

### RecipeShow

![Recipe page](/readme_assets/project-2-recipe.png)

Next I moved onto the RecipeShow component to display a recipe in detail. I added the `useParams` hook to get the `recipeId` from the URL, and a `useEffect` hook with a request to the API, passing in the `recipeId` to our helper function, which uses axios to make the GET request. I added the `recipeId` as a dependency for the `useEffect`, so we make a new request whenever the `recipeId` changes. Finally I set state for the recipe from the response data:

```js
getSingleRecipe = (recipeId) =>
  axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
```

```js
useEffect(() => {
  getSingleRecipe(recipeId)
    .then((response) => {
      setRecipe(response.data.meals[0]);
    })
    .catch((err) => console.error(err));
}, [recipeId]);
```

### Processing the recipe data

Every recipe has a set of instructions and a list of ingredients, and I wanted to show the ingredients in a table, and the instructions to be a step-by-step list. However this isn’t how the API data is structured, so I would need to process the data first.
To keep things modular I made components for Ingredients and Instructions.

#### Recipe Instructions

I tackled the instructions first. They are stored in the database as a single string - way too much of a wall of text to show directly on the page! As the recipes don’t have a standard format for their instructions, I decided that it was simplest to split the recipe string into sentences, and use these as the steps. To achieve this I used the `Array.split()` method to turn the string into an array of sentences, splitting the string wherever there is a full stop followed by a space. I then filtered the results to remove any empty strings:

```js
const Instructions = ({ strInstructions }) => {
  const instructionsArray = strInstructions
    .split('.')
    .filter((instruction) => instruction !== '');
```

This works pretty well for most recipes, but it’s admittedly not the most elegant solution, and occasionally makes instructions that aren’t really a proper step to the recipe - occasionally we get one that just says something like “You can use a spoon for this”, hardly a step of the recipe. With more time I would like to go back in and add conditional logic to account for different instruction formats: for example, if a recipe contains numbers in ascending order this could suggest numbered steps, and we could split the recipe at these points instead. More testing would be needed to develop logic that works for all the various formats that instructions could be written in.

Once I had the instructions array, in the return statement of the component I added a MUI Box component, making it an unordered list with the component prop, and then mapped over the array to produce a list item from each step in the array:

```js
<Box component="ul" sx={{ padding: '10px', listStyle: 'circle' }}>
         {' '}
  {instructionsArray.map((step) => (
    <li key={step}>{step}</li>
  ))}
       {' '}
</Box>
```

#### Recipe Ingredients

Knowing that I wanted the ingredients to be displayed with the ingredient on the left and quantity on the right, I chose to use MUI’s Table component - but the ingredients are stored in the database as individual fields for each ingredient and quantity and some are usually empty in every recipe.

As there are always the same amount of ingredients fields in every recipe, I used `Object.values()` with `Array.slice()` to make one array of ingredients and one of quantities, and then a for loop to push each ingredient and its quantity into a combined array, in sequence:

```js
useEffect(() => {
  getSingleRecipe(recipeId)
    .then((response) => {
      setRecipe(response.data.meals[0]);
      setIngredients(ingredientsArray(response.data.meals[0]));
    })
    .catch((err) => console.error(err));
}, [recipeId]);

function ingredientsArray(wholeRecipe) {
  const ingredientsItems = Object.values(wholeRecipe).slice(9, 29);
  const ingredientsQuantities = Object.values(wholeRecipe).slice(29, 49);
  const combinedIngredients = [];
  for (let i = 0; i < ingredientsItems.length; i++) {
    if (ingredientsItems[i] !== '' && ingredientsItems[i] !== null) {
      combinedIngredients.push([ingredientsItems[i], ingredientsQuantities[i]]);
    }
  }
  return combinedIngredients;
}
```

Using `Array.slice()` here was a quick and dirty way of achieving the results, and only works because the meal object from the API has exactly the same structure for every recipe, so ingredients and quantities will always be found at the same indices. I think a better and more readable solution in the long run would be to instead use `Object.entries()` to return all the key-value pairs in the recipe, filter for any that contain “ingredient” and “quantity” respectively, and then push the value, minus the key, into the `ingredientsItems` and `ingredientsQuantities` arrays.

Finally in the Ingredients component, I make an object from each ingredient and its quantity, with one key-value pair for ingredient and one for quantity, push this into a rows array, before mapping over this to create the cells of the MUI table:

```js
 {rows.map((row) => (
              <TableRow
                key={`${row.ingredient + row.quantity}`}
                sx={{ ‘&:last-child td, &:last-child th’: { border: 0 } }}
              >
                <TableCell align=“right”>{row.ingredient}</TableCell>
                <TableCell align=“right”>{row.quantity}</TableCell>
              </TableRow>
            ))}
```

### Responsive Design for recipe page

Next I spent a while styling up the Recipe page and making it responsive, using MUI’s breakpoints for speed’s sake. On the widest screens I use a full-width UI, with MUI’s Paper component chosen for the sections of the recipe to give a scrapbook-like feel, and Mell has styled the MUI App Bar component to be always always visible across the site at these widths. On smaller screens I set the display property of the main photo to none, instead increasing the height of the title container, allowing more of the background-image, with its background-size set to cover, to be seen. On the smallest screens, the ingredients and method are also hidden, and instead I use an accordion so users can see the structure of the page and expand the ingredients and instructions as they wish:

![Responsive recipe page](/readme_assets/project-2-recipe-responsive.gif)

### Search

On the final day I wrote a search function that would allow the user to search by recipe name. Functionality shown here in the deployed app:

![Responsive recipe page](/readme_assets/project-2-search.gif)

Here I stepped away from reality a little – there is already an endpoint from TheMealDB for searching by meal name, and in a production setting I wouldn’t have handled search logic on the front end if I had access to back-end search…! However, I wanted the challenge and figured I’d learn more for future projects by writing the search in the front end than by just making a request to the existing search endpoint. Additionally, I rationalised this with the fact that the API’s search returns an entire recipe, whereas we just needed the titles and images. Still, not super realistic to decide to do it this way, but I wanted the experience. To streamline the app I may go back and change this at some point to simply use the API’s endpoint.

In order to get the search working, I needed a list of all recipes, but there isn’t an endpoint to return every recipe in the database. To achieve this I first made a request for the list of all categories and then looped over each category with a `forEach`, spreading its recipes into an array before setting state for `allRecipes` with the resulting array:

```js
useEffect(() => {
  const categoryNames = categories.map((category) => category.strCategory);
  let recipes = [];
  categoryNames.forEach((category) => {
    getCategoryContents(category)
      .then((response) => {
        recipes = [...recipes, ...response.data.meals];
        setAllRecipes(recipes);
      })
      .catch((err) => console.error(err));
  });
}, []);
```

I then wrote a `filterRecipes` function that uses the search string as a regular expression to `.filter()` the `allRecipes` array, and returns all meals with a name (the `strMeal` field)  that has a match for the regex.

```js
const filterRecipes = () => {
  const regex = new RegExp(searchString, 'i');
  setSearchResults(
    allRecipes?.filter((recipe) => {
      return recipe.strMeal.match(regex);
    })
  );
};
```

Initially I called this function in the same `useEffect` where we get the API data, but of course this is unnecessary – we’re processing our data on the front end, so there is no need to get the same data every time the user changes the query. I split this out into two `useEffect`s, one to fetch the data and sort it and sets state when the component mounts and another with `searchString` as a dependency, so we just filter the data whenever the user changes the search query, rather than calling the same data again:

```js
useEffect(() => {
  filterRecipes();
}, [searchString]);
```

Again, not hugely realistic to do all this on the front end - but if nothing else this let me experience exactly why it’s better to do this on the back end…! The search is fairly laggy on a system with less processing power. If there is any perceptible lag, it will also cause noticeable lag before the user’s typing renders in the search bar! Not good.

That said, this could probably be improved a bit by debouncing the function, to allow the user’s text to render into the search bar before the search function fires, rather than rendering it after along with the search results. Removing the continuous search as the user types would also help, instead using `onSubmit` to fire the search once the user has typed their query.

### Final Styling

Once we were happy with our functionality for the deadline, we ended like we started, with pair programming to tweak the styles over Zoom via screen share, discussing and polishing the final look of the site. We used MUI icons for the site header and for each of the nav links, added colour to the sidebar to tie it in with the theme of the site,. And tweaked the layout to reduce the amount of empty white space.

<br/>

---

<br/>

## Challenges

- Having only had about a week to learn React before starting the project, I was still a bit shaky on when to set state and how to read data from state, often finding I was trying to access a value that hadn’t been set yet. The majority of my bugs in this project came from useState and useEffect. However, having to confront this head on to understand and fix these bugs meant that by the end of the project I was vastly more confident with hooks and the concept of setting state.
- Using the Material-UI component library without having a lot of time to fully read the docs meant I was feeling my way with some of our uses of MUI components. There are definitely a few fairly hacky uses of the components in the project. We also overused the sx prop, essentially meaning that a lot of our styling for the project was done inline - not great. I took this as a lesson learned for [the next project](https://github.com/ljsgrant/ga-project-03-client) on the course, using Sass for the majority of styling and just using sx for isolated tweaks to single components.
- TheMealDB API has several endpoints, and the data that each returns isn’t always ideal for our purposes, so processing the data into a format that worked for us took more time than it might have done in a full stack project where we had full control of the shape of the data in the database.

<br />

---

<br />

## Wins

- One of the aspects of this project I’m proudest about was our communication: we always made sure at the beginning of the day to run through everything we wanted to work on in stand-up, made a point of communicating clearly during pull requests, and discussed new features before starting work on them, to make sure we were both on the same page and wouldn’t find ourselves working on the same component. Thanks to this we managed to avoid any merge conflicts, could plan our time to avoid blocking each other, and delivered features and components to each other in time for them to be incorporated into other components.
- I’m also really happy with how the responsive design for the RecipeShow component turned out, and Mell also did a great job on the responsive design for the landing page. The different UI for desktop, laptop, tablet and mobile screens would be an essential feature to allow users to easily navigate recipes while browsing and cooking in different situations with different devices.

| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |
| :-------------------------:|:-------------------------: |
| ![Extra large desktop recipe layout](/readme_assets/project-2-recipe-responsive_5.png) ![Large desktop recipe layout](/readme_assets/project-2-recipe.png) ![Small desktop recipe layout](/readme_assets/project-2-recipe-responsive_1.png)  ![Tablet recipe layout](/readme_assets/project-2-recipe-responsive_2.png)   |  ![Mobile recipe layout](/readme_assets/project-2-recipe-responsive_4.png) | 


<!-- ![Small desktop recipe layout](/readme_assets/project-2-recipe.png) -->
<!-- ![Large desktop recipe layout](/readme_assets/project-2-recipe-responsive_1.png) -->
<!-- ![Tablet recipe layout](/readme_assets/project-2-recipe-responsive_2.png) -->

<!-- ![Mobile recipe layout](/readme_assets/project-2-recipe-responsive_4.png) -->

<br />

---

<br />

## Key Learnings/Takeaways

- I started the project feeling like I only had a loose grasp of a lot of the concepts in React, but having the opportunity to pull things apart, break them and then fix them again throughout the project meant that by the deadline I was far more comfortable and confident in my abilities.
- Taking time to carefully read the documentation for a new technology will avoid wasting time later fixing bad code!

<br />

---

<br />

## Bugs

- Due to the inconsistent format of recipe data from the API, some recipes don’t play nice with the array methods I’m using to split the ingredients and instructions, giving undesired results. Adding more conditional logic to account for different recipe formats could improve this.

<br />

---

<br />

## Future Improvements

- If we had been using the paid API rather than the free public API, we would have had access to an endpoint which takes multiple ingredients as queries, and returns all recipes that use those ingredients. This would really take the site to the next level - being able to input a handful of ingredients from the cupboard, and have the app tell you what to cook with those ingredients.
- Splitting recipe instructions into steps more elegantly, depending on the format of the instructions; adding conditional logic to handle different formats.
- Some tweaks to the styling of the RecipeShow component, so the image, ingredients and instructions are the same height on the page.
