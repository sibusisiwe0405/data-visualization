// All items we'd like to add


const navItems = [
    { href: 'index.html', text: 'Home'},
    { href: '../Blogs/blog1.html', text: 'Blogs'  },
    { href: 'datavisual.html', text: 'Visualization'},
    { href: 'dataart.html', text: 'Data Art',  },
    {href: 'design.html', text: 'Wireframes',},
   

];

window.addEventListener('DOMContentLoaded', (event) => {
    rendeMenu();
});

// create elements
const navElem = document.createElement("nav");
navElem.className = "menu";
const navList = document.createElement("ol");


//run the Rendermenu function
const rendeMenu = () => {
    const pathPrefix=window.location.pathname==="/WSOA3028A_2006780/"?'.':'..'
    const navBar = document.querySelector(".menu-item");

    for (let i = 0; i < navItems.length; i++) {

        let navItem = document.createElement("li");
        navItem.className = "menu-item";
        let navLink = document.createElement("a");
        navLink.href = navItems[i].href;
        navLink.innerHTML = navItems[i].text;
        navItem.appendChild(navLink);


        //if subitems exists , then render them.
        let subItems = navItems[i].subItems;

        if (!!subItems && !!subItems.length) { 
            let subList = document.createElement("ol");
            subItems.forEach(subItem => {
                let subnavItem = document.createElement("li");
                let subnavLink = document.createElement("a");
                subnavItem.className = "menu-item";
                subList.className = "sub-menu";
               
                subnavLink.href = subItem.href;
                subnavLink.innerHTML = subItem.text;
                subnavItem.appendChild(subnavLink);
                subList.appendChild(subnavItem);
            });

            navItem.appendChild(subList);
        }
        // Add anchor to list item, and list item to list

        navList.appendChild(navItem);
        navElem.appendChild(navList);
    }
}

// Add list to body (or anywhere else)
window.onload = function () {
    document.body.appendChild(navElem);
}

class myFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="containar">
        
    <footer>
   <div class="footer-content"> 
    <h4>Company</h4>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="./Blogs/Blogs1.html">Bogs</a></li>
        <li><a href="dataart.html">Data Art</a></li>
        <li><a href="datavisual.html">Data Visualization</a></li>
        <li><a href="design.html">Wireframes</a></li>
    </ul>
</div>
<div class="footer-content">
    <h4>Get help</h4>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="./Blogs/blog1.html">Blogs</a></li>
    </ul>
</div>
<div class="footer-content">
    <h4>Contact us</h4>
    <div class="social-links">
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-linkedin-in"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
    </div>   
    
</div>
</div>

</div>

</div>

    </footer>

        `
    }
}
customElements.define('my-footer', myFooter)