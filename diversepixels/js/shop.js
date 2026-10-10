const CART_KEY="diversepixels-cart";
/* Where "Enquire now" emails go. A product can override this with its own
   enquireUrl in data/products.js (e.g. a contact page link). */
const ENQUIRY_EMAIL="your@email.com";
const money=n=>`£${Number(n).toFixed(2)}`;
const getCart=()=>JSON.parse(localStorage.getItem(CART_KEY)||"[]");
const saveCart=c=>{localStorage.setItem(CART_KEY,JSON.stringify(c));updateCartCount();};
const productById=id=>PRODUCTS.find(p=>p.id===id);
function updateCartCount(){const el=document.getElementById("cart-count");if(el)el.textContent=getCart().reduce((s,i)=>s+i.qty,0)?`(${getCart().reduce((s,i)=>s+i.qty,0)})`:"";}
function addToCart(id){const p=productById(id);if(!p||p.stock<1)return alert("This item is out of stock.");let c=getCart(),i=c.find(x=>x.id===id);if(i){if(i.qty>=p.stock)return alert("You have reached the available stock.");i.qty++;}else c.push({id,qty:1});saveCart(c);alert("Added to your bag.");}
function buyNow(id){const p=productById(id);if(!p||p.stock<1)return alert("This item is out of stock.");let c=getCart(),i=c.find(x=>x.id===id);if(i){if(i.qty<p.stock)i.qty++;}else c.push({id,qty:1});saveCart(c);location.href="cart.html";}
const enquireLink=p=>p.enquireUrl||`mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent("Enquiry: "+p.name)}&body=${encodeURIComponent("Hi, I'd like to enquire about "+p.name+".")}`;
const stockLine=p=>p.enquire?"":`<p class="stock">${p.stock>0?`${p.stock} in stock`:"Sold out"}</p>`;
function renderProducts(list){const g=document.getElementById("product-grid");if(!g)return;g.innerHTML=list.map(p=>`<article class="card"><a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a><div class="card-body"><p class="eyebrow">${p.categoryLabel}</p><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><p>${money(p.price)}</p>${stockLine(p)}<a class="button small" href="product.html?id=${p.id}">View details</a></div></article>`).join("");}
function renderDetail(){const el=document.getElementById("product-detail");if(!el)return;const p=productById(new URLSearchParams(location.search).get("id"));if(!p){el.innerHTML="<h1>Product not found</h1>";return;}el.innerHTML=`<div class="product-detail"><div><img src="${p.image}" alt="${p.name}"></div><div><p class="eyebrow">${p.categoryLabel}</p><h1>${p.name}</h1><p class="price">${money(p.price)}</p><p class="description">${p.description}</p>${stockLine(p)}${p.enquire?`<a class="button" href="${enquireLink(p)}">Enquire now</a>`:`<button class="button" ${p.stock<1?"disabled":""} onclick="buyNow('${p.id}')">Buy now</button>`}</div></div>`;}
function renderCart(){const el=document.getElementById("cart");if(!el)return;let c=getCart();if(!c.length){el.innerHTML="<p>Your bag is empty.</p><a class='button' href='index.html'>Continue shopping</a>";return;}let total=0;el.innerHTML=`<div class="cart-list">${c.map(i=>{const p=productById(i.id);if(!p)return"";total+=p.price*i.qty;return `<div class="cart-row"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${money(p.price)} each</p><label>Qty <input type="number" min="1" max="${p.stock}" value="${i.qty}" onchange="setQty('${p.id}',this.value)"></label><button class="link-button" onclick="removeItem('${p.id}')">Remove</button></div><strong>${money(p.price*i.qty)}</strong></div>`}).join("")}</div><div class="cart-summary"><strong>Total: ${money(total)}</strong><p class="notice">Checkout is intentionally left as a placeholder. For a real multi-item shop, connect a checkout service that supports a cart and secure server-side stock/payment handling.</p><button class="button" onclick="checkoutNotice()">Checkout</button></div>`;}
function setQty(id,q){let p=productById(id),c=getCart(),i=c.find(x=>x.id===id);q=Math.max(1,Math.min(Number(q)||1,p.stock));if(i)i.qty=q;saveCart(c);renderCart();}
function removeItem(id){saveCart(getCart().filter(x=>x.id!==id));renderCart();}
function checkoutNotice(){alert("Your bag is working. Connect a proper multi-item checkout before taking live orders.");}
updateCartCount();
const cat=new URLSearchParams(location.search).get("category");
if(document.getElementById("category-title")){const items=PRODUCTS.filter(p=>p.category===cat);document.getElementById("category-title").textContent=items[0]?.categoryLabel||"Products";renderProducts(items);}
else renderProducts(PRODUCTS.filter(p=>p.featured)); /* homepage: only products flagged featured:true in data/products.js */
renderDetail();renderCart();