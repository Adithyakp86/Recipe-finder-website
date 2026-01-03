// Sample recipe data
const recipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        prepTime: "15 mins",
        cookTime: "15 mins",
        difficulty: "Medium",
        rating: 4.8,
        image: "https://source.unsplash.com/400x300/?pasta,food",
        category: "Dinner"
    },
    {
        id: 2,
        title: "Chocolate Chip Cookies",
        description: "Delicious homemade cookies with chocolate chips, crispy outside and chewy inside.",
        prepTime: "15 mins",
        cookTime: "12 mins",
        difficulty: "Easy",
        rating: 4.7,
        image: "https://source.unsplash.com/400x300/?cookies,baking",
        category: "Desserts"
    },
    {
        id: 3,
        title: "Caesar Salad",
        description: "Fresh romaine lettuce with creamy Caesar dressing, croutons, and parmesan.",
        prepTime: "10 mins",
        cookTime: "0 mins",
        difficulty: "Easy",
        rating: 4.5,
        image: "https://source.unsplash.com/400x300/?salad,healthy",
        category: "Lunch"
    },
    {
        id: 4,
        title: "Vegetable Stir Fry",
        description: "Colorful vegetables stir-fried in a savory sauce, perfect with rice or noodles.",
        prepTime: "15 mins",
        cookTime: "10 mins",
        difficulty: "Easy",
        rating: 4.6,
        image: "https://source.unsplash.com/400x300/?stirfry,vegetables",
        category: "Dinner"
    },
    {
        id: 5,
        title: "Avocado Toast",
        description: "Fresh avocado on toasted bread with herbs and spices, perfect for breakfast.",
        prepTime: "5 mins",
        cookTime: "5 mins",
        difficulty: "Easy",
        rating: 4.4,
        image: "https://source.unsplash.com/400x300/?avocado,toast",
        category: "Breakfast"
    },
    {
        id: 6,
        title: "Beef Tacos",
        description: "Soft tortillas filled with seasoned ground beef, lettuce, cheese, and salsa.",
        prepTime: "15 mins",
        cookTime: "15 mins",
        difficulty: "Medium",
        rating: 4.9,
        image: "https://source.unsplash.com/400x300/?tacos,mexican",
        category: "Dinner"
    },
    {
        id: 7,
        title: "Fruit Smoothie",
        description: "Refreshing blend of seasonal fruits with yogurt or milk, perfect for breakfast.",
        prepTime: "5 mins",
        cookTime: "0 mins",
        difficulty: "Easy",
        rating: 4.3,
        image: "https://source.unsplash.com/400x300/?smoothie,drink",
        category: "Beverages"
    },
    {
        id: 8,
        title: "Grilled Chicken Salad",
        description: "Tender grilled chicken over mixed greens with vegetables and vinaigrette.",
        prepTime: "15 mins",
        cookTime: "10 mins",
        difficulty: "Medium",
        rating: 4.7,
        image: "https://source.unsplash.com/400x300/?chickensalad,healthy",
        category: "Lunch"
    }
];

// DOM Elements
const recipeGrid = document.getElementById('recipe-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayRecipes(recipes);
    setupEventListeners();
});

// Function to display recipes
function displayRecipes(recipesToDisplay) {
    recipeGrid.innerHTML = '';
    
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <div class="recipe-image" style="background-image: url('${recipe.image}')"></div>
            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.prepTime} + ${recipe.cookTime}</span>
                    <span class="recipe-rating">
                        <i class="fas fa-star"></i> ${recipe.rating}
                    </span>
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-actions">
                    <button class="recipe-btn recipe-view-btn">View Recipe</button>
                    <button class="recipe-btn recipe-save-btn">Save</button>
                </div>
            </div>
        `;
        recipeGrid.appendChild(recipeCard);
    });
}

// Function to set up event listeners
function setupEventListeners() {
    // Search button click event
    searchBtn.addEventListener('click', performSearch);
    
    // Search input keyup event (for Enter key)
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Category card click events
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent;
            filterByCategory(category);
        });
    });
    
    // Recipe card button events
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('recipe-view-btn')) {
            viewRecipe(event);
        } else if (event.target.classList.contains('recipe-save-btn')) {
            saveRecipe(event);
        }
    });
}

// Function to perform search
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayRecipes(recipes);
        return;
    }
    
    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) || 
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.category.toLowerCase().includes(searchTerm)
    );
    
    displayRecipes(filteredRecipes);
}

// Function to filter by category
function filterByCategory(category) {
    const filteredRecipes = recipes.filter(recipe => 
        recipe.category.toLowerCase() === category.toLowerCase()
    );
    
    displayRecipes(filteredRecipes);
    
    // Update search input to show the category
    searchInput.value = category;
}

// Function to view a recipe
function viewRecipe(event) {
    const recipeCard = event.target.closest('.recipe-card');
    const recipeTitle = recipeCard.querySelector('.recipe-title').textContent;
    
    // Find the recipe object based on the title
    const recipe = recipes.find(r => r.title === recipeTitle);
    
    if (recipe) {
        // Create a modal or redirect to recipe details page
        showRecipeDetails(recipe);
    }
}

// Function to show recipe details in a modal
function showRecipeDetails(recipe) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'recipe-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div class="recipe-details">
                <h2>${recipe.title}</h2>
                <div class="recipe-image-large" style="background-image: url('${recipe.image}')"></div>
                <div class="recipe-meta-large">
                    <span><i class="fas fa-clock"></i> Prep: ${recipe.prepTime}</span>
                    <span><i class="fas fa-clock"></i> Cook: ${recipe.cookTime}</span>
                    <span class="recipe-rating-large"><i class="fas fa-star"></i> ${recipe.rating}</span>
                    <span class="recipe-difficulty">${recipe.difficulty}</span>
                </div>
                <p class="recipe-description-large">${recipe.description}</p>
                <div class="recipe-instructions">
                    <h3>Ingredients:</h3>
                    <ul>
                        <li>2 cups all-purpose flour</li>
                        <li>3 tsp baking powder</li>
                        <li>1 tsp salt</li>
                        <li>1 tbsp sugar</li>
                        <li>1 egg</li>
                        <li>1¼ cups milk</li>
                        <li>3 tbsp melted butter</li>
                    </ul>
                    <h3>Instructions:</h3>
                    <ol>
                        <li>Mix dry ingredients in a large bowl</li>
                        <li>Combine wet ingredients in another bowl</li>
                        <li>Pour wet ingredients into dry ingredients</li>
                        <li>Stir until just combined</li>
                        <li>Heat griddle or pan over medium heat</li>
                        <li>Pour ¼ cup batter for each pancake</li>
                        <li>Cook until bubbles form, then flip</li>
                        <li>Cook until golden brown</li>
                    </ol>
                </div>
                <button class="recipe-close-btn">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when close button is clicked
    modal.querySelector('.close-btn').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Close modal when close button is clicked
    modal.querySelector('.recipe-close-btn').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Function to save a recipe
function saveRecipe(event) {
    const recipeCard = event.target.closest('.recipe-card');
    const recipeTitle = recipeCard.querySelector('.recipe-title').textContent;
    
    event.target.textContent = 'Saved!';
    event.target.style.backgroundColor = '#2ecc71';
    
    setTimeout(() => {
        event.target.textContent = 'Save';
        event.target.style.backgroundColor = '#ecf0f1';
    }, 1000);
    
    console.log(`Recipe saved: ${recipeTitle}`);
}

// Function to handle navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const linkText = this.textContent.trim();
            
            switch(linkText) {
                case 'Home':
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    break;
                case 'Categories':
                    const categoriesSection = document.querySelector('.categories');
                    if (categoriesSection) {
                        categoriesSection.scrollIntoView({behavior: 'smooth'});
                    }
                    break;
                default:
                    break;
            }
        });
    });
}

// Function to handle theme toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme in localStorage or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Toggle icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Call the navigation and theme toggle setup functions
setupNavigation();
setupThemeToggle();