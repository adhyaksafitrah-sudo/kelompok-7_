// Dummy data Pesanan (6 total)
let orders = [
  { pelanggan: "syifa", menu: "Cappuccino", jumlah: 2, total: 50000 },
  { pelanggan: "rifka", menu: "Latte", jumlah: 1, total: 22000 },
  { pelanggan: "billy", menu: "Espresso", jumlah: 3, total: 54000 },
  { pelanggan: "adi", menu: "Mocha", jumlah: 2, total: 60000 },
  { pelanggan: "dylan", menu: "Green Tea", jumlah: 1, total: 25000 },
  { pelanggan: "Faizal", menu: "Latte", jumlah: 2, total: 44000 }
];

// Dummy data Menu (5 total)
let menuItems = [
  { nama: "Cappuccino", harga: 25000, kategori: "Coffee" },
  { nama: "Latte", harga: 22000, kategori: "Coffee" },
  { nama: "Espresso", harga: 18000, kategori: "Coffee" },
  { nama: "Mocha", harga: 30000, kategori: "Coffee" },
  { nama: "Green Tea", harga: 25000, kategori: "Non-Coffee" }
];

// Dummy data Pelanggan (6 total)
let customers = [
  { nama: "syifa", email: "syifa@mail.com" },
  { nama: "rifka", email: "rifka@mail.com" },
  { nama: "billy", email: "billy@mail.com" },
  { nama: "adi", email: "adi@mail.com" },
  { nama: "dylan", email: "dylan@mail.com" },
  { nama: "Faizal", email: "Faizal@mail.com" }
];

// Navigasi antar halaman
function showPage(page) {
  const pages = ["dashboard","orders","menu","customers","report"];
  pages.forEach(p => document.getElementById(p+"Page").style.display="none");
  document.getElementById(page+"Page").style.display="block";
  document.getElementById("pageTitle").innerText = page.charAt(0).toUpperCase() + page.slice(1);

  if(page==="dashboard") renderDashboard();
  if(page==="orders") renderOrders();
  if(page==="menu") renderMenu();
  if(page==="customers") renderCustomers();
  if(page==="report") renderReport();
}

// Dashboard
function renderDashboard(){
  document.getElementById("totalOrders").innerText = orders.length;
  document.getElementById("totalCustomers").innerText = customers.length;
  let totalRevenue = orders.reduce((sum,o)=>sum+o.total,0);
  document.getElementById("totalRevenueDash").innerText = "Rp "+totalRevenue;
  document.getElementById("bestMenu").innerText = "-";
}

// Pesanan
function renderOrders(){
  const tbody = document.querySelector("#ordersTable tbody");
  tbody.innerHTML="";
  orders.forEach((o,i)=>{
    let row = `<tr>
      <td>${i+1}</td>
      <td>${o.pelanggan}</td>
      <td>${o.menu}</td>
      <td>${o.jumlah}</td>
      <td>Rp ${o.total}</td>
      <td><button onclick="editOrder(${i})">Edit</button>
      <button onclick="deleteOrder(${i})">Hapus</button></td>
    </tr>`;
    tbody.innerHTML+=row;
  });
}
function addOrder(){
  let pelanggan=prompt("Nama pelanggan:");
  let menu=prompt("Menu:");
  let jumlah=parseInt(prompt("Jumlah:"));
  let harga=menuItems.find(m=>m.nama===menu)?.harga||20000;
  orders.push({ pelanggan, menu, jumlah, total:jumlah*harga });
  renderOrders(); updateDashboard(); renderReport();
}
function editOrder(i){
  let newJumlah=parseInt(prompt("Jumlah baru:", orders[i].jumlah));
  if(!isNaN(newJumlah)){
    let harga=menuItems.find(m=>m.nama===orders[i].menu)?.harga||20000;
    orders[i].jumlah=newJumlah;
    orders[i].total=newJumlah*harga;
    renderOrders(); updateDashboard(); renderReport();
  }
}
function deleteOrder(i){
  if(confirm("Hapus pesanan ini?")){ orders.splice(i,1); renderOrders(); updateDashboard(); renderReport();}
}

// Menu
function renderMenu(){
  const tbody=document.querySelector("#menuTable tbody");
  tbody.innerHTML="";
  menuItems.forEach((m,i)=>{
    let row=`<tr>
      <td>${i+1}</td>
      <td>${m.nama}</td>
      <td>Rp ${m.harga}</td>
      <td>${m.kategori}</td>
      <td><button onclick="editMenu(${i})">Edit</button>
      <button onclick="deleteMenu(${i})">Hapus</button></td>
    </tr>`;
    tbody.innerHTML+=row;
  });
}
function addMenu(){
  let nama=prompt("Nama menu:");
  let harga=parseInt(prompt("Harga:"));
  let kategori=prompt("Kategori:");
  menuItems.push({nama,harga,kategori});
  renderMenu();
}
function editMenu(i){
  let newHarga=parseInt(prompt("Harga baru:", menuItems[i].harga));
  if(!isNaN(newHarga)){ menuItems[i].harga=newHarga; renderMenu();}
}
function deleteMenu(i){
  if(confirm("Hapus menu ini?")){ menuItems.splice(i,1); renderMenu();}
}

// Customers
function renderCustomers(){
  const tbody=document.querySelector("#customersTable tbody");
  tbody.innerHTML="";
  customers.forEach((c,i)=>{
    let row=`<tr>
      <td>${i+1}</td>
      <td>${c.nama}</td>
      <td>${c.email}</td>
      <td><button onclick="editCustomer(${i})">Edit</button>
      <button onclick="deleteCustomer(${i})">Hapus</button></td>
    </tr>`;
    tbody.innerHTML+=row;
  });
}
function editCustomer(i){
  let newEmail=prompt("Email baru:", customers[i].email);
  if(newEmail){ customers[i].email=newEmail; renderCustomers();}
}
function deleteCustomer(i){
  if(confirm("Hapus pelanggan ini?")){ customers.splice(i,1); renderCustomers();}
}

// Report
function renderReport(){
  document.getElementById("reportOrders").innerText=orders.length;
  document.getElementById("reportCustomers").innerText=customers.length;
  let totalRevenue=orders.reduce((sum,o)=>sum+o.total,0);
  document.getElementById("reportRevenue").innerText="Rp "+totalRevenue;
  document.getElementById("reportBestMenu").innerText="-";
}

// Init
function updateDashboard(){ renderDashboard(); }
renderDashboard();

