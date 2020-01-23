let exceptNames = [];
exceptNames.push('')

LoadCurrency(exceptNames);

async function LoadCurrency(exceptId) {
    let currencies = await GetAllCurrency();

    let table = document.getElementById('tableBody');
    table.innerHTML = '';
    let counter = 1;

    start:for (let k in currencies) {
        if (currencies[k] instanceof Object) {

        for(let i=0;i<exceptId.length;i++){
                if(currencies[k].id == exceptId[i]){
                    continue start;
                }
            }


            let tr = document.createElement('tr');

            let th = document.createElement('th');
            th.scope = 'row';
            th.innerHTML = counter;
            tr.appendChild(th);

            let td = document.createElement('td'); 
            td.innerHTML = k;
            tr.appendChild(td);

            td = document.createElement('td'); 
            td.innerHTML = currencies[k].name;
            td.classList.add('name');
            tr.appendChild(td);

            td = document.createElement('td'); 
            td.innerHTML = currencies[k].humanType;
            tr.appendChild(td);
          
            td = document.createElement('td'); 
            td.innerHTML = currencies[k].currencyType;
            tr.appendChild(td);

            td = document.createElement('td'); 
            td.innerHTML = currencies[k].txFee;
            tr.appendChild(td);

            td = document.createElement('td'); 
            td.innerHTML = currencies[k].minConf;
            tr.appendChild(td);

            td = document.createElement('td'); 
            let btn = document.createElement('button');
            btn.id = currencies[k].id;
            btn.innerHTML = 'DELETE';
            btn.type = 'button';
            btn.classList.add('btn');
            btn.classList.add('btn-danger');
            btn.classList.add('btn-sm');      
            btn.addEventListener('click',function(){deleteCurrencie(currencies[k].id)});
            td.appendChild(btn);
            tr.appendChild(td);
            // $('.btn').click(function(){
            //     deleteCurrencie(this.id);
            // });

            table.appendChild(tr);
            counter++;
        }
    }
}


async function GetAllCurrency() {
    let url = 'https://poloniex.com/public?command=returnCurrencies';
    let response = await fetch(url);
    let currencies = await response.json(); // читаем ответ в формате JSON
    return currencies;
}


function deleteCurrencie(id){
    console.log('Delete ' + id);
    exceptNames.push(id);
    LoadCurrency(exceptNames);
}