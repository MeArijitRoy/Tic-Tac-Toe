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
        document.getElementById('wintext').style.fontSize="3rem";
    }
}

const checkWinner =(i) =>{
    for(pattern of winArr){        
        if(boxes[pattern[0]].innerText!=''&& boxes[pattern[1]].innerText!=''&& boxes[pattern[0]].innerText!=''){
            if(boxes[pattern[0]].innerText==boxes[pattern[1]].innerText && boxes[pattern[1]].innerText==boxes[pattern[2]].innerText){
                winText.innerText=`${i} Player Won `;
                allBtnDisable();
                document.getElementById('wintext').style.fontSize="3rem";
            }
            else{
                checkDraw();
                f=0;
            }
        }
    }
}

boxes.forEach(
    (box)=>{
        box.addEventListener("click",()=>{
            if(ply1){
                box.innerText="X";
                ply1=false;
                winText.innerText="Second Player's Turn";
                checkWinner("First");
            }
            else{
                box.innerText="O";
                ply1=true;
                winText.innerText="First Player's Turn";
                checkWinner("Second");
            }
            box.disabled=true;
        })
    }
)
reset.addEventListener("click",()=>{
    winText.innerText="Start";
    document.getElementById('wintext').style.fontSize="1.5rem";
    allBtnEnable();
})