//Add Id to Button Element
//Just like when you implemented the delete functionality, you needed the recipe id added to the end of the id attribute of the delete button. 
//The edit button needs the same thing so that you can capture which recipe to edit.


const createRecipeCard = recipe => `
    <section class="recipe--${recipe.id}">
        <header class="recipe__title">
            ${recipe.title}
        </header>
        <div class="recipe__instructions">
            ${recipe.instructions}
        </div>
        <button id="editRecipe--${recipe.id}">
            Edit Recipe
        </button>
        <button id="deleteRecipe--${recipe.id}">
            Delete Recipe
        </button>
    </section>
`
//Capture the Edit Button Click 
//As before, let the click event on the edit button bubble up to the <article> element.
//Then add another conditional to check if the edit button was clicked.

recipeList.addEventListener("click", event => {
    if (event.target.id.startsWith("editRecipe--")) {
        const recipeIdToEdit = event.target.id.split("--")[1]

        /*
            This function will get the recipe from the API
            and populate the form fields (see below)
        */
        updateFormFields(recipeIdToEdit)
    }
})

//Once you have extracted the id of the recipe to be editing, send a GET request to your API to get the current state of that recipe.
//Then, represent that current state in your user interface by setting the value of the appropriate input fields in your form.

const updateFormFields = recipeId => {

    // Get reference to input fields in the form
    const hiddenRecipeId = document.querySelector("#recipeId")
    const recipeTitleInput = document.querySelector("#recipeTitle")
    const recipeInstructionsInput = document.querySelector("#recipeInstructions")

    fetch(`http://localhost:8088/recipes/${recipeId}`)
        .then(response => response.json())
        .then(recipe => {
            /*
                Now that you KNOW you have the data, render
                an editing form that represents the current
                state of the resource.
            */
            hiddenRecipeId.value = recipe.id // Hidden value. User no see. 🙈
            recipeTitleInput.value = recipe.title
            recipeInstructionsInput.value = recipe.instructions
        })
}

//Since you are simply updating your existing form with values for an edit operation, you application needs to know that when the user clicks the "Save" button, information should not be created in the API, but updated.


saveButton.addEventListener("click", event => {
    const hiddenRecipeId = document.querySelector("#recipeId")

    if (hiddenRecipeId.value !== "") {
        editRecipe(recipeId)
    } else {
        // Save functionality goes here
    }
}


const editRecipe = id => {
    const updatedObject = {
        title: document.querySelector("#recipeTitle").value,
        instructions: document.querySelector("#recipeInstructions").value
    }

    // Logic for the PUT operation
    fetch(`http://localhost:8088/resource/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedObject)
    })
    .then(res => res.json())
    .then(() => {
        /*
            Since this is the point in the code where you KNOW
            the operation completed successfully, clear the
            value of the hidden input field to that your
            application is back to the state of creating instead
            of editing
        */
        document.querySelector("#recipeId").value = ""
    })

}
