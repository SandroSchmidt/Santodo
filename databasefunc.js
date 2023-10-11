

//const readinds = [...dataset]
const readinds = JSON.parse(JSON.stringify(dataset))


process_ds_temp()

function process_ds_temp(){
    maximale_logiclänge =0 
    // diese funtion wird am anfang ausgeführt und sie bereitet das dataset auf die folgende nutzung vor
    for (i = 0; i < dataset.length; i++) {

        
if (typeof dataset[i].inhalt != 'object'){
    dataset[i].inhalt = [dataset[i].inhalt]
}

        if(dataset[i].show == undefined){dataset[i].show = true}
        maximale_logiclänge = Math.max(maximale_logiclänge,dataset[i].logic.length)
        dataset[i].id = i;
        
if(dataset[i].ausklappen == undefined){dataset[i].ausklappen = true}
        if (dataset[i].title == undefined) {
            dataset[i].title = dataset[i].logic[dataset[i].logic.length - 1]
        }
	
        if (dataset[i].color == "inherit"||dataset[i].color == undefined) {
            a = find_oneup(dataset[i],dataset)
            dataset[i].color = a.color
        }

        if ( dataset[i].color == undefined){dataset[i].color="white"}
        //if(dataset[i].progress != undefined && dataset[i].due_date==undefined){dataset[i].due_date=dataset[i].start}
        if (dataset[i].type == "person") {dataset[i].stärke =1}

	if (dataset[i].start != undefined && dataset[i].end== undefined){dataset[i].end = dataset[i].start}
    dataset[i].origcolor = dataset[i].color;


      //  if (dataset[i].inhalt == undefined) {         dataset[i].inhalt = dataset[i].logic[dataset[i].logic.length - 1] + " hat keinen Inhalt"        }
      // if (dataset[i].color == undefined){dataset.color = "white"}
	dataset[i].origcolor = dataset[i].color
if(dataset[i].show==false){
    dataset[i].origcolor = dataset[i].color; dataset[i].color ="none"}
    //if (dataset[i].start.includes("KW") == true){alert('test')}
    }
   
  // der anteil der vorbereitung der rückwärts stattfinden muss, also in bezug auf die logic
    for (k=maximale_logiclänge;k>0;k--){  
        for (i = 0; i < dataset.length; i++) {
            if (dataset[i].logic.length == k){
                if(dataset[i].progress != undefined){
                if (dataset[i].progress == "calc"){
                    kinder = show_children(dataset[i],dataset)
                    p = 0
                    for(j=0;j<kinder.length;j++){
                        p +=kinder[j].progress                        
                    }
                 
                    dataset[i].progress =p/kinder.length
                }}

                if(dataset[i].stärke != undefined){
                    if (dataset[i].stärke == "calc"){
                        kinder = show_children(dataset[i],dataset)
                        p = 0
                        for(j=0;j<kinder.length;j++){
                            if (typeof kinder[j].stärke === 'number') { p +=kinder[j].stärke     }                  
                        }
                     
                        dataset[i].stärke =p
                    }}





            }
        }



        

    }



}
function show_children(elm,ds){
    children =[]
    for(iii=0 ;iii<ds.length;iii++){
        has_children = false
        a = JSON.stringify(ds[iii].logic.slice(0,-1))  // ein string aus dem logic array des möglichen vorgesetzten
        b = JSON.stringify(elm.logic.slice())         // ein strin aus dem all up ohne das eigensymbol des elm = untergebenen
        if (a==b){
            children.push(ds[iii])
            has_children = true
        }
    }
    if (has_children=false){children ='hat keine Kinder';alert(elm.title + " hat keine Kinder!")}
    return(children)
}
function show_decendents(elm,ds){
    decendents =[]
    for(i=0 ;i<ds.length;i++){
        has_decendents = false
        a = JSON.stringify(ds[i].logic.slice(0,elm.logic.length))  // ein string aus dem logic array des möglichen vorgesetzten
        b = JSON.stringify(elm.logic.slice())         // ein strin aus dem all up ohne das eigensymbol des elm = untergebenen
        if (a==b && ds[i].id!=elm.id){
            decendents.push(ds[i])
            has_decendents = true
        }
    }
    if (has_decendents=false){decendents ='hat keine Nachkommen';alert(elm.title + " hat keine Nachkommen!");return(false)}
    else{return(decendents)}

}
function find_oneup(elm,ds){
    has_oneup = false;
  for (let ii=0;ii<ds.length;ii++){
    a = JSON.stringify(ds[ii].logic.slice())  // ein string aus dem logic array des möglichen vorgesetzten
    b = JSON.stringify(elm.logic.slice(0,-1))         // ein strin aus dem all up ohne das eigensymbol des elm = untergebenen
  if(ds[0]==elm){has_oneup=true;return elm;}
      else
          {
              if (a==b){
              has_oneup=true;
              return(ds[ii])
          }
      }
  }
  if (has_oneup ==false){alert("hat kein oneup! ID: " +elm.id + "  / "+elm.title )}
}

