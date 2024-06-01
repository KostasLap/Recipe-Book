let recipeBook = [];

loadRecipeBookFromLocalStorage();
displayBook();


function saveRecipeBookToLocalStorage() {
    localStorage.setItem("recipeBook", JSON.stringify(recipeBook));
}

function loadRecipeBookFromLocalStorage() {
    const storedRecipeBook = localStorage.getItem("recipeBook");
    if (storedRecipeBook) {
        recipeBook = JSON.parse(storedRecipeBook);
    }
}

function addRecipe(title, category, ingredients, instructions) {
    const newRecipe = {
        id: recipeBook.length ? recipeBook[recipeBook.length - 1].id + 1 : 1,
        title: title,
        category: category,
        ingredients: ingredients,
        instructions: instructions,
    };

    recipeBook.push(newRecipe);
    saveRecipeBookToLocalStorage();
    displayBook();
}

function displayBook(filteredRecipe = recipeBook) {
    const recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = "";

    filteredRecipe.forEach((recipe) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="addInner">
            <h3>${recipe.title}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        </div>
        `;

        const removeBtn = document.createElement("button"); 
        removeBtn.innerHTML = "Remove";

        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";


        listItem.appendChild(removeBtn);
        listItem.appendChild(editBtn)

        removeBtn.addEventListener("click",(e)=>{
            deleteRecipe(recipe.id);
            saveRecipeBookToLocalStorage();
           displayBook();      
        })


        editBtn.addEventListener("click",(e)=>{
            const content = `

            <div id="inner">
                <h3>${recipe.title} <input type="text" id="newTitle" placeholder="new Title" required</h3>
                <p><strong>Category:</strong> ${recipe.category} <input type="text" id="newCategory" placeholder="Change Category"></p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients} <textarea id="newIngredients" rows="1" placeholder="Sauce, oil, cheese"></textarea></p>
                <p><strong>Instructions:</strong> ${recipe.instructions} <textarea id="newInstructions" rows="1" placeholder="Instructions"></textarea></p>
                <button id="saveEdit">Save changes</button>
            </div>
        `
            listItem.innerHTML=`${content}`

            const saveBtn = document.getElementById("saveEdit");
            saveBtn.addEventListener("click",function(){
                if(document.getElementById("newTitle").value !==""){
                    recipe.title = document.getElementById("newTitle").value;
                }

                if(document.getElementById("newCategory").value !==""){
                    recipe.category = document.getElementById("newCategory").value;
                }

                if(document.getElementById("newIngredients").value !==""){
                    recipe.ingredients = document.getElementById("newIngredients").value;
                }

                if(document.getElementById("newInstructions").value !==""){
                    recipe.instructions = document.getElementById("newInstructions").value;
                }
                
                saveRecipeBookToLocalStorage();
                displayBook();
            })

            
        })
 
        recipeList.appendChild(listItem);
    });
}

function deleteRecipe(id){
    recipeBook = recipeBook.filter((recipe)=>recipe.id!==id);

}



document.querySelector("#AddRecipe").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;

    if (title !== "") {
        addRecipe(title, category, ingredients, instructions);
        document.getElementById("AddRecipe").reset();
    }
});

document.querySelector("#SearchForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const searchQuery = document.getElementById("Search").value.toLowerCase();
    const filteredRecipes = recipeBook.filter((recipe) => {
        return (
            recipe.title.toLowerCase().includes(searchQuery) ||
            recipe.category.toLowerCase().includes(searchQuery) ||
            recipe.ingredients.toLowerCase().includes(searchQuery) ||
            recipe.instructions.toLowerCase().includes(searchQuery)
        );
    });

    displayBook(filteredRecipes);
});






// Initial display
displayBook();
