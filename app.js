// Storage Controller

// Item Controller
const ItemCtrl = (function() {

    //Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure 
    const data = {
        item: [
            { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Cookie', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 }
        ],
        currentItem: null,
        totalCalories: 0
    }

    //Public method
    return {
        logData: function() {
            return data;
        }
    }

})();

// UI Controller
const UICtrl = (function() {

})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {


    //Public methos
    return {
        init: function() {
            console.log('Initializing App...')
        }
    }

})(ItemCtrl, UICtrl);


// Initialize App
App.init();