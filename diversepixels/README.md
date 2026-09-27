# DiversePixels starter shop

This is a static starter shop designed to live at:

`https://antclark.co.uk/diversepixels/`

## Files

- `index.html` — shop home
- `product.html` — individual product pages
- `category.html` — category pages
- `cart.html` — browser-based shopping bag
- `data/products.js` — edit your products here
- `css/shop.css` — replace/customise the starter styling
- `js/shop.js` — shop behaviour
- `images/products/` — put your product images here

## GitHub Pages

Put these files in a `diversepixels` folder inside the repository that currently powers `antclark.co.uk`, then commit and push.

If your existing site is a GitHub Pages repository using a custom domain, the folder should be available at `/diversepixels/` automatically.

## Adding products

Edit `data/products.js`. Each product needs a unique `id`, name, category, price, stock, image path and description.

Example:

`{id:"dp004",name:"My New Print",category:"prints",categoryLabel:"Prints",price:15.00,stock:12,image:"images/products/my-print.jpg",description:"A short description.",stripeLink:""}`

## Payments

The starter deliberately does NOT pretend that browser/localStorage stock is secure. Before going live, connect a real multi-item checkout/payment service. Individual Stripe Payment Links are fine for simple one-product purchases, but they are not a complete solution for a cart containing multiple different products.

## Launch checklist

1. Replace placeholder artwork.
2. Add your real products and stock counts.
3. Add your postage/returns/privacy information.
4. Choose and connect a multi-item checkout.
5. Test checkout on mobile and desktop.
6. Place a test order before advertising the shop.
