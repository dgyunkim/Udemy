const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [],
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems() {
      return data.items;
    },
    addItem(name, calories, id) {
      calories = parseInt(calories);
      if (id === undefined) {
        if (data.items.length == 0) {
          id = 1;
        } else {
          id = data.items[data.items.length - 1].id + 1;
        }
      }
      const item = new Item(id, name, calories);
      data.items.push(item);
      data.totalCalories += calories;
      return item;
    },
    getTotalCalories() {
      return data.totalCalories;
    },
    setTotalCalories(totalCalories) {
      data.totalCalories = totalCalories;
    },
    clearItems() {
      data.items = [];
      data.totalCalories = 0;
    },
    getItemById(id) {
      for (let item of data.items) {
        if (item.id === id) return item;
      }
    },
    setCurrentItem(item) {
      data.currentItem = item;
    },
    getCurrentItem() {
      return data.currentItem;
    },
    deleteItemById(id) {
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].id === id) {
          data.totalCalories -= data.items[i].calories;
          data.items.splice(i, 1);
          return;
        }
      }
    }
  };
})();

const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: "#add-btn",
    nameInput: "#name-input",
    caloriesInput: "#calories-input",
    totalCalories: "#total-calories",
    updateBtn: "#update-btn",
    deleteBtn: "#delete-btn",
    clrBtn: "#clr-btn",
    backBtn: "#back-btn"
  };
  return {
    showItemList(ItemCtrl, StorageCtrl) {
      const items = StorageCtrl.getItems();
      for (let item of items) {
      }
      let html = "";
      for (let item of items) {
        ItemCtrl.addItem(item.name, item.calories, item.id);
        html += `
          <li class="list-group-item d-flex justify-content-between" id="item-${item.id}">
            <p class="mb-0">
              <span class="font-weight-bold">${item.name}:</span>
              <span class="font-italic">${item.calories} Calories</span>
            </p>
            <a href="#" class="text-info"
              ><i class="fas fa-pencil-alt edit"></i
            ></a>
          </li>
        `;
      }
      document.querySelector(UISelectors.itemList).innerHTML = html;
      UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
    },
    getSelectors() {
      return UISelectors;
    },
    getItem() {
      const name = document.querySelector(UISelectors.nameInput).value;
      const calories = document.querySelector(UISelectors.caloriesInput).value;
      return { name, calories };
    },
    showAlert(message, color) {
      UICtrl.hideAlert();
      const alert = document.createElement("div");
      alert.className = `alert alert-${color} text-center`;
      alert.innerText = message;
      document.querySelector("#alert").appendChild(alert);
      setTimeout(UICtrl.hideAlert, 3000);
    },
    hideAlert() {
      const alertSection = document.querySelector("#alert");
      while (alertSection.firstChild) alertSection.firstChild.remove();
    },
    addListItem(item) {
      const li = document.createElement("li");
      li.id = `item-${item.id}`;
      li.className = "list-group-item d-flex justify-content-between";
      li.innerHTML = `
        <p class="mb-0">
          <span class="font-weight-bold">${item.name}:</span>
          <span class="font-italic">${item.calories} Calories</span>
        </p>
        <a href="#" class="text-info">
          <i class="fas fa-pencil-alt edit"></i>
        </a>
      `;
      document.querySelector(UISelectors.itemList).appendChild(li);
    },
    clearFields() {
      document.querySelector(UISelectors.nameInput).value = "";
      document.querySelector(UISelectors.caloriesInput).value = "";
    },
    clearItems() {
      const itemList = document.querySelector(UISelectors.itemList);
      while (itemList.firstChild) itemList.firstChild.remove();
    },
    showTotalCalories(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).innerText = totalCalories;
    },
    showEditState(item) {
      document.querySelector(UISelectors.nameInput).value = item.name;
      document.querySelector(UISelectors.caloriesInput).value = item.calories;
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display =
        "inline-block";
      document.querySelector(UISelectors.deleteBtn).style.display =
        "inline-block";
      document.querySelector(UISelectors.clrBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "block";
    },
    clearEditState() {
      UICtrl.clearFields();
      document.querySelector(UISelectors.addBtn).style.display = "inline-block";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.clrBtn).style.display = "block";
      document.querySelector(UISelectors.backBtn).style.display = "none";
    },
    updateListItem(item) {
      const listId = `#item-${item.id}`;
      document.querySelector(listId).innerHTML = `
        <p class="mb-0">
          <span class="font-weight-bold">${item.name}:</span>
          <span class="font-italic">${item.calories} Calories</span>
        </p>
        <a href="#" class="text-info">
          <i class="fas fa-pencil-alt edit"></i>
        </a>
      `;
    },
    deleteListItemById(id) {
      const listId = `#item-${id}`;
      document.querySelector(listId).remove();
    }
  };
})();

const StorageCtrl = (function () {
  return {
    getItems() {
      let items = localStorage.getItem("items");
      if (items === null) {
        items = [];
      } else {
        items = JSON.parse(items);
      }
      return items;
    },
    addItem(item) {
      const items = StorageCtrl.getItems();
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    },
    clearItems() {
      localStorage.removeItem("items");
    },
    updateItem(newItem) {
      const items = StorageCtrl.getItems();
      for (let item of items) {
        if (item.id === newItem.id) {
          item.name = newItem.name;
          item.calories = newItem.calories;
          break;
        }
      }
      localStorage.setItem("items", JSON.stringify(items));
    },
    deleteItemById(id) {
      const items = StorageCtrl.getItems();
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("items", JSON.stringify(items));
    }
  };
})();

const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", addItem);
    document
      .querySelector(UISelectors.clrBtn)
      .addEventListener("click", clearItems);
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", showEditState);
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", updateItem);
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", deleteItem);

    function addItem(event) {
      event.preventDefault();
      const { name, calories } = UICtrl.getItem();
      if (name === "" || calories === "") {
        UICtrl.showAlert("Please fill in all fields", "danger");
      } else {
        const item = ItemCtrl.addItem(name, calories);
        UICtrl.addListItem(item);
        StorageCtrl.addItem(item);
        UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
        UICtrl.clearFields();
      }
    }

    function clearItems(event) {
      event.preventDefault();
      UICtrl.clearItems();
      ItemCtrl.clearItems();
      StorageCtrl.clearItems();
      UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
    }

    function showEditState(event) {
      event.preventDefault();
      if (event.target.classList.contains("edit")) {
        const itemId = parseInt(
          event.target.parentElement.parentElement.id.replace(/\D/g, "")
        );
        const currentItem = ItemCtrl.getItemById(itemId);
        ItemCtrl.setCurrentItem(currentItem);
        UICtrl.showEditState(currentItem);
      }
    }

    function updateItem(event) {
      event.preventDefault();
      const name = document.querySelector(UISelectors.nameInput).value;
      const calories = document.querySelector(UISelectors.caloriesInput).value;
      if (name === "" || calories === "") {
        UICtrl.showAlert("Please fill in all fields", "danger");
      } else {
        const currentItem = ItemCtrl.getCurrentItem();
        currentItem.name = name;
        let totalCalories = ItemCtrl.getTotalCalories();
        totalCalories -= currentItem.calories;
        currentItem.calories = parseInt(calories);
        totalCalories += currentItem.calories;
        ItemCtrl.setTotalCalories(totalCalories);
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.updateListItem(currentItem);
        StorageCtrl.updateItem(currentItem);
        ItemCtrl.setCurrentItem(null);
      }
      UICtrl.clearEditState();
    }

    function deleteItem(event) {
      event.preventDefault();
      const currentItem = ItemCtrl.getCurrentItem();
      ItemCtrl.deleteItemById(currentItem.id);
      UICtrl.deleteListItemById(currentItem.id);
      StorageCtrl.deleteItemById(currentItem.id);
      ItemCtrl.setCurrentItem(null);
      UICtrl.showTotalCalories(ItemCtrl.getTotalCalories());
      UICtrl.clearEditState();
    }
  };
  return {
    init() {
      UICtrl.clearEditState();
      UICtrl.showItemList(ItemCtrl, StorageCtrl);
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
