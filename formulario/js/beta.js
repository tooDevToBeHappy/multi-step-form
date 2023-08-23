const steps = document.querySelectorAll('.steps');
const sidebarbuttons = document.querySelectorAll('.stepPointer');
const bckBtn = document.querySelector('.bck');
const nxtBtn = document.querySelector('.nxt');

const inputName = document.querySelector('#name');
// inputName.setAttribute('onkeypress','return (event.charCode > 47 && event.charCode < 58) || (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)')
const inputEmail = document.querySelector('#email');
const inputPhoneNumber = document.querySelector('#number');


const raw = {
    name:null,
    email:null,
    phone:null,
    plan:'Arcade',
    plan_value:[9,'mo'],
    billing:['month','mo'],
    adds:{
        online_service:[false,null],
        larger_storage:[false,null],
        custom_profile:[false,null],
    }
}
function Form(){
    let counter = 0;
    let info = false;
    function buttonAc(){
        if(info){
            nxtBtn.onclick = function nxt(){
                bckBtn.style.display = 'block';
                if(counter === 2){
                    summary();
                    addOnSelect();
                    added();
                    total();
                }
                if(counter === 3){
                    bckBtn.style.display = 'none';
                    nxtBtn.style.display = 'none';
                    steps[counter].style.display = 'none';
                    counter += 1;
                    steps[counter].style.display = 'block';
                    console.log(JSON.stringify(raw))

                    return
                }
                steps[counter].style.display = 'none';
                counter += 1;
                steps[counter].style.display = 'block';
                sidebarCurrentPointer(counter);
                confirm(counter)
            }
            bckBtn.onclick =  function bck(){
                steps[counter].style.display = 'none';
                counter -= 1;
                steps[counter].style.display = 'block';
                confirm(counter)
        
                sidebarCurrentPointer(counter);
                if(counter === 0){
                    bckBtn.style.display = 'none';
                    return
                }
            }
            return
        }
        nxtBtn.onclick = ()=>{};
    }
    function confirm(counter){
        if(counter === 3){
            nxtBtn.textContent = 'Confirm';
            nxtBtn.style.backgroundColor = 'hsl(243, 100%, 62%)';
            return
        }
        nxtBtn.textContent = 'Next step';
        nxtBtn.style.backgroundColor = 'hsl(213, 96%, 18%)';
    }
    function sidebarCurrentPointer(currentForm){
        sidebarbuttons.forEach(item=>{
            item.classList.remove('currentStep')
        })
        sidebarbuttons[currentForm].classList.add('currentStep')
    }
    function inputValidation(){
        let inputFields = steps[0].querySelectorAll('.required');
        let name =  false;
        let email = false;
        let number = false;
        function nameInp(input){
            if(input.value === ''){
                inputFields[0].classList.remove('none');
                input.style.border = '1px solid red';
                name = false;
                ok()
                return
            }
            inputFields[0].classList.add('none');
            inputName.style.border = '1px solid hsl(229, 24%, 87%)';
            name  = true;
            raw.name = input.value;
            ok();
        }
        function emailInp(input) {
            let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            let tst = re.test(inputEmail.value)  
            if(tst){
                input.style.border = '1px solid hsl(229, 24%, 87%)';
                inputFields[1].classList.add('none');
                email = true;
                raw.email = input.value
                ok();
                return
            }
                input.style.border = '1px solid red';
                inputFields[1].classList.remove('none');
                email = false;
                ok()
        }
        function spacekill(inpt){
            let char = /^\s/;
            inpt.onkeypress = e =>{
                let key = e.key;
                if(char.test(key)){
                    e.preventDefault();
                }
            }
        }
        function phoneNumberField(input) {
            let char = /^\[\D]/;
            input.onkeypress = (e) => {
              let key = e.key;
              if (char.test(key)) {
                e.preventDefault();
              }
            };
            const patern = "(***) ***-****";
            const flag = /\d{11}/;
            const flag1 = /^\+\d{1,11}/
            const inputVal = input.value;
          
            if (flag.test(inputVal) || flag1.test(inputVal)) {
                input.onkeypress = e=>{
                    e.preventDefault();
                }
              let result = "";
              let index = 0;
              for (let i = 0; i < patern.length; i++) {
                if (patern[i] === "*") {
                  result += inputVal[index];
                  index++;
                } else {
                  result += patern[i];
                }
              }
              input.value = result;
              number = true;
            }
          }
          function phoneNUmber (input){
            const ocur1 = /\+\d{11}/
            const ocur2 = /\d{11}/g
            input.onmouseover = e =>{
                if(input.value === ''){
                    input.value = '+1 '
                }
            }
            input.onkeypress  = function(event) {
                var key = event.which || event.keyCode;
                if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
                    event.preventDefault();
                }
            };
            input.oninput = e =>{
                if(ocur1.test(input.value.replace(/[^+\d]/g,'')) || 
                 ocur2.test(input.value)){
                    let len = input.value.length;
                    inputPhoneNumber.setAttribute('maxlength',`${len}`);
                    number = true;
                    raw.phone = input.value;
                    ok()
                    return
                }
                inputPhoneNumber.setAttribute('maxlength','20');
                number = false;
                ok()
            }
          }
        phoneNUmber(inputPhoneNumber);
        document.querySelectorAll('[data-mask]').forEach(function(e) {
        function format(elem, eventType, event) {
            var result = DoEntireFormat(event, eventType, elem.id, elem.value, elem.getAttribute('data-format'), elem.getAttribute('data-mask'));    
            elem.value = result.value;
            
            var positionToMoveCursorTo = 0;
            if(result.moveCursor && result.cursorPosition){
            positionToMoveCursorTo = result.cursorPosition;
            } 
            
            if (elem.createTextRange && result.moveCursor) {
            var range = elem.createTextRange();
            range.move('character', positionToMoveCursorTo);
            range.select();
            } else if (elem.selectionStart && result.moveCursor) {      
            elem.setSelectionRange(positionToMoveCursorTo, positionToMoveCursorTo);
            }
        }
        e.addEventListener('input', function(event) {    
            format(e, 'input', event);
        });
        e.addEventListener('paste', function(event) {    
            format(e, 'paste', event);
        });
        format(e)
        });        
        spacekill(inputName);
        spacekill(inputEmail);

        inputName.addEventListener('input',e=>{
            nameInp(inputName);
        })
        inputEmail.addEventListener('input',e=>{
            emailInp(inputEmail);
        })
        function ok (){
            const validate = [[name],[email],[number]];
            const ref = [inputName,inputEmail,inputPhoneNumber]
            validate.map(item=>{
                if(!item[0]){
                    const index = validate.indexOf(item);
                    inputFields[index].classList.remove('none');
                    ref[index].style.backgroundColor = 'rgba(255, 0, 0, 0.119)';
                    ref[index].style.borderColor = 'rgba(255, 0, 0, 0.119)';
                    return
                }
                const index = validate.indexOf(item)
                inputFields[index].classList.add('none')
                ref[index].style.backgroundColor = 'white';
            })
            if(name && email && number){
                info = true;
                buttonAc();
                return
            }
            info = false;
            buttonAc();
        }
        if(!info){
            nxtBtn.onclick = e =>{
                ok()
            }
        }
    }
    function changeChoices(){
        steps[counter].style.display = 'none';
        counter = 1
        steps[counter].style.display = 'block';
        sidebarCurrentPointer(counter);
        confirm(counter);
    }
    const change = steps[3].querySelector('#change');
    change.onclick = e =>{
        changeChoices();
    }
    inputValidation();
}
function planSelecting(){
    let plan = steps[1].querySelectorAll('.planType');
    
    plan.forEach(item=>{
        item.onclick = e =>{
            plan.forEach(item=>{
                item.classList.remove('selected');
                
            })
            item.classList.add('selected');
            const p = item.querySelector('p');
            const val = p.textContent.replace(/\D/g,'');
            raw.plan = item.querySelector('h5').textContent;
            raw.plan_value[0] = val;
        }
    })
}
function slider(){
    const sliderBox = steps[1].querySelector('.slider')
    const sliderBody = steps[1].querySelector('.sliderBody');
    const yr =  sliderBox.querySelector('#yearly');
    const mo =  sliderBox.querySelector('#monthly');
    sliderBody.onclick =  e=>{
        const sliderPointer = sliderBody.querySelector('.sliderPointer');
        if(sliderPointer.style.left === '29.5px'){
            sliderPointer.style.left = '5px';
            mo.style.color = 'black';
            yr.style.color = 'hsl(231, 11%, 63%)';
            raw.billing = ['month','mo']
            sliderBillingChange(true);
            return
        }
        sliderPointer.style.left = '29.5px';
        yr.style.color = 'black';
        mo.style.color = 'hsl(231, 11%, 63%)';
        raw.billing = ['year','yr'];
        sliderBillingChange();
    }
}
function sliderBillingChange(bil){
    //planselect opts price selecting
    const plan = steps[1].querySelectorAll('.planType');
    const arcade = plan[0].querySelector('p');
    const advanced = plan[1].querySelector('p');
    const pro = plan[2].querySelector('p');
    //add-ons opts price select
    const adds = steps[2].querySelectorAll('.addons');
    const oServices = adds[0].querySelector('span');
    const lStorage  = adds[1].querySelector('span');
    const cTheme = adds[2].querySelector('span');
    //bill add-ons price 

    const bill = steps[3].querySelectorAll('.addedFeatures');
    const billOService = bill[0].querySelector('p');
    const billlStorage = bill[1].querySelector('p');
    const billcTheme   = bill[2].querySelector('p');

    const billFooter = steps[3].querySelector('.billFooter');
    const total = billFooter.querySelector('h5');
    if(bil){
        arcade.textContent = '$9/mo';
        advanced.textContent = '$12/mo';
        pro.textContent = '$15/mo';

        oServices.textContent = '+$1/mo';
        lStorage.textContent = '+$2/mo';
        cTheme.textContent = '+$2/mo';

        billOService.textContent = '+$1/mo';
        billlStorage.textContent = '+$2/mo';
        billcTheme.textContent = '+$2/mo' ;
        total.textContent = 'Total(per month)'
        raw.plan_value[1] = 'mo';
        summary()
        return
    }
    arcade.textContent = '$90/yr';
    advanced.textContent = '$120/yr';
    pro.textContent = '$150/yr';

    oServices.textContent = '+10/yr';
    lStorage.textContent = '+20/yr';
    cTheme.textContent = '+20/yr';

    billOService.textContent = '+$10/yr';
    billlStorage.textContent = '+$20/yr';
    billcTheme.textContent = '+$20/yr' ;
    total.textContent = 'Total(per year)'
    raw.plan_value[1] = 'yr';
    summary()
}
function addOnSelect(){
    const addons = steps[2].querySelectorAll('.addons');
    const check = document.querySelectorAll('input[type=checkbox]');
    const checks = [check[0],check[1],check[2]]
    check.forEach(item=>{
        const indxref = checks.indexOf(item);
        const rawreference = ['online_service','larger_storage','custom_profile']
        item.onclick = e =>{
            const indx = checks.indexOf(item);
            const rawItem = raw.adds[rawreference[indx]]
            if(item.checked){
                const indx = checks.indexOf(item);
                const rawItem = raw.adds[rawreference[indx]]
                const price = addons[indx].querySelector('span').textContent.replace(/\D/gi,'');
                rawItem[0] = true;
                rawItem[1] = price;
                item.parentElement.classList.add('checked')
                return
            }
            rawItem[0] = false;
            rawItem[1] = null;
            item.parentElement.classList.remove('checked')
        }
        if(item.checked === true && raw.billing[1] === 'yr' && raw.adds[rawreference[indxref]][1] < 10){
            raw.adds[rawreference[indxref]][1] = raw.adds[rawreference[indxref]][1] * 10;
            return
        }
        if(item.checked === true && raw.billing[1] === 'mo' && raw.adds[rawreference[indxref]][1] >= 10){
            raw.adds[rawreference[indxref]][1] = raw.adds[rawreference[indxref]][1] / 10;
            return
        }
    })
}

function summary(){
    const summary = steps[3]
    const billHeader = summary.querySelector('.billheader');
    const billHh5 = billHeader.querySelector('h5');
    const billHspan = billHeader.querySelector('span');
    billHh5.textContent = raw.plan;
    if(raw.plan_value[1] === 'yr'){
        if(raw.plan_value[0] == 90 || raw.plan_value[0] == 120 || raw.plan_value[0] == 150 ){
            billHspan.textContent = `$${raw.plan_value[0]}/${raw.plan_value[1]}`
            return
        }
        raw.plan_value[0] = raw.plan_value[0] * 10;
        billHspan.textContent = `$${raw.plan_value[0]}/${raw.plan_value[1]}`;
        return
    }
    if(raw.plan_value[0] < 20 && raw.plan_value[1]=== 'mo' ){
        billHspan.textContent = `$${raw.plan_value[0]}/mo`;
        return
    }
    billHspan.textContent = `$${raw.plan_value[0]/10}/mo`;
}
function added(){
    const addedFeatures = steps[3].querySelectorAll('.addedFeatures');
    const added = [
        raw.adds.online_service,
        raw.adds.larger_storage,
        raw.adds.custom_profile
    ];
    addedFeatures[0].querySelector('p').textContent = `+$${added[0][1]}/${raw.billing[1]}`;
    addedFeatures[1].querySelector('p').textContent = `+$${added[1][1]}/${raw.billing[1]}`;
    addedFeatures[2].querySelector('p').textContent = `+$${added[2][1]}/${raw.billing[1]}`;
    added.forEach(item=>{
        if(item[0]){
            const indx = added.indexOf(item);
            addedFeatures[indx].classList.remove('none');
            return
        }
        const nullindx = added.indexOf(item);
        addedFeatures[nullindx].classList.add('none');
    })
}
function total (){
    const billFooter = steps[3].querySelector('.billFooter');
    const totalVal = billFooter.querySelector('p');
    let total = 0;
    const bill = [
        raw.adds.online_service[1],
        raw.adds.larger_storage[1],
        raw.adds.custom_profile[1]
    ]
    bill.forEach(item=>{
        if(item !== null){
            total = total +  Number(item);
        }
    })
    if(raw.plan_value[0] > 30 && raw.billing[1] === 'mo'){
        totalVal.textContent = `$${Number(raw.plan_value[0])/10 + Number(total)}/${raw.billing[0]}`
        return
    }
    totalVal.textContent = `$${Number(raw.plan_value[0])+Number(total)}/${raw.billing[0]}`;
}
Form()
planSelecting();
slider();
addOnSelect();