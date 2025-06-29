// This array represents your recipe data. In a real application, this might come from an API or a database.
// You were instructed to copy this content into your recipes.js file.
const recipesData = [
    {
        id: 'Apple Crisp',
        name: 'Apple Crisp',
        image: 'images/apple_crisp.jpg',
        tags: ['apple', 'yummy'],
        time: '1 hour',
        servings: '4 servings',
        rating: 4,
        description: 'This apple crisp recipe is a simple yet delicious fall dessert that\'s great served warm with vanilla ice cream.'
    },
    {
        id: 'Jello Cheesecake',
        name: 'Jello Cheesecake',
        image: 'images/jello_cheesecake.jpg',
        tags: ['frozen', 'yummy'],
        time: '12 hours',
        servings: '5 servings',
        rating: 5,
        description: 'The Best desert in the whole world. prepped for 30 mins and frozen over night. Best shared with friends.'
    },
    {
        id: 'Coffee Cake',
        name: 'Coffee Cake',
        image: 'images/coffeecake.jpg',
        tags: ['breakfast', 'baked'],
        time: '1 hour',
        servings: '6 servings',
        rating: 4,
        description: '***Does not contain Coffee*** great breakfast item, filled with gooey brown sugar goodness.'
    }
]; 

// Get the div where recipes will be displayed
const recipeListElement = document.getElementById('recipeList');
// Get the search input and form
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

/**
 * Generates the HTML string for star ratings.
 * @param {number} rating - The numerical rating (e.g., 3.5, 4, 5).
 * @returns {string} HTML string with star icons.
 */
function getStarRatingHTML(rating) {
    const maxRating = 5;
    let starsHtml = '';
    // Loop to add filled stars
    for (let i = 0; i < Math.floor(rating); i++) {
        starsHtml += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    }
    // Add half star if applicable (though example only shows full/empty)
    if (rating % 1 !== 0) {
        // For simplicity, we'll just add a full star or empty star.
        // If you need half stars, you'd add a different icon/logic here.
        starsHtml += `<span aria-hidden="true" class="icon-star">⭐</span>`; // Treating half as full for display
    }
    // Loop to add empty stars
    for (let i = 0; i < (maxRating - Math.ceil(rating)); i++) {
        starsHtml += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }

    // Include aria-label for screen reader accessibility
    return `<span class="rating" role="img" aria-label="Rating: ${rating} out of ${maxRating} stars">${starsHtml}</span>`;
}

function getRandomListEntry(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

/**
 * Renders an array of recipe objects into the DOM.
 * @param {Array<Object>} recipes - An array of recipe objects to display.
 */
function displayRecipes(recipes) {
    recipeListElement.innerHTML = ''; // Clear existing recipes
    if (recipes.length === 0) {
        recipeListElement.innerHTML = '<p class="no-results">No recipes found matching your search.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        // Dynamically create the HTML for each recipe card
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" onerror="this.onerror=null;this.src='https://placehold.co/400x200/cccccc/333333?text=Image+Not+Found';">
            <div class="recipe-info">
                <h3 class="recipe-name">${recipe.name}</h3>
                <p class="recipe-tags">${recipe.tags.map(tag => `#${tag}`).join(' ')}</p>
                <div class="recipe-meta">
                    <span class="recipe-time">🕒 ${recipe.time}</span>
                    <span class="recipe-servings">🍽️ ${recipe.servings}</span>
                    ${getStarRatingHTML(recipe.rating)}
                </div>
                <p class="recipe-description">${recipe.description}</p>
            </div>
        `;
        recipeListElement.appendChild(recipeCard);
    });
}

/**
 * Filters recipes based on search input.
 * @param {string} searchTerm - The text to search for.
 * @returns {Array<Object>} Filtered array of recipe objects.
 */
function filterRecipes(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filtered = recipesData.filter(recipe =>
        recipe.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        recipe.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
    );

    // Sort alphabetically by name
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const randomRecipe = getRandomListEntry(recipesData);
    displayRecipes([randomRecipe]); // Display a single random recipe
});

searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
    const searchTerm = searchInput.value.trim(); // Get the trimmed search input
    const filtered = filterRecipes(searchTerm); // Filter recipes
    displayRecipes(filtered); // Display the filtered recipes
});

// Optional: Add a listener for real-time search as user types (debounced for performance)
let searchTimeout;
searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = searchInput.value.trim();
        const filtered = filterRecipes(searchTerm);
        displayRecipes(filtered);
    }, 300); // Wait 300ms after user stops typing
});
