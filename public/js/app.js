'use strict';

class App{
	constructor(){
    this.item = [
      {
        "name":"Aloe Vera",
        "desc":"Aloe vera is well known as a skin-friendly plant. It is one medicinal plant people really make use of, since it is generally safe and requires no processing before use. It is a must-have in every garden whether you grow it in pots or in the ground.",
        "image":"img/herbs/aloe.jpg",
      },
      {
        "name":"Chamomile",
        "desc":"No medicine chest is complete without chamomile flower heads. They can be made into a soothing tea that can calm a troubled mind as well as a colicky baby. Its widespread use across many cultures and for many ailments is proof enough for its safety and effectiveness.",
        "image":"img/herbs/chamomile.jpg",
      },
      {
        "name":"Peppermint",
        "desc":"This natural hybrid of spearmint and watermint is widely use in dental hygiene products, mouth fresheners, soothing balms and candies. Quite possibly the oldest medicinal herb to be used by man, there’s evidence that peppermint has been used for thousands of years. Grow it in a part of the garden where the plants are assured of water and give it plenty of room to spread.",
        "image":"img/herbs/peppermint.jpg",
      }
    ];

	}
	render(html, component){
		/* Override */
		component.innerHTML += html;
	}
  
  reRender(html,component){
    component.innerHTML = html;
  } 
  readHerbs(){
    let listHerbs = document.getElementById("herbInfo");
    let html = ``;
    for(let i=0;i<this.item.length;i++){
      html += `<tr>
          <td><img src="${this.item[i].image}"></td>
          <td>${this.item[i].name}</td>
          <td>${this.item[i].desc}</td>
          <td><a class="waves-effect waves-light btn" onclick="component.herbDetailsPage(${i})">More Details</a></td> 
        </tr>`;       
    }
    listHerbs.innerHTML = html;
  }
  searchHerb(){
    let txtSearchHerb = document.getElementById("txtSearchHerb");
    let herbInfo = document.getElementById("herbInfo");
  
    let html = ``;
    for(let i=0;i<this.item.length;i++){
      if(this.item[i].name.toLowerCase().includes(txtSearchHerb.value)||this.item[i].name.toUpperCase().includes(txtSearchHerb.value)||this.item[i].name.includes(txtSearchHerb.value)){
        html += `
        <tr>
         <td><img src="${this.item[i].image}"></td>
          <td>${this.item[i].name}</td>
          <td>${this.item[i].desc}</td>
          <td><a class="waves-effect waves-light btn" onclick="component.herbDetailsPage(${i})">More Details</a></td> 
        </tr>`; 
      }
    }
    herbInfo.innerHTML = html;
  }
  herbDetails(key){
    let details = document.getElementById("herbdetails");
    let html = ``;
    for(let index=0;index<this.item.length;index++){
      if(index==key){
        html += `
        <div id="herbdetailssection">
          <div id="index-banner">
                <div class="section">
                  <div class="container">
                    <br><br>
                    <div class="row center">
                      <h1 id="header">${this.item[index].name}</h1>
                      <br><br>
                    </div>
                  </div>
                </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col s12 m12 l6" id="image-preview">
                  <img src="${this.item[index].image}">
                </div>
                    <div class="section" >
                      <div class="col s12 m12 l6" id="textBox">
                            <p>${this.item[index].desc}</p>
                            <a class="waves-effect waves-light btn" onclick="component.herbUpdateInput(${index})">Update</a>
                            <a class="waves-effect waves-light btn" onclick="component.deleteHerb(${index})">Delete</a>
                            <a class="waves-effect waves-light btn" onclick="component.productsPage()">Back</a>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        `;

      }
    }
    details.innerHTML = html;
  }

  herbUpdateInput(val){
    let html = `
      <div id="herbdetailssection">
          <div id="index-banner">
                <div class="section">
                  <div class="container">
                    <br><br>
                    <div class="row center">
                      <input id="updateName" type="text" value="${this.item[val].name}" />
                      <br><br>
                    </div>
                  </div>
                </div>
            </div>

            <div class="container">
              <div class="row">
                <div class="col s12 m12 l6" id="image-preview">
                  <img src="${this.item[val].image}">
                </div>
                    <div class="section" >
                      <div class="col s12 m12 l6" id="textBox">
                            <input id="updateDesc" type="text" value="${this.item[val].desc}" />
                            <a class="waves-effect waves-light btn" onclick="component.updateHerb(${val})">Done</a>
                      </div>
                    </div>
              </div>
            </div>
          </div>
      `;
      this.reRender(`${html}`,document.getElementById('herbdetailssection'));
  }
  updateHerb(key){
    let n = document.getElementById('updateName');
    let d = document.getElementById('updateDesc');

    let i = this.item[key];
    let item = {"name":n.value,"desc":d.value, "image":i.image, "link":i.link};

    this.item[key] = item;
    this.herbDetails(key);
  }
  deleteHerb(key){   
    let table = document.getElementById('herbInfo');
    table.deleteRow(key);
    this.item.splice(key,1);


    this.productsPage(); 
  }
  createHerb(){
    let n = document.getElementById('createHerb');
    let d = document.getElementById('createDesc');
    let i = document.getElementById('createImage');

    let herb = {"name":n.value,"desc":d.value,"image":i.value};
    this.item.push(herb);

    n.value = d.value = i.value = ''; //Clear Fields
    this.readHerbs();
  }
}

class Component extends App{
	constructor(){
		super();
	}

	landingPage(){
			let html = `
  <nav class="green accent-3" role="navigation">
    <div class="nav-wrapper container">
      <ul class="right hide-on-med-and-down">
        <li id="navlist"><a href="#" onclick="component.homePage()">HOME</a></li>
        <li id="navlist"><a href="#" onclick="component.productsPage()">PRODUCTS</a></li>
      </ul>

      <ul id="nav-mobile" class="side-nav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
    </div>
  </nav>

    <div id="homepage">
      <div id="index-banner">
        <div class="section no-pad-bot">
          <div class="container">
            <br><br>
            <div class="row center" id="apollo">
              <img src="img/leaflyn2.png" alt="Apollo's Symphony" id="apolloimage">
            </div>
            <div class="row center" id="lookbox">
              <a href="#" class="btn-large waves-effect waves-light green" onclick="component.productsPage()">Get Started</a>
            </div>
            <br><br>

          </div>
        </div>
      </div>

        <div class="parallax-container valign-wrapper">
          <div class="section no-pad-bot">
            <div class="container">
              <div class="row center">
                <h5 class="header col s12 light" id="divHeader">Feel the aroma.</h5>
              </div>
            </div>
          </div>
          <div class="parallax"><img src="img/index-pic.jpg" alt="Herb"></div>
        </div>



            <div class="container">
              <div class="section">

                <div class="row">
                  <div class="col s12 center">
                    <h3><i class="mdi-content-send brown-text"></i></h3>
                    <h4 id="header">About Us</h4>
                    <p class="left-align light">Leaflyn is an interactive, electronic herbal database - provides hyperlinked access to the scientific data underlying the use of herbs for health. The information on this site is intended for educational purposes only and is not a substitute for the advice of a qualified healthcare professional.</p>
                  </div>
                </div>

              </div>
            </div>
    </div>

    <div id="products">
      <div class="container">
        <div class="row">
          <div id="readpage" class="row marketing">
              <div class="col s12 m12 l12">
                <h1>Herbs</h1>
                <table id="herbList" class="table striped">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search" id="txtSearchHerb" oninput="component.searchHerb()">
                    </div>
                  <tbody id="herbInfo"></tbody>
                </table>
                <br><br><br>
                <h1>Share Your Information</h1>
                <br><br><br>
                <input id="createHerb" type="text" placeholder="Name of the herb..." />
                <input id="createDesc" type="text" placeholder="Description of the herb..." />
                <input id="createImage" type="text" placeholder="URL Image of the herb..." />
                <a href="#!" class="waves-effect waves-light btn" onclick="component.createHerb()">Enter</a>
              </div>
            </div>
          </div>
        </div>
    </div>

    <div id="herbdetails">
    </div>


  <footer class="page-footer green darken-4">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Company Bio</h5>
          <p class="grey-text text-lighten-4" id="footertext">I am Lalyn Delos Santos, an IT student. I made this site to provide helpful information about herbal plants. I&apos;m not a much professional web developer but I did what I can do best.</p>


        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Settings</h5>
          <ul>
            <li><a class="white-text" href="#!">Home</a></li>
            <li><a class="white-text" href="#!">Products</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      </div>
    </div>
  </footer>
  			`;
        this.reRender(`${html}`,document.getElementById('app'));
        
	}

  homePage(){
    $('#homepage').show();
    $('#products').hide();
    $('#herbdetails').hide();
  }
  productsPage(){
    $('#homepage').hide();
    $('#products').show();
    $('#herbdetails').hide();
  }
  herbDetailsPage(key){
    $('#homepage').hide();
    $('#products').hide();
    $('#herbdetails').show();

    component.herbDetails(key);

}

}



let component = new Component();
component.landingPage();
component.readHerbs();