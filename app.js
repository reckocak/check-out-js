//* ====================================================
//*                 Checkout Page Solution
//* ====================================================
const kargo = 15.0;
const vergi = 0.18;
const indirim= 0.7;

let sepettekiler=[
    {name:'Vintage Package',
    price:34.99,
    piece:1,
    img:'./img/photo1.png'
    },
    {name:'Levi Shoes',
    price:40.99,
    piece:1,
    img:'./img/photo2.png'
    },
    {name:'Antique Clock',
    price:69.99,
    piece:1,
    img:'./img/photo3.jpg'
  }
];

display();
hesaplaCardTotal();

function display(){
    sepettekiler.forEach((ürün)=>{
    //!DESTRUCTURİNG
    const{name,price,piece,img}=ürün;
    
    
    document.querySelector(
      "#ürün-panel"
    ).innerHTML += `<div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-5">
          <img src=${img} class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
                 <div class="ürün-price">
                        <p class="text-warning h2">$
                          <span class="indirim-price">${(price*indirim).toFixed(2)}</span>
                          <span class="h5 text-dark text-decoration-line-through">${price}</span>
                        </p>
                      </div>
    
                      
                      <div
                        class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                      >
                        <div class="adet-controller">
                          <button class="btn btn-secondary btn-sm">
                            <i class="fas fa-minus"></i>
                          </button>
                          <p class="d-inline mx-4" id="ürün-adet">${piece}</p>
                          <button class="btn btn-secondary btn-sm">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div class="ürün-removal mt-4">
                        <button class="btn btn-danger btn-sm w-100 remove-ürün">
                          <i class="fa-solid fa-trash-can me-2"></i>Remove
                        </button>
                      </div>
                      <div class="mt-2">
                        Ürün Toplam: $<span class="ürün-toplam">${(price*indirim*piece).toFixed(2)}</span>
                      </div>
          </div>
        </div>
      </div>
    </div>`;
    
    });


    removeButon();

    piecebuton();



    document.querySelector("#card-prices").innerHTML = `<table class="table">
            <tbody>
              <tr class="text-end">
                <th class="text-start">Aratoplam</th>
                <td>$<span class="aratoplam">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Vergi(18%)</th>
                <td>$<span class="vergi">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Kargo</th>
                <td>$<span class="kargo">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Toplam</th>
                <td>$<span class="toplam">0.00</span></td>
              </tr>
            </tbody>
          </table>`;
 
}

function removeButon() {
    document.querySelectorAll('.remove-ürün').forEach((btn)=>{
        btn.onclick =()=>{
            remove(btn)
        };
    });   
}

function remove(btn){
    btn.closest('.card').remove();

    //!diziden silme
    sepettekiler = sepettekiler.filter((ürün) => ürün.name != btn.closest('.card').querySelector('h5').textContent);
    hesaplaCardTotal();
}
console.log(sepettekiler);


function piecebuton(){
    document.querySelectorAll('.adet-controller').forEach((sayi)=>{
        const minus= sayi.firstElementChild; const adet1= sayi.querySelector('#ürün-adet');
        minus.onclick=()=>{
            adet1.textContent=
            Number(adet1.textContent)-1;
            sepettekiler.map((ürün)=>{
                if(ürün.name==adet1.closest('.row').querySelector('.card-title').textContent)
                ürün.piece=Number(adet1.textContent).toFixed(2)
            })
            if(adet1.textContent==0){
                alert("sileyim mi")
                remove(minus)
               }
            adet1.closest(".row").querySelector(".ürün-toplam").textContent =
            (adet1.closest(".row").querySelector(".indirim-price").textContent*adet1.textContent).toFixed(2)
            hesaplaCardTotal();
        }
        const plus=sayi.lastElementChild
        plus.onclick=()=>{adet1.textContent=Number(adet1.textContent)+1;

            //!diziyi güncelle
        sepettekiler.map((ürün) => {
            if (
                ürün.name == adet1.closest(".row").querySelector(".card-title").textContent
                )
            ürün.adet = Number(adet1.textContent);
                 console.log( sepettekiler)
        });
              
              adet1.closest(".row").querySelector(".ürün-toplam").textContent =
                (adet1.closest(".row").querySelector(".indirim-price").textContent *
                adet1.textContent).toFixed(2);
                hesaplaCardTotal();
              
              }
    });
}

function hesaplaCardTotal() {
  //! her bir card daki ürün toplam kısımları
  const ürünToplam = document.querySelectorAll(".ürün-toplam");
  //  console.log([...ürünToplam]);

  console.log(Array.from(ürünToplam));
  console.log(ürünToplam);
  //!  Bir NodeListnesne, bir belgeden çıkarılan düğümlerin bir listesidir

  //? araToplam= en alttaki tüm ürünler için vergi kargo hariç sepettekiler fiyatı
  //?Reduce tam olarak Array istiyor, nodelist yeterli değil

  //*önce hesapla sonra altta browser a (DOM) bastır
  const araToplam = Array.from(ürünToplam).reduce(
    (acc, item) => acc + Number(item.textContent),
    0
  );
  const vergiPrice = araToplam * vergi;
  const shipping = araToplam > 0 ? kargo : 0;
  const cardTotal = araToplam + shipping + vergiPrice;

  document.querySelector(".aratoplam").textContent = araToplam.toFixed(2);
  document.querySelector(".vergi").textContent = vergiPrice.toFixed(2);
  document.querySelector(".kargo").textContent = shipping.toFixed(2);
  document.querySelector(".toplam").textContent = cardTotal.toFixed(2);
}