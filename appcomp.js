let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('.rset');
let winText = document.querySelector('.wintext');
let winArr=[
    [0,1,2],[0,3,6],[0,4,8],
    [1,4,7],[2,5,8],[2,4,6],
    [3,4,5],[6,7,8]
];
let ply1=true;
let f=0;
let f1=0;
let bpress=0;
const allBtnDisable =()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const allBtnEnable =()=>{
    for(let box of boxes){
        box.innerText='';
        box.disabled=false;
        ply1=true;
        f=0;
    }
}
const checkDraw=()=>{
    for(let box of boxes){
        if(box.innerText!=''){
            f=f+1;
        }
    }
    if(f==9){
        winText.innerText="Draw";
        f1=1;
        document.getElementById('wintext').style.fontSize="3rem";
    }
}
const checkWinner =(i) =>{
    for(pattern of winArr){        
        if(boxes[pattern[0]].innerText!=''&& boxes[pattern[1]].innerText!=''&& boxes[pattern[0]].innerText!=''){
            if(boxes[pattern[0]].innerText==boxes[pattern[1]].innerText && boxes[pattern[1]].innerText==boxes[pattern[2]].innerText){
                winText.innerText=`${i} Won `;
                allBtnDisable();
                document.getElementById('wintext').style.fontSize="3rem";
                f1=1;
            }
            else{
                checkDraw();
                f=0;
            }
        }
    }
}

const randbox=()=>{
    while(1){
        let compbox= Math.floor(Math.random()*8);
        if(boxes[compbox].innerText==''){
        boxes[compbox].innerText="O";
        boxes[compbox].disabled=true;
        break;
        }
    }
}
const calbox=()=>{
    let flag1=0;
    let flag2=0;
    for(let i=0;i<8;i++){
        let twovar=onevar=val=0;
        if(boxes[winArr[i][0]].innerText=="O"){
            twovar++;
        }
        else if(boxes[winArr[i][0]].innerText==""){
            onevar++;
            val=0;
        }
        if(boxes[winArr[i][1]].innerText=="O"){
            twovar++;
        }
        else if(boxes[winArr[i][1]].innerText==""){
            onevar++;
            val=1;
        }
        if(boxes[winArr[i][2]].innerText=="O"){
            twovar++;
        }
        else if(boxes[winArr[i][2]].innerText==""){
            onevar++;
            val=2;
        }
        if((twovar==2)&&(onevar==1)){
            boxes[winArr[i][val]].innerText="O";
            boxes[winArr[i][val]].disabled=true;
            flag1=1;
            break;
        }
    }
    if(flag1==0){
        for(let i=0;i<8;i++){
            let twovar=onevar=val=0;
            if(boxes[winArr[i][0]].innerText=="X"){
                twovar++;
            }
            else if(boxes[winArr[i][0]].innerText==""){
                onevar++;
                val=0;
            }
            if(boxes[winArr[i][1]].innerText=="X"){
                twovar++;
            }
            else if(boxes[winArr[i][1]].innerText==""){
                onevar++;
                val=1;
            }
            if(boxes[winArr[i][2]].innerText=="X"){
                twovar++;
            }
            else if(boxes[winArr[i][2]].innerText==""){
                onevar++;
                val=2;
            }
            if((twovar==2)&&(onevar==1)){
                boxes[winArr[i][val]].innerText="O";
                boxes[winArr[i][val]].disabled=true;
                flag2=1;
                break;
            }
        }       
    }
    if((flag1==0)&&(flag2==0)){
        randbox();
        flag1=0;
        flag2=0;
    }
}
const comp=()=>{
    if(bpress==1){
        if(boxes[4].innerText==''){
            boxes[4].innerText="O";
            boxes[4].disabled=true;
        }
        else{
            randbox();
        }
    }
    else if(bpress>1){
        calbox();
    }   
}
boxes.forEach(
    (box)=>{
        box.addEventListener("click",()=>{
            bpress++;
            f1=0;
            box.innerText="X";
            checkWinner("You");
            box.disabled=true;
            if(!f1){
                comp();
                checkWinner("Computer");
            }
        })
    }
)
reset.addEventListener("click",()=>{
    winText.innerText="All The Best";
    bpress=0;
    document.getElementById('wintext').style.fontSize="1.5rem";
    allBtnEnable();
})