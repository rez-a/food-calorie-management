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
            // { id: 0, name: 'Steak Dinner', calories: 1200 },
            // { id: 1, name: 'Cookie', calories: 400 },
            // { id: 2, name: 'Eggs', calories: 300 }
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
        },
        addItem: function(name, calories) {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            calories = parseInt(calories);

            const newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem;
        }
    }

})();

// UI Controller
const UICtrl = (function() {
    const UISelector = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelector.itemNameInput).value,
                calories: document.querySelector(UISelector.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            document.querySelector(UISelector.itemList).style.display = 'flex';
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between';
            li.id = `item-${item.id}`;
            li.innerHTML = `
                    <div>
                    <strong>${item.name}: </strong> <em> ${item.calories}</em>
                </div>
                <a href="#" class="secondary-content">
                    <i class="bi bi-pen-fill text-success"></i>
                </a>
            `;
            document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function() {
            document.querySelector(UISelector.itemNameInput).value = '';
            document.querySelector(UISelector.itemCaloriesInput).value = '';
        },
        hideList: function() {
            document.querySelector(UISelector.itemList).style.display = 'none';
        },
        getSelector: function() {
            return UISelector;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {


    const loadEventListeners = function() {
        const UISelector = UICtrl.getSelector();
        document.querySelector(UISelector.addBtn).addEventListener('click', itemAddSubmit);
    }

    const itemAddSubmit = function(e) {
        const Input = UICtrl.getItemInput();

        if (Input.name.trim() !== '' && Input.calories.trim() !== '') {
            const newItem = ItemCtrl.addItem(Input.name, Input.calories);
            UICtrl.addListItem(newItem);
            UICtrl.clearInput();
        }
        e.preventDefault();
    }


    //Public methos
    return {
        init: function() {
            const items = ItemCtrl.getItems()
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }

            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);


// Initialize App
App.init();