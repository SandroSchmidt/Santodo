


function disp_orgchart(sel_elm,ds){
  level =1
	rad =15
	svg_endhöhe = 75
	main.append('button').text('Farbe')
	.on('click',function(){
    
    
    display_farbe = !display_farbe;
	  select(sel_elm,ds)
	})

 main.append('button').text('Stärke')
  .on('click',function(){display_stärke = !display_stärke;
    select(sel_elm,ds)
    //disp_orgchart(sel_elm,ds);
   })

 main.append('button').text('Personen')
  .on('click',function(){orgchart_options.show_persons = !orgchart_options.show_persons;
    select(sel_elm,ds)
    //disp_orgchart(sel_elm,ds);
   })
.on('dblclick', function(){


  
  
	k =1
	ganzes.selectAll('*').remove()

    //ganzes.append('table').attr('id','tab1').style('padding-left',"10px").style('width','100%')
    temp_tab = ganzes.append('table').style('border-collapse',"collapse").style('margin','auto')
  
  
 
	
  ganzes.append('p').text("Liste aller Personen die unterhalb des Elementes : - "+sel_elm.title+" - aufgehangen sind.")
	temp_ds = show_decendents(sel_elm,ds)
	
  for (i=0;i<temp_ds.length;i++){temp_ds[i].logic = temp_ds[i].logic.splice(2).join(" > ") ;   }
  //.splice(2)
  
temp_ds = temp_ds.sort(function(a,b){return a-b})



 
  
  headr = temp_tab.append('tr')
  headr.append('th').text("No.")
  headr.append('th').text("Structure")
  headr.append('th').text("Title")
  headr.append('th').text("Name")
  headr.append('th').text("Contact")
  headr.append('th').text("Comment"
  )
  for(i=0;i<temp_ds.length;i++){
	lz=""
	if (k<10){lz="0"}
	xot = ""
  temp3 = "---"
let raz =temp_ds[i].id
	
	if (temp_ds[i].person != undefined){
    if(temp_ds[i].person.name != undefined){xot=temp_ds[i].person.name}
    if(temp_ds[i].person.erreichbarkeit != undefined){temp3=temp_ds[i].person.erreichbarkeit}
    }

	if (temp_ds[i].type == "person" &&temp_ds[i].person != undefined ){
    row = temp_tab.append('tr')
    row.append('td').text("Nr: "+lz+k)
    row.append('td').text(temp_ds[i].logic)
    row.append('td').text(temp_ds[i].title)
    row.append('td').append("button").text(xot)//.on('click',function(){select(ds[raz],ds)})
    row.append('td').text(temp3)
    row.append('td').text(temp_ds[i].inhalt)//+" - " + temp_ds[i].logic)

	k++	

}

	}
})

main.append('button').text('Icons')
  .on('click',function(){display_icons = !display_icons;
    select(sel_elm,ds)
    //disp_orgchart(sel_elm,ds);
   })


main.append('button').text('Kommentar')
.on('click',function(){display_comment = !display_comment;
  select(sel_elm,ds)
  //disp_orgchart(sel_elm,ds);
 })
   main.append('input').attr('type','button').attr('value',"Fortschritt").on('click',function(){show_progress= !show_progress; select(sel_elm,ds)})
    svg_size ={height:fenster.hoehe*(1-layout.v1)-30,width:(fenster.breite*(1-layout.h2)-30)}
    main.append("svg").attr('id','orgsvg')
    
    .attr('width',svg_size.width)


//.attr('height',svg_size.height).append('g')
	.attr('height',"500px").append('g')


      .attr('id','lines')

    //  max_x =0
    svg = main.select('#orgsvg')
//svg.style('float','left')

orgchart_ds =[]
temp_ds = show_decendents(sel_elm,ds)
    console.log(temp_ds.length)
    temp2_ds=[]
    for(i=0;i<temp_ds.length;i++){

 if (temp_ds[i].show != false){
    temp2_ds.push(temp_ds[i])

}   }


if (orgchart_options.show_persons == true){
orgchart_ds = temp2_ds
}else{
for(i=0;i<temp2_ds.length;i++){
if (temp2_ds[i].type != "person"){
orgchart_ds.push(temp2_ds[i])
}

}}

    //----- ab hie weiter durchgehen

  //  let ugc = find_oneup(sel_elm,ds)

//main = d3.select('#'+wo).select('#info_div')
//  main.selectAll('*').remove()


 //main.append('button').text('oneup').style("float","right ").on('click',function(){
 // element_selected(ugc,wo);})



      l=0;
      zweitereihe = show_children(sel_elm,orgchart_ds);
      l = zweitereihe.length;
      symbol_counter =0;

    //zoom = Math.min(5+(l*2),200)
    if(l>10){zoom =20}
    if(l==10){zoom =22}
    if(l==9){zoom =24}
    if(l==8){zoom =26}
    if(l==7){zoom =28}
    if(l==6){zoom =30}
    if(l<6){zoom =33}

//zoom = zoom * 1.5





 symbol_x = 3*zoom;
 symbol_y = 2*zoom;
 rand= zoom;
 zeile2= 2*symbol_y+rand;
 zeile3y =4*symbol_y+rand;
 zeile3x= 0.5*symbol_x+rand;


      headx = Math.max(0,(l-1))*symbol_x+rand;


  //   if (sel_elm.logic.slice(-1)==='Bluebook'){ head_ds={name:'Bluebook'}}
//     else {    head_ds = sel_elm}
//------- ab hier gethss weiter
      draw_symbol(headx,rand,sel_elm,svg);
      rad-=5
      level = 2
      for (i=0;i<zweitereihe.length;i++){

          x=    i*2*symbol_x+rand ;
          y=zeile2;
          svg_endhöhe = Math.max(svg_endhöhe,zeile2+symbol_y)
          draw_symbol(x,y,zweitereihe[i],svg);

   zuzu=0
   
         if (zweitereihe[i].order != undefined){zuzu=25}

// vertikale striche us der zweiten zeile nch oben
         svg.select('#lines')
      .append('line')
      .attr('stroke','black')
      .attr('stroke-width', liniendicke)
      .attr('x1', x+(zoom*0.5*3))
      .attr('x2', x+(zoom*0.5*3))
// das ist wie tief der strich in der zweiten reihe herunter geht, ich habe das für personen verlängert
      .attr('y1', y+3 -zuzu)
      .attr('y2', y-(zoom*0.5*2)-0.4);

      }
      if (l>0){
      // zeichne horizontale zwischen zeile eins und zwei
      svg.select('#lines')
      .append("line")
      .attr('stroke','black')
      .attr('stroke-width', liniendicke)
      .attr('x1', (0.5*symbol_x+rand))
      .attr('x2',((2*l-1.5)*symbol_x+rand))
      .attr('y1', rand + (3*zoom))
      .attr('y2', rand + (3*zoom));
        // der eine strich nach unten vom head aus
         svg.select('#lines')
      .append("line")
      .attr('stroke','black')
      .attr('stroke-width', liniendicke)
      .attr('x1', rand+symbol_x*(l-0.5))
      .attr('x2', rand+symbol_x*(l-0.5))
      .attr('y1', rand + (1.0*symbol_y))
      .attr('y2', rand + (1.5*symbol_y));

                }
// dritte reihe
                rad-=5
                level =3
      for(ti=0;ti<zweitereihe.length;ti++){
          x=    zeile3x+ti*symbol_x*2 + symbol_x/2;   // dieses symbol" bewirkt, dass die unteren in der mitte unter sind
        

          enkel =[]
          if (zweitereihe[ti].ausklappen == true){enkel =show_children(zweitereihe[ti],orgchart_ds)}

          for(j=0;j<enkel.length;j++){
                  //erste spalte der dritten reihe
          //    alert('Enkel '+j+'eee'+ti)
          svg_endhöhe = Math.max(svg_endhöhe,(zeile3y+(j*symbol_y*1.5)+symbol_y))
              draw_symbol(x,zeile3y+j*symbol_y*1.5,enkel[j],svg);
           //   draw_symbol(zeile3x,zeile3y,enkel[j]);
                  // horizontale striche der dritten reihe


          y=zeile3y+j*symbol_y*1.5;
          svg.select('#lines')
      .append('line')
      .attr('stroke','black')
      .attr('stroke-width', liniendicke)
      .attr('x1', x-0.5*symbol_x)
      .attr('x2', x+0.5*symbol_x)
      .attr('y1', y+0.5*symbol_y)
      .attr('y2', y+0.5*symbol_y);

      // vertikale striche der dritten reihe
     svg.select('#lines')
      .append('line')
      .attr('stroke','black')
      .attr('stroke-width', liniendicke)
      .attr('x1', x-0.5*symbol_x)
      .attr('x2', x-0.5*symbol_x)
      .attr('y1', 1+y+0.5*symbol_y)
      .attr('y2', (y-1 *symbol_y));
      }
      //main
        //  .select('#orgi_svg')
        //  .attr('height',svg_endhöhe)
  }

  svg_endhöhe += 25
  svg.attr('height',svg_endhöhe+"px")

}
function draw_symbol(x,y,elm,svg){

  

    // für jedes orgchar-ellement wird ein g erstellt in dem die anteile des elm sind
    n = 'g_'+symbol_counter;
    symbol_counter ++;

   if(elm.color != undefined && display_farbe == true){s_color = elm.color}
   else { s_color = 'white'}

   if(elm.gestrichelt===true){
       f = (3*zoom)/15
       dash_modus = f+','+f
   }
   else{dash_modus=''}

   //if(elm==selected_elm){s_color='gold'}

   svg
   .append('g')
       .attr('id',n)
       .on('click',function(){select(dataset[elm.id],dataset)})
.style('cursor','pointer')
//.style('hover','background-color:yellow')
       
   .append('rect')
       .attr("width", symbol_x + 'px')
       .attr("height", symbol_y + 'px')
       .attr('stroke-width',liniendicke)
       .attr('stroke-dasharray',dash_modus)
       .attr('stroke', 'black')
       .attr('x',x)
       .attr('y',y)
.attr('rx',4)
       .attr('fill',s_color)
	.on('mouseover',function(d){
		//	d3.select(event.currentTarget).attr('rx',15)
       d3.select(event.currentTarget).attr('stroke-width',liniendicke*3)
})
.on('mouseout',function(d){
//			.attr('rx',5)
       d3.select(event.currentTarget).attr('stroke-width',liniendicke)
})

   // der title ist der tooltiptext
   .append('title')
   .text('Inhalt: '+ elm.title )  ;

in_text_gr =10
in_text = String(elm.logic.slice(-1))

if(elm.type =="person"){  in_text_gr -= 3}
 in_text8 = in_text.split(" ")

     in_text1 = in_text8[0]
     //  in_text2 = in_text8[1]
       in_text2 = ""
       k=0
       for (o=1;o<in_text8.length;o++){
           if (in_text1.length+in_text8[o].length<11){in_text1 = in_text1 + " " + in_text8[o];k=o}
       else
       { //in_text1 = in_text1 + ".."
           break
       }}
       in_text2 = in_text8[k+1]
        for (o=k+2;o<in_text8.length;o++){
           if (in_text2.length+in_text8[o].length<11){in_text2 = in_text2 + " " + in_text8[o]}
       else
        { in_text2 = in_text2 + ".."
           break
       }
        }


   if(in_text2 == ""||in_text2 == undefined)//in_text.length < 11 || in_text8.length == 1)
    {

    in_text_gr = Math.max((25 - in_text1.length*1),8)
        svg.select('#' + n)
            .append('text')
            .attr("width", symbol_x + 'px')
            .attr("height", symbol_y + 'px')
            .attr('class', 'symboltext')
            .style('word-wrap', 'break-word')

            .attr('font-size', in_text_gr)//,zoom-1)
            .attr('text-anchor', 'middle')
            // .attr('alignment-baseline','center')
            .attr('x', x + 0.5 * symbol_x)
             .attr('y', y + (symbol_y + in_text_gr / 2) / 2)
            .text(elm.logic.slice(-1));
    }
   else
   {
       ml = Math.max(in_text1.length,in_text2.length)
    in_text_gr = Math.max((25 - ml*1),8)


      // in_text1 = // in_text.slice(0,5)
     //  in_text2 = in_text.slice(6,99)
       svg.select('#' + n)
            .append('text')
            .attr('font-size', in_text_gr)//,zoom-1)
            .attr('text-anchor', 'middle')
            .attr('x', x + 0.5 * symbol_x)
            .attr('y', y + (symbol_y + in_text_gr / 2) / 3)
            .text(in_text1);
       svg.select('#' + n)
            .append('text')
            .attr('font-size', in_text_gr)//,zoom-1)
            .attr('text-anchor', 'middle')
            .attr('x', x + 0.5 * symbol_x)
            .attr('y', y + (symbol_y + in_text_gr / 2)* 2/ 3)
            .text(in_text2);

   }
   if(elm.type =="person"){
     
     rem = Math.sqrt((symbol_y*symbol_y)/2)
     fx = x+ (symbol_x-rem)/2
     fy = y+ (symbol_y-rem)/2
    svg.select('#' + n)
        .select('rect')
        .attr('x', fx)
        .attr('y',fy)
        .attr('transform','rotate(-45,'+(fx+rem/2)+', '+(fy+rem/2)+')')
        //.attr('transform','rotate(-45,'+x+', '+y+') translate('+ (+symbol_y/2 - rem) + ','+symbol_y/2+')')
       // .attr('transform','rotate(-0,'+(x+rem/2)+', '+(y+rem/2)+') translate('+ (symbol_x-rem)/2  + ','+(symbol_y-rem)/2+')')
        .attr('height',rem)
        .attr('width',rem)
   }

// Textfeld rechts unten mit der stärke
if (display_stärke == true){
  svg.select('#' + n)
       .append('text')
       .attr('font-size',(7/15)*zoom)//,zoom-1)
       //.attr('text-anchor','middle')
       .attr('x', x+symbol_x+2)
       .attr('y',y+symbol_y)
       .text (elm.stärke)
    //   .text(stärke_str(elm.stärke));}

   }
  
//   .text(stärke_str(elm.stärke));
if (display_comment == true && elm.comment != undefined){
  svg.select('#' + n)
       .append('text')
       .attr('font-size',(7/15)*zoom)//,zoom-1)
       //.attr('text-anchor','middle')
       .attr('x', x+symbol_x+5)
       .attr('y',y+10)
       .text (elm.comment)
    //   .text(stärke_str(elm.stärke));}

  

   }
 
   if (dataset[selected_id].type == "minimap"){
   
    feld
    .append('text')
   // .attr('font-size',(7/15)*zoom)//,zoom-1)
   .attr('text-anchor','end')
    .attr('x', x-5)
    .attr('y',y+symbol_y-5)
   .text (find_oneup(elm,dataset).title)
   
    
            
    //feld.append('circle').attr('cx',x).attr('cy',y).style('fill',farbschema2[farbnr]).attr('r',3).style('stroke','black')
 
   
}


   if (display_holder == true){
    // alert('z')
 svg.select('#' + n)
      .append('text')
      .attr('font-size',(1/3)*zoom)//,zoom-1)
      .attr('text-anchor','end')
      .attr('x', x-2)
      .attr('y',y+10)
      .text (elm.holder)
   //   .text(stärke_str(elm.stärke));}

}
   if(level ==2 &&show_children(elm,dataset).length != []){ //!= 'hat keine Kinder'){
    fi = "-"
    if (elm.ausklappen==false        ){fi="+"}
    svg//.select('#' + n)
        .append('text')
        .attr('font-size', (1 / 3) * zoom)//,zoom-1)
        .attr('text-anchor', 'end')
        .attr('x', x + symbol_x/2 +5)
        .attr('y', y + symbol_y+ 10)
        .text(fi)//(elm.ausklappen)
        .on('click', function () {
          elm.ausklappen = !elm.ausklappen;
          select(dataset[selected_id], dataset)
      })
       .style('cursor','pointer')
  .attr('x', x + symbol_x/2 +5)
        .attr('y', y + symbol_y+ 10)

}

//wenn ein größenordnungszeichen existiert
if (elm.order != undefined){

  svg//.select('#' + n)
  .append('text')
  .attr('font-size', (1/ 2) * zoom)//,zoom-1)
  .attr('text-anchor', 'middle')
  .attr('font-weight',"bold")
  .attr('x', x + symbol_x/2 )
  .attr('y', y - 5)
  .text(elm.order)//(elm.ausklappen)



}


   if(elm.vernichtet != undefined){
	if(elm.vernichtet == "doppelrot"){

       svg.select('#' + n).append('line')
      .attr('stroke','red')
      .attr('stroke-width', liniendicke*2)
      .attr('x1', x-symbol_x*0.1)
      .attr('x2', x+symbol_x*1.1)
      .attr('y1', y+symbol_y*1.1)
      .attr('y2', y-symbol_y*0.1);

 svg.select('#' + n).append('line')
      .attr('stroke','red')
      .attr('stroke-width', liniendicke*2)
      .attr('x1', x-symbol_x*0.1)
      .attr('x2', x+symbol_x*1.1)
      .attr('y2', y+symbol_y*1.1)
      .attr('y1', y-symbol_y*0.1);
}
if(elm.vernichtet == "doppelblau"){

       svg.select('#' + n).append('line')
      .attr('stroke','blue')
      .attr('stroke-width', liniendicke*2)
      .attr('x1', x-symbol_x*0.1)
      .attr('x2', x+symbol_x*1.1)
      .attr('y1', y+symbol_y*1.1)
      .attr('y2', y-symbol_y*0.1);

 svg.select('#' + n).append('line')
      .attr('stroke','blue')
      .attr('stroke-width', liniendicke*2)
      .attr('x1', x-symbol_x*0.1)
      .attr('x2', x+symbol_x*1.1)
      .attr('y2', y+symbol_y*1.1)
      .attr('y1', y-symbol_y*0.1);
}
   }

if(elm.icon != undefined && display_icons == true){
svg.append('image').attr('x', x+symbol_x*1.1).attr('y', y).attr('xlink:href',elm.icon).attr('height',symbol_y)
}






//progrsee kreile malen
//rad =10
        
        if(elm.progress != undefined&&show_progress==true){
      //    alert("da is er")
            coltemp="red"
            if (elm.progress > 0.3){coltemp="yellow"}
            if (elm.progress > 0.6){coltemp="orange"}
            if (elm.progress > 0.8){coltemp="green"}
            svg.select('#' + n)
            .append('circle')
            .attr('cx',x+symbol_x)//+symbol_x/2-rad)
            .attr('cy',y)//-symbol_y/2+rad)
            .attr('r',rad)
            .attr('fill', coltemp)//symfill)
            .attr('stroke-width', liniendicke)
            .attr('stroke', 'black')
        }


if (elm.aktiv!= undefined && elm.aktiv != 'aktiv')

{           if (elm.aktiv == 'teil'){eckfüll = 'none';tit = 'Teilaktiv'}
           if (elm.aktiv == 'nicht'){eckfüll = 'black';tit = 'Nichtaktiv'}
               svg.select('#'+n)
       .append('polygon')
       .attr('points', (x+symbol_x-zoom/2) + ',' +(y+symbol_y)+' '+(x+symbol_x)+','+(y+symbol_y-zoom/2)+' '+(x+symbol_x)+','+(y+symbol_y))
       .attr('stroke','black')
       .attr('stroke-width', liniendicke*2)
       .attr('fill',eckfüll)
       .append('title').text(tit)
       }



}