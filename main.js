total.innerText=documentArray.length;
//HOME PAGE CLICK SOUND EFFACT
homePage.addEventListener('click',()=>{
    clickSound.play();
    setTimeout(() => {
        location.replace("/quiz")
    }, 500);
    });
    //START EXAM BUTTON CLICK EVENT
    startExamBtn.addEventListener('click',startQuiz);
    function startQuiz(){
    clickSound.play();
    resultHistorey.style.display='none';
    QOC.style.display='block';
    for(i=0;i<=3;i++){
        allOptionEl[i].classList.remove('select');
    }
    timerCover.style.transform='scale(0)';
    questionBar.style.transform='';
    for(let i=0;i<=3;i++){
        allOptionEl[i].style.transform='';
    };
    setTimeout(() => {
        starrBtnCover.style.display='none';
        bottomBtnGroup.style.display='block';
        timerCover.style.transform='scale(1)';
        slideSound.play();
        questionIndex=0;
        addQuestion(documentArray[0],1);
        questionBar.style.transform='translateX(0)';
        for(let i=0;i<=3;i++){
            allOptionEl[i].style.transform='translateX(0)';
        };
        countdown()
    }, 700);
    }
    //OLD EXAM SHOWING BUTTON EVENT
    oldResultBtn.addEventListener('click',()=>{
    clickSound.play();
    starrBtnCover.style.display='none';
    showResult()
    });
    /*************************************************************************** */
    nextBtn.addEventListener('click',()=>{
    clickSound.play();
    changeQuestion();
    });
    
    //CountDown Or Question Progress Bar
    var interval;
    function countdown(){
    var count = 60;
    clearInterval(interval);
    interval = setInterval(() => {
      timer.innerText = count--;
      progress.style.display='block';
      progress.style.width=`${(100/60)*(60-count)}%`;
        if(count<10){
            timerCover.style.animation="mymove 1s infinite";
            timerCover.style.color='red';
            progress.style.background='red';
            alertSound.play();
        }else{
            timerCover.style.color=''; 
            timerCover.style.animation="";
            progress.style.background='';
            alertSound.pause();
            alertSound.currentTime = 0;
        }
      if (count < 0) {
        clearInterval(interval);
        alertSound.pause();
        alertSound.currentTime = 0;
        changeQuestion()
      }
    }, 1000);
    }
    
    //Question Adding System Here
    function addQuestion(e,QIndex){
    question.innerHTML=e.question;
    let randomNum=(Math.random()*3).toFixed();
    let inarray=[0,1,2,3];
    let index=inarray.indexOf(Number(randomNum));
    inarray.splice(index,1);
    optionText[randomNum].innerText=e.option[0];
    optionText[inarray[0]].innerText=e.option[1];
    optionText[inarray[1]].innerText=e.option[2];
    optionText[inarray[2]].innerText=e.option[3];
    let num=Number(100/Number(documentArray.length));
    headerLoding.style.width=`${num*QIndex}%`;
    }
    //Slidbar
    function slidbar(){
    slideSound.currentTime = 0;
    slideSound.play();
    questionBar.style.transform='';
    for(i=0;i<=3;i++){
        allOptionEl[i].style.transform='';
    }
    setTimeout(() => {
        questionBar.style.transform='translateX(0)';
        for(let i=0;i<=3;i++){
            allOptionEl[i].style.transform='translateX(0)';
        };
        slideSound.currentTime = 0;
        slideSound.play();
    }, 500);
    }
    
    //If I Click Option
    var elmentName;
    optionWrap.addEventListener('click',e=>{
    let OptionNam= e.target.parentElement.getAttribute('name');
    if(OptionNam != null){ elmentName= OptionNam;    clickSound.play(); };
    for(i=0;i<=3;i++){
        if(elmentName==i){
            allOptionEl[i].classList.add('select');
            storeValue[questionIndex]=allOptionEl[i].children[0].innerText;
        }else{
            allOptionEl[i].classList.remove('select');
        };
    }
    });
    
    
    tryAgainBtn.addEventListener('click',startQuiz)
    
    function showResult(){
    QOC.style.display='none';
    getData()
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    let point=0;
    for(let i=0;i<documentArray.length;i++){
        let tr=document.createElement('tr');
        let td=document.createElement('td');
        tr.classList.add('question')
        td.setAttribute('colspan','2')
        td.innerHTML=documentArray[i].question;
        tr.append(td)
        tbody.append(tr)
    
        let tr1=document.createElement('tr');
        let td1=document.createElement('td');
        let td2=document.createElement('td');
       
        let userans=storeUserValue[i];
        let realans=documentArray[i].option[0];
    
        if(userans==realans){
            tr1.classList.add('rightAns')
            td1.innerText=userans;
            td2.innerText=realans;
            point++
        }else if(userans==undefined){
            tr1.classList.add('worng')
            td1.innerText='You did not answer';
            td2.innerText=realans;
        }
        else{
            tr1.classList.add('worng')
            td1.innerText=userans;
            td2.innerText=realans;
        }
        tr1.append(td1)
        tr1.append(td2)
        tbody.append(tr1)
    }
    asivment.innerText=point;
    resultHistorey.style.display='block';
    }
    
    goBack.addEventListener('click',()=>{
    clickSound.play();
    setTimeout(() => {
        location.reload(); 
    }, 300);
    });