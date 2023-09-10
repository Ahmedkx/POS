let products = [];
let tableTags = ["السعر 3", "السعر 2", "السعر 1", "السعر"];
let rates = [0, 0, 0];
let table = document.querySelector(".table");
let notification = document.querySelector(".notification");

if (!localStorage.getItem("TableTags")) {
    localStorage.setItem("TableTags", JSON.stringify(tableTags.reverse()));
    localStorage.setItem("Products", JSON.stringify(products));
    localStorage.setItem("Rates", JSON.stringify(rates));
}

tableTags = JSON.parse(localStorage.getItem("TableTags"));
products = JSON.parse(localStorage.getItem("Products"));
products.sort(function (a, b) {
    var textA = a.name;
    var textB = b.name;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
});
localStorage.setItem("Products", JSON.stringify(products));
rates = JSON.parse(localStorage.getItem("Rates"));

// #################################################################### Functions

function loadFromlocal() {
    table.innerHTML = `<div class="table-header center">
    <div class="name">الاسم</div>
    <div id="tag-1">${JSON.parse(localStorage.getItem("TableTags"))[0]}</div>
    <div id="tag-2">${JSON.parse(localStorage.getItem("TableTags"))[1]}</div>
    <div id="tag-3">${JSON.parse(localStorage.getItem("TableTags"))[2]}</div>
    <div id="tag-4">${JSON.parse(localStorage.getItem("TableTags"))[3]}</div>
    </div>`;

    if (localStorage.getItem("Products")) {
        for (i = 0; i < products.length; i++) {
            createProduct(products[i].id, products[i].name, products[i].Price);
        }
    }
}
loadFromlocal();

function loadFromarray() {
    for (i = 0; i < searchArray.length; i++) {
        createProduct(
            searchArray[i].id,
            searchArray[i].name,
            searchArray[i].Price
        );
    }
    searchArray = [];
}

function addProductToTheArray(productName, productPrice) {
    let dateId = Date.now();
    const task = {
        id: dateId,
        name: productName,
        Price: productPrice,
        barcode: dateId - 16448400 * 100000,
    };
    products.push(task);
    window.localStorage.setItem("Products", JSON.stringify(products));
    createProduct(dateId, productName, productPrice);
}

function createProduct(productId, productName, productPrice) {
    let item = document.createElement("div");
    item.classList.add("item", "center");
    item.setAttribute("id", productId);

    let item_name = document.createElement("div");
    item_name.classList.add("name");
    item_name.innerText = productName;
    item.appendChild(item_name);

    let item_price = document.createElement("div");
    item_price.classList.add("price");
    item_price.innerText = productPrice;
    item.appendChild(item_price);

    let item_price_1 = document.createElement("div");
    item_price_1.classList.add("price");
    item_price_1.innerText =
        +productPrice +
        +productPrice * (JSON.parse(localStorage.getItem("Rates"))[0] / 100);
    item.appendChild(item_price_1);

    let item_price_2 = document.createElement("div");
    item_price_2.classList.add("price");
    item_price_2.innerText =
        +productPrice +
        +productPrice * (JSON.parse(localStorage.getItem("Rates"))[1] / 100);
    item.appendChild(item_price_2);

    let item_price_3 = document.createElement("div");
    item_price_3.classList.add("price");
    item_price_3.innerText =
        +productPrice +
        +productPrice * (JSON.parse(localStorage.getItem("Rates"))[2] / 100);
    item.appendChild(item_price_3);

    table.appendChild(item);
}

function search() {
    products.forEach((ele) => {
        if (ele.name.includes(search_bar.value)) {
            searchArray.push(ele);
            table.innerHTML = `<div class="table-header center">
            <div class="name">الاسم</div>
            <div id="tag-1">${
                JSON.parse(localStorage.getItem("TableTags"))[0]
            }</div>
            <div id="tag-2">${
                JSON.parse(localStorage.getItem("TableTags"))[1]
            }</div>
            <div id="tag-3">${
                JSON.parse(localStorage.getItem("TableTags"))[2]
            }</div>
            <div id="tag-4">${
                JSON.parse(localStorage.getItem("TableTags"))[3]
            }</div>
            </div>`;
        }
    });
    loadFromarray();
}

// #################################################################### Background

function bg() {
    document.querySelector("#bg").classList.toggle("bg");
}

// #################################################################### exit button

document.body.addEventListener("click", function (e) {
    if (
        e.target.classList.contains("exit-btn") ||
        e.target.classList.contains("exit-img")
    ) {
        notification.innerHTML = "";
        bg();
    }
});

// #################################################################### Add box
let add_btn = document.querySelector(".add-btn");
let add_box = `
<div class="add box ">
    <div class="content">
            <div class="exit-btn center"><img src="imgs/close.png" alt="" class="exit-img"></div>
        <div class="input">
            <label>الاسم</label>
            <input type="text" class="input-box add-box-name">
        </div>
        <div  class="input">
            <label>السعر</label>
            <input type="number" class="add-box-price input-box" onKeyDown="if(this.value.length==4 && event.keyCode!=8) return false;" oninput="this.value = Math.abs(this.value)">
        </div>
        <div>
            <button class="save-btn save-add">اضافة</button>
        </div>
    </div>
</div>
`;

add_btn.onclick = function () {
    bg();
    notification.innerHTML = add_box;
};

document.body.addEventListener("click", function (e) {
    if (
        e.target.classList.contains("save-add") &&
        document.querySelector(".add-box-name").value != ""
    ) {
        addProductToTheArray(
            document.querySelector(".add-box-name").value,
            document.querySelector(".add-box-price").value
        );
        location.reload();
    }
});
// #################################################################### Settings box
let settings_btn = document.querySelector(".settings-btn");
let settings_box = `
<div class="settings box">
    <div class="content">
            <div class="exit-btn"><img src="imgs/close.png" alt="" class="exit-img"></div>
        <div  class="input">
            <div class="header">
                <div>الاسم</div>
                <div>نسبة الربح %</div>
            </div>
            <div class="inputs">
                <input type="text" class="input-box"  id="settings-name1">
                <input type="number" class="input-box" disabled>
                <input type="text" class="input-box"  id="settings-name2">
                <input type="number" class="input-box"  id="settings-rate-1" onKeyDown="if(this.value.length==4 && event.keyCode!=8) return false;" oninput="this.value = Math.abs(this.value)">
                <input type="text" class="input-box"  id="settings-name3">
                <input type="number" class="input-box" id="settings-rate-2" onKeyDown="if(this.value.length==4 && event.keyCode!=8) return false;" oninput="this.value = Math.abs(this.value)">
                <input type="text" class="input-box"  id="settings-name4">
                <input type="number" class="input-box" id="settings-rate-3" onKeyDown="if(this.value.length==4 && event.keyCode!=8) return false;" oninput="this.value = Math.abs(this.value)">
            </div>

        </div>

        <div>
            <button class="save-btn save-settings">حفظ</button>
        </div>
    </div>
</div>
`;
settings_btn.onclick = function () {
    bg();
    notification.innerHTML = settings_box;

    document.querySelector("#settings-name1").value = JSON.parse(
        localStorage.getItem("TableTags")
    )[0];
    document.querySelector("#settings-name2").value = JSON.parse(
        localStorage.getItem("TableTags")
    )[1];
    document.querySelector("#settings-name3").value = JSON.parse(
        localStorage.getItem("TableTags")
    )[2];
    document.querySelector("#settings-name4").value = JSON.parse(
        localStorage.getItem("TableTags")
    )[3];

    document.querySelector("#settings-rate-1").value = JSON.parse(
        localStorage.getItem("Rates")
    )[0];
    document.querySelector("#settings-rate-2").value = JSON.parse(
        localStorage.getItem("Rates")
    )[1];
    document.querySelector("#settings-rate-3").value = JSON.parse(
        localStorage.getItem("Rates")
    )[2];
};

document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("save-settings")) {
        tableTags[3] = document.querySelector("#settings-name1").value;
        tableTags[2] = document.querySelector("#settings-name2").value;
        tableTags[1] = document.querySelector("#settings-name3").value;
        tableTags[0] = document.querySelector("#settings-name4").value;

        rates[0] = document.querySelector("#settings-rate-1").value;
        rates[1] = document.querySelector("#settings-rate-2").value;
        rates[2] = document.querySelector("#settings-rate-3").value;

        localStorage.setItem("TableTags", JSON.stringify(tableTags.reverse()));
        localStorage.setItem("Rates", JSON.stringify(rates));
        location.reload();
    }
});

// #################################################################### Item box
let item = document.querySelectorAll(".item");
let product_name;
let product_price;

document.body.addEventListener("click", function (e) {
    if (
        e.target.classList.contains("price") ||
        e.target.classList.contains("name")
    ) {
        bg();
        let targetId = e.target.parentElement.getAttribute("id");
        for (i = 0; i < products.length; i++) {
            if (products[i].id == targetId) {
                product_name = products[i].name;
                product_price = products[i].Price;
                product_barcode = products[i].barcode;
                let product_box = `
                    <div class="product box">
                        <div class="content">
                                <div class="exit-btn center"><img src="imgs/close.png" alt="" class="exit-img"></div>
                            <div class="input">
                                <label>الاسم</label>
                                <input type="text" class="input-box" id="product-name" autocomplete="off" value="${product_name}">
                            </div>
                            <div  class="input">
                                <label>السعر</label>
                                <input type="text" class="input-box" id="product-price" value="${product_price}">
                            </div>
                            <div id="bar"><svg id="barcode"></svg></div>
                            <div>
                                <button class="del-btn del-product">حذف</button>
                                <button class="save-btn save-product">حفظ</button>
                                <button class="save-btn" onclick="printBarcode()">طباعة الباركود</button>
                            </div>
                        </div>
                    </div>`;
                notification.innerHTML = product_box;
                let pBox = document.querySelector(".product");
                pBox.setAttribute("id", products[i].id);
                JsBarcode("#barcode", product_barcode, {
                    text: product_name,
                    background: "#ffffff00",
                    font: "Almarai",
                    fontOptions: "bold",
                });
            }
        }
    } else if (e.target.classList.contains("item")) {
        bg();
        let targetId = e.target.getAttribute("id");
        for (i = 0; i < products.length; i++) {
            if (products[i].id == targetId) {
                product_name = products[i].name;
                product_price = products[i].Price;
                product_barcode = products[i].barcode;
                let product_box = `
                        <div class="product box">
                            <div class="content">
                                    <div class="exit-btn center"><img src="imgs/close.png" alt="" class="exit-img"></div>
                                <div class="input">
                                    <label>الاسم</label>
                                    <input type="text" class="input-box" id="product-name" autocomplete="off" value="${product_name}">
                                </div>
                                <div  class="input">
                                    <label>السعر</label>
                                    <input type="text" class="input-box" id="product-price" value="${product_price}">
                                </div>
                                <div id="bar"><svg id="barcode"></svg></div>
                                <div>
                                    <button class="del-btn del-product">حذف</button>
                                    <button class="save-btn save-product">حفظ</button>
                                    <button class="save-btn" onclick="printBarcode()">طباعة الباركود</button>
                                </div>
                            </div>
                        </div>`;
                notification.innerHTML = product_box;
                let pBox = document.querySelector(".product");
                pBox.setAttribute("id", products[i].id);
                JsBarcode("#barcode", product_barcode, {
                    text: product_name,
                    background: "#ffffff00",
                    font: "Almarai",
                    fontOptions: "bold",
                });
            }
        }
    }
});

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("save-product")) {
        let product_box = document.querySelector(".product");
        let product_name = document.querySelector("#product-name");
        let product_price = document.querySelector("#product-price");
        console.log(product_box);
        products.forEach((ele) => {
            if (ele.id == product_box.getAttribute("id")) {
                ele.name = product_name.value;
                ele.Price = product_price.value;
                localStorage.setItem("Products", JSON.stringify(products));
                location.reload();
            }
        });
    }
});

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("del-product")) {
        let product_box = document.querySelector(".product");
        products.forEach((ele) => {
            if (ele.id == product_box.getAttribute("id")) {
                products.splice(products.indexOf(ele), 1);
                localStorage.setItem("Products", JSON.stringify(products));
                location.reload();
            }
        });
    }
});

// #################################################################### Search bar
let search_bar = document.querySelector(".search-bar");
let searchArray = [];

search_bar.addEventListener("input", () => {
    if (search_bar.value == "") {
        loadFromlocal();
    } else {
        search();
    }
});

// #################################################################### Download button
let download_btn = document.querySelector(".download-btn");

download_btn.onclick = function () {
    download("Products", localStorage.getItem("Products"));
};

function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// #################################################################### Upload button
let upload_btn = document.querySelector(".upload-btn");
let upload_box = document.querySelector(".upload");
let upload_box_name = document.querySelector(".upload-box-name");
let upload_box_price = document.querySelector(".upload-box-price");
let save_upload = document.querySelector(".save-upload");

upload_btn.onclick = function () {
    bg();
    upload_box.classList.toggle("hide");
};

save_upload.addEventListener("click", function () {
    let array_names = upload_box_name.value.split("\n");
    let array_prices = upload_box_price.value.split("\n");

    array_names.forEach(function (el, index) {
        setTimeout(function () {
            if (upload_box_name.value != "" && upload_box_price.value != "") {
                addProductToTheArray(array_names[index], array_prices[index]);
                console.log(index);
            }
        }, index * 50);
    });

    bg();
    upload_box.classList.toggle("hide");
});

// #################################################################### Barcode

var barcode = "";
var interval;
document.addEventListener("keydown", function (evt) {
    if (interval) clearInterval(interval);
    if (evt.code == "Enter") {
        if (barcode) console.log("Working !!!");
        handleBarcode(barcode);
        barcode = "";
        return;
    }
    if (evt.key != "Shift") barcode += evt.key;
    interval = setInterval(() => (barcode = ""), 20);
});

function handleBarcode(scanned_barcode) {
    products.forEach(function (ele) {
        if (ele.barcode == scanned_barcode) {
            document.querySelector(".search-bar").value = ele.name;
            if (search_bar.value == "") {
                loadFromlocal();
            } else {
                search();
            }
        }
    });
}

// #################################################################### Barcode print

function printBarcode() {
    var divContents = document.getElementById("bar").innerHTML;
    var a = window.open("", "", "height=500, width=500");
    a.document.write(
        "<html><style> @media print{@page{size:30mm 21mm;margin:0;padding:0;background-color:red}body,html{position:relative;width:100%;height:100%;max-width:100%;max-height:97%;margin:0;padding:0}svg{width:100%;height:100%;max-width:100%;max-height:100%}} </style>"
    );
    a.document.write("<body >");
    a.document.write(divContents);
    a.document.write("</body></html>");
    a.document.close();
    a.print();
}
