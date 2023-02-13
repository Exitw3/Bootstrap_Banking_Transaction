class Customer {
    constructor(id, name, email, phone, address, balance) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}
var customers = [];


function init() {
    customers = [
        new Customer(1, "nguyen", "nguyen@gmail.com", "0987654321", "hue", "0"),
        new Customer(2, "phuc", "phuc@gmail.com", "0987987987", "tuha", "0"),
        new Customer(3, "hoa", "hoa@gmail.com", "0987698765", "sai gon", "0"),
        new Customer(4, "mac", "mac@gmail.com", "0987659876", "da nang", "0"),
        new Customer(5, "ming", "ming@gmail.com", "0989879876", "ha noi", "0")
    ];
}

function renderCustomer() {
    let htmls = customers.map(function (customer, index) {
        return `
        <tr id ="indexcustomers">
        <td class="text-center">${customer.id}</td>
        <td class="text-center">${customer.name}</td>
        <td class="text-center">${customer.email}</td>
        <td class="text-center">${customer.phone}</td>
        <td class="text-center">${customer.address}</td>
        <td class="text-center">${customer.balance}</td>
        <td class="text-center">
            <button type="button" class="btn btn btn-outline-primary" title="Edit" data-toggle="tooltip"
                data-bs-original-title="Edit" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editCustomer(${index})">
                Edit
            </button>
        </td>
        <td class="text-center">
            <button type="button" class="btn btn-outline-danger" title="Suspended" data-toggle="tooltip"
                data-bs-original-title="Edit" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="findIndex(${index})" >
                Delete
            </button>
        </td>
    </tr>
        `
    })
    document.querySelector('#list-customer').innerHTML = htmls;
}

function save() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let id = findMaxId() + 1;
    let balance = 0;

    if (name == null || name == '') {
        alert('tên khách hàng không được để trống');
        return;
    } if (email == null || email == '') {
        alert('địa chỉ email không được để trống');
        return;
    } if (phone == null || phone == '') {
        alert('số điện thoại không được bỏ trống')
        return;
    } if (address == null || address == '') {
        alert('địa chỉ không được bỏ trống');
        return;
    }

    let newCustomer = new Customer(id, name, email, phone, address, balance);
    customers.push(newCustomer);
    renderCustomer();
    resetForm();
}

function resetForm() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('address').value = "";
}

function findMaxId() {
    let max = 0;
    for (let customer of customers) {
        if (customer.id > max) {
            max = customer.id
        }
    }
    return max;
}

let remove;

function findIndex(index) {
    remove = index;
    document.getElementById('indexcustomers').value = index;
}

function removeCustomer(remove) {
    customers.splice(remove, 1);
    renderCustomer(customers);
}

let editid;
let editbalance;


function editCustomer(index) {
    document.getElementById('indexcustomers').value = index;
    let customer = customers[index];
    document.getElementById('namee').value = customer.name;
    document.getElementById('emaile').value = customer.email;
    document.getElementById('phonee').value = customer.phone;
    document.getElementById('addresse').value = customer.address;
    editid = customer.id;
    editbalance = customer.balance;
}

function updateCustomer() {
    let id = editid;
    let balance = editbalance;
    let name = document.querySelector('#namee').value.trim();
    let email = document.querySelector('#emaile').value.trim();
    let phone = document.querySelector('#phonee').value.trim();
    let address = document.querySelector('#addresse').value.trim();

    let index = document.getElementById('indexcustomers').value;
    customers[index] = new Customer(id, name, email, phone, address, balance);
    resetForm();
    renderCustomer(customers);

}

function ready() {
    init();
    renderCustomer();
}
ready();