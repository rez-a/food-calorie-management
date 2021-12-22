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
        },
        getItemById: function(id) {
            let found;
            data.items.forEach(item => {
                if (item.id === id) {
                    found = item;
                }
            })
            return found;
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        updateItem: function(name, calories) {
            calories = parseInt(calories);
            let found;
            data.items.forEach(item => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })
            return found;
        },
        deleteItem: function(id) {
            const ids = data.items.map(item => { return item.id });
            const index = ids.indexOf(id);
            data.items.splice(index, 1);
        },
        clearAllItems: function() {
            data.items = [];
        },
        getTotalCalories: function() {
            let total = 0;
            data.items.forEach(item => {
                total += item.calories;
            })
            data.totalCalories = total;
            return data.totalCalories;
        }
    }

})();

// UI Controller
const UICtrl = (function() {
    const UISelector = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        item: '.list-group-item',
        clearBtn: '#clear-all'
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
                                <i class="bi bi-pen-fill edit-item text-success"></i>
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
                    <i class="bi bi-pen-fill edit-item text-success"></i>
                </a>
            `;
            document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li);
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelector.totalCalories).textContent = totalCalories;
        },
        clearInput: function() {
            document.querySelector(UISelector.itemNameInput).value = '';
            document.querySelector(UISelector.itemCaloriesInput).value = '';
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelector.addBtn).style.display = 'inline-block';
            document.querySelector(UISelector.backBtn).style.display = 'none';
            document.querySelector(UISelector.deleteBtn).style.display = 'none';
            document.querySelector(UISelector.updateBtn).style.display = 'none';
        },
        showEditState: function() {
            document.querySelector(UISelector.addBtn).style.display = 'none';
            document.querySelector(UISelector.backBtn).style.display = 'inline-block';
            document.querySelector(UISelector.deleteBtn).style.display = 'inline-block';
            document.querySelector(UISelector.updateBtn).style.display = 'inline-block';
        },
        addItemToForm: function() {
            document.querySelector(UISelector.itemNameInput).value = ItemCtrl.getCurrentItem().name
            document.querySelector(UISelector.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelector.item)
            listItems = Array.from(listItems);
            listItems.forEach(listItem => {
                let itemID = listItem.getAttribute('id')
                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <div>
                    <strong>${item.name}: </strong> <em> ${item.calories}</em>
                </div>
                <a href="#" class="secondary-content">
                    <i class="bi bi-pen-fill edit-item text-success"></i>
                </a>
                    `;
                }
            })
        },
        deleteListItem: function(id) {
            const itemID = `item-${id}`;
            const item = document.querySelector(`#${itemID}`)
            item.remove();
        },
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelector.item);
            listItems = Array.from(listItems);
            listItems.forEach(item => { item.remove() })
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
        document.querySelector(UISelector.itemList).addEventListener('click', itemEditClick);
        document.querySelector(UISelector.updateBtn).addEventListener('click', itemUpdateSubmit);
        document.querySelector(UISelector.deleteBtn).addEventListener('click', itemDeleteSubmit);
        document.querySelector(UISelector.backBtn).addEventListener('click', UICtrl.clearEditState);
        document.querySelector(UISelector.clearBtn).addEventListener('click', clearAllItems)
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.code === 'Enter') {
                e.preventDefault();
                return false;
            }
        })
    }

    const itemAddSubmit = function(e) {
        const Input = UICtrl.getItemInput();

        if (Input.name.trim() !== '' && Input.calories.trim() !== '') {
            const newItem = ItemCtrl.addItem(Input.name, Input.calories);
            UICtrl.addListItem(newItem);

            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    const itemEditClick = function(e) {
        if (e.target.classList.contains('edit-item')) {
            const listId = e.target.parentNode.parentNode.id;
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);
            const itemToEdit = ItemCtrl.getItemById(id);
            ItemCtrl.setCurrentItem(itemToEdit);
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    }

    const itemUpdateSubmit = function(e) {
        const input = UICtrl.getItemInput();
        const updateItem = ItemCtrl.updateItem(input.name, input.calories);
        UICtrl.updateListItem(updateItem);
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.clearEditState();

        e.preventDefault()
    }

    const itemDeleteSubmit = function(e) {
        const currentItem = ItemCtrl.getCurrentItem();
        ItemCtrl.deleteItem(currentItem.id);
        UICtrl.deleteListItem(currentItem.id);
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.clearEditState();
        e.preventDefault()
    }

    const clearAllItems = function() {
        ItemCtrl.clearAllItems();
        const totalCalories = ItemCtrl.getTotalCalories();
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.removeItems();
    }


    //Public methos
    return {
        init: function() {
            UICtrl.clearEditState();
            const items = ItemCtrl.getItems()
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }

            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);


// Initialize App
App.init();