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
        items: [
            { id: 0, name: 'Steak Dinner', calories: 1200 },
            { id: 1, name: 'Cookie', calories: 400 },
            { id: 2, name: 'Eggs', calories: 300 }
        ],
        currentItem: null,
        totalCalories: 0
    }

    //Public method
    return {
        getItems: function() {
            return data.items;
        },
        logData: function() {
            return data;
        }
    }

})();

// UI Controller
const UICtrl = (function() {
    const UISelector = {
        itemList: '#item-list'
    }

    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(item => {
                html += `<li class="list-group-item d-flex justify-content-between" id="item-${item.id}">
                            <div>
                                <strong>${item.name}: </strong> <em> ${item.calories}</em>
                            </div>
                            <a href="#" class="secondary-content">
                                <i class="bi bi-pen-fill text-success"></i>
                            </a>
                        </li>`;
            })
            document.querySelector(UISelector.itemList).innerHTML = html;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {


    //Public methos
    return {
        init: function() {
            const items = ItemCtrl.getItems()
            UICtrl.populateItemList(items);
        }
    }

})(ItemCtrl, UICtrl);


// Initialize App
App.init();