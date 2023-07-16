// 棋子: 兵(1) 炮(2) 车(3) 马(4) 象(5) 士(6) 将(7) 敌对棋子为负值
class Qi{
    constructor(x,y){
         this.x = x;
         this.y = y;
         this.value = 0;
    }
    
    //移动棋子
    setXY(x1,y1,x2,y2,q,b){
         if(b){
            q[x2][y2] =  q[x1][y1];
            q[x1][y1] = 0;
         }else{
            console.log("无效操作")
         }
         //console.log(q)
         return q;
         
    }
    
    getXY(){
        console.log(this.x+"\0"+this.y);
    }
}
// 初始棋盘
const Q = [[3,4,5,6,7,6,5,4,3],//[0][]
          [0,0,0,0,0,0,0,0,0],//[1][]
          [0,2,0,0,0,0,0,2,0],//[2][]
          [1,0,1,0,1,0,1,0,1],//[3][]
          [0,0,0,0,0,0,0,0,0],//[4][]
          //楚河汉界
          [0,0,0,0,0,0,0,0,0],//[5][]
          [-1,0,-1,0,-1,0,-1,0,-1],//[6][]
          [0,-2,0,0,0,0,0,-2,0],//[7][]
          [0,0,0,0,0,0,0,0,0],//[8][]
          [-3,-4,-5,-6,-7,-6,-5,-4,-3],];//[9][]


        
// 兵(1): 未过河，只能前进一格，过河，可以前进和左右移动一格
class QB extends Qi{
    constructor(x,y,value){
        super(x,y);
        this.value = value;//-1,1
    }
    action(x1,y1,x2,y2,q){
        if(x1 === x2 && y1 === y2){//未移动
            return false;
        }
        //判定是否过河
        if(this.value > 0){//棋子类型
            if(x1<=5){//未过河

                if(x2-x1 === 1 && y1 === y2){//前进一格
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                    
                }else return false;

            }else{//过河

                if(x2-x1 === 1 && y1 === y2){//前进一格
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else if(x2 === x1 && (y2-y1)*(y2-y1) === 1){//左右移动一格
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;

            }
        }else if(this.value < 0){//棋子类型
            if(x1>=5){//未过河

                if(x2-x1 === -1 && y1 === y2){//前进一格
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;

            }else{//过河

                if(x2-x1 === -1 && y1 === y2){//前进一格
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else if(x2 === x1 && (y2-y1)*(y2-y1) === 1){//左右移动一格
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;

            }
        }
       
    }
}

//炮(2)：横纵移动，隔子吃子
class QP extends Qi{
    constructor(x,y,value){
        super(x,y);
        this.value = value;
       
    }
    action(x1,y1,x2,y2,q){ 
        let mid = 0;
        if(x1 === x2 && y1 === y2){//未移动
            return false;
        }
        if(x1 === x2){//横向移动
            if(y2>y1){
                 for(let i = y1+1;i<y2;i++){
                   if(q[x1][i] !== 0){
                      mid++;
                   }
                 } 
                if(mid !== 0){//中间有子
                      if(mid === 1){ //中间有1子
                        if(q[x2][y2]*q[x1][y1]< 0){//吃子
                            return true;
                        }else return false;//友方棋子
                      }else return false;//中间多子
                }else if(mid === 0){//中间无子
                    if(q[x2][y2] === 0){//终点无子
                         return true;
                    }else return false;//终点有子
                      
                }
            }
            if(y2<y1){
                for(let i = y2+1;i<y1;i++){
                    if(q[x1][i] !== 0){
                       mid++;
                    }
                  } 
                  if(mid !== 0){//中间有子
                    if(mid === 1){ //中间有1子
                      if(q[x2][y2]*q[x1][y1]< 0){//吃子
                          return true;
                      }else return false;//友方棋子
                    }else return false;//中间多子
                 }else if(mid === 0){//中间无子
                    if(q[x2][y2] === 0){//终点无子
                         return true;
                    }else if(mid === 0){//中间无子
                        if(q[x2][y2] === 0){//终点无子
                             return true;
                        }else return false;//终点有子
                          
                    }
                      
                }
            }
            
            
        }
        if(y1 === y2){//纵向移动
            if(x2>x1){
                 for(let i = x1+1;i<x2;i++){
                   if(q[i][y1] !== 0){
                      mid++;
                   }
                 } 
                if(mid !== 0){//中间有子
                      if(mid === 1){ //中间有1子
                        if(q[x2][y2]*q[x1][y1]< 0){//吃子
                            return true;
                        }else return false;//友方棋子
                      }else return false;//中间多子
                }else if(mid === 0){//中间无子
                    if(q[x2][y2] === 0){//终点无子
                         return true;
                    }else return false;//终点有子
                      
                }
            }
            if(x2<x1){
                for(let i = x2+1;i<x1;i++){
                    if(q[i][y1] !== 0){
                       mid++;
                    }
                  } 
                  if(mid !== 0){//中间有子
                    if(mid === 1){ //中间有1子
                      if(q[x2][y2]*q[x1][y1]< 0){//吃子
                          return true;
                      }else return false;//友方棋子
                    }else return false;//中间多子
                 }else if(mid === 0){//中间无子
                    if(q[x2][y2] === 0){//终点无子
                         return true;
                    }else return false;//终点有子
                      
                }
            }
            
            
        }
    }
}

//车(3)：横纵移动吃子
class QC extends Qi{
    constructor(x,y,value){
        super(x,y);
        this.value = value;
       
    }

    action(x1,y1,x2,y2,q){
        let mid = 0;
        if(x1 === x2 && y1 === y2){//未移动
            return false;
        }
        if(x1 === x2){//横向移动
            if(y2>y1){
                for(let i = y1+1;i<y2;i++){
                    if(q[x1][i] !== 0){
                       mid++;
                    }
                }
                if(mid === 0){//中间无子
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;//中间有子
            }
            if(y2<y1){
                for(let i = y2+1;i<y1;i++){
                    if(q[x1][i] !== 0){
                       mid++;
                    }
                }
                if(mid === 0){//中间无子
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;//中间有子
            }
        }
        if(y1 === y2){//纵向移动
            if(x2>x1){
                for(let i = x1+1;i<x2;i++){
                    if(q[i][y1] !== 0){
                       mid++;
                    }
                }
                if(mid === 0){//中间无子
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;//中间有子
            }
            if(x2<x1){
                for(let i = x2+1;i<x1;i++){
                    if(q[i][y1] !== 0){
                       mid++;
                    }
                }
                if(mid === 0){//中间无子
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;//中间有子
            }
        }
    }
}

//马(4)：‘日’字移动吃子，马腿判定移动
class QM extends Qi{
    constructor(x,y,value){
        super(x,y);
        this.value = value;
       
    }
    action(x1,y1,x2,y2,q){
        let mid = 0;
        if(x1 === x2 && y1 === y2){//未移动
            return false;
        }
        if((x2-x1)*(y2-y1)*(x2-x1)*(y2-y1) === 4){//走日
            if(y2-y1 === -2){//判定走日的方向
                if( q[x1][y1-1] !== 0) {
                    mid++;//马腿判定
                }
            }else if(y2-y1 === 2){//判定走日的方向
                if( q[x1][y1+1] !== 0) {
                    mid++;//马腿判定
                }
            }else if(x2-x1 === -2){//判定走日的方向
                if( q[x1-1][y1] !== 0) {
                    mid++;//马腿判定
                }
            }else if(x2-x1 === 2){//判定走日的方向
                if( q[x1+1][y1] !== 0) {
                    mid++;//马腿判定
                }
            }
            if(mid === 0){
                if(q[x2][y2]*q[x1][y1] > 0){
                    return false;//友方棋子
                }else return true//对方棋子或无子
            }else return false;
        }else return false;
    }
    
}

//象(5)：‘田’字移动吃子，不可过河 ，象腿判定移动
class QX extends Qi{
    constructor(x,y,value){
        super(x,y);
        this.value = value;
       
    }
    action(x1,y1,x2,y2,q){
        let mid = 0;
        if(x1 === x2 && y1 === y2){//未移动
            return false;
        }
        if(this.value > 0){
            if(x1<5){//未过河
                if((y2-y1)*(y2-y1) === 4 && (x2-x1)*(x2-x1) === 4){//走田
                    //判定象腿
                    if(y2-y1 === 2){
                        if(x2-x1 === 2){
                            if(q[x1+1][y1+1] !== 0){
                            mid++;
                            }
                        }else if(x2-x1 === -2){
                            if(q[x1-1][y1+1] !== 0){
                                mid++;
                            }
                        }
                    }else if(y2-y1 === -2){
                        if(x2-x1 === 2){
                            if(q[x1+1][y1-1] !== 0){
                                mid++;
                                }
                        }else if(x2-x1 === -2){
                            if(q[x1-1][y1-1] !== 0){
                                mid++;
                                }
                        }
                    }
                    if(mid === 0){
                        if(q[x2][y2]*q[x1][y1] > 0){
                            return false;//友方棋子
                        }else return true//对方棋子或无子
                    }else return false;
                }
            }else return false;
        }else {
            if(x1>=5){//未过河
                if((y2-y1)*(y2-y1) === 4 && (x2-x1)*(x2-x1) === 4){//走田
                    //判定象腿
                    if(y2-y1 === 2){
                        if(x2-x1 === 2){
                            if(q[x1+1][y1+1] !== 0){
                            mid++;
                            }
                        }else if(x2-x1 === -2){
                            if(q[x1-1][y1+1] !== 0){
                                mid++;
                            }
                        }
                    }else if(y2-y1 === -2){
                        if(x2-x1 === 2){
                            if(q[x1+1][y1-1] !== 0){
                                mid++;
                                }
                        }else if(x2-x1 === -2){
                            if(q[x1-1][y1-1] !== 0){
                                mid++;
                                }
                        }
                    }
                    if(mid === 0){
                        if(q[x2][y2]*q[x1][y1] > 0){
                            return false;//友方棋子
                        }else return true//对方棋子或无子
                    }else return false;
                }
            }else return false;
        }
    }
}

//士(6)：斜向移动吃子，不可出9宫格
class QS extends Qi{
    constructor(x,y,value){
        super(x,y);
        this.value = value;
       
    }
    action(x1,y1,x2,y2,q){
        if(x1 === x2 && y1 === y2){//未移动
            return false;
        }
        if(this.value > 0){
            if(x2 < 3 && y2 >= 3 && y2 <= 5){//9宫格
                if((x2-x1)*(x2-x1) === 1 && (y2-y1)*(y2-y1) === 1){//斜向
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;
            }else return false;
        }
        if(this.value < 0){
            if(x2 >= 7 && x2 <= 9 && y2 >= 3 && y2 <= 5){//9宫格
                if((x2-x1)*(x2-x1) === 1 && (y2-y1)*(y2-y1) === 1){//斜向
                    if(q[x2][y2]*q[x1][y1] > 0){
                        return false;//友方棋子
                    }else return true//对方棋子或无子
                }else return false;
            }else return false;
        }
       
    }
}

//将(7)：横纵一格移动吃子，不可出9宫格
class QJ extends Qi{
    constructor(x,y,value){
        super(x,y);
        this.value = value;
       
    }
    action(x1,y1,x2,y2,q){
        if(x1 === x2 && y1 === y2){//未移动
            return false;
        }
        if(this.value > 0){
            if(x2 < 3 && y2 >= 3 && y2 <= 5){//9宫格
                if(x1 === x2){//横向移动
                    if((y2-y1)*(y2-y1) === 1){
                        if(q[x2][y2]*q[x1][y1] > 0){
                            return false;//友方棋子
                        }else return true//对方棋子或无子
                    }else return false;
                }else if(y2 === y1){//纵向移动
                    if((x2-x1)*(x2-x1) === 1){
                        if(q[x2][y2]*q[x1][y1] > 0){
                            return false;//友方棋子
                        }else return true//对方棋子或无子
                    }else return false;
                }else return false;
            }else return false;
        }
        if(this.value < 0){
            if(x2 >= 7 && x2 <= 9 && y2 >= 3 && y2 <= 5){//9宫格
                if(x1 === x2){//横向移动
                    if((y2-y1)*(y2-y1) === 1){
                        if(q[x2][y2]*q[x1][y1] > 0){
                            return false;//友方棋子
                        }else return true//对方棋子或无子
                    }else return false;
                }else if(y2 === y1){//纵向移动
                    if((x2-x1)*(x2-x1) === 1){
                        if(q[x2][y2]*q[x1][y1] > 0){
                            return false;//友方棋子
                        }else return true//对方棋子或无子
                    }else return false;
                }else return false;
            }else return false;
        }

    }
}


 //初始化界面
var q = Q;
var QList = [];//棋子元素列表
var click = 0;//0表示没有选中棋子，1表示选中了其他棋子
var clickQ ;//选中的棋子
var container = document.getElementById("grid-container");
 for(let i = 0 ;i<q.length;i++){
     var row = document.createElement("div");
     row.className = "grid-row";
     container.appendChild(row);
     var Qrow = [];
     QList.push(Qrow);
     for(let j = 0;j<q[i].length;j++){
        var qi = document.createElement("div");
        qi.className = "qi";
        row.appendChild(qi);
        Qrow.push(qi);
        //绑定事件
        qi.addEventListener("click",function(){
                //无子
                if(q[i][j] === 0){                  
                        if(click === 1){
                             var newQ = new Qi(i,j,q[i][j]);
                             //console.log(newQ);
                            q = clickQ.setXY(clickQ.x,clickQ.y,newQ.x,newQ.y,q,clickQ.action(clickQ.x,clickQ.y,newQ.x,newQ.y,q));
                            click = 0;
                            update(q);
                            
                        }  else{}                                    
                }
                //兵
                if(q[i][j] === 1 || q[i][j] === -1){
                   
                      
                        if(click === 1){
                            var newQ = new QB(i,j,q[i][j]);
                            //console.log(newQ);
                           q = clickQ.setXY(clickQ.x,clickQ.y,newQ.x,newQ.y,q,clickQ.action(clickQ.x,clickQ.y,newQ.x,newQ.y,q));
                           click = 0;
                           update(q)
                           
                        } else if(click == 0){
                            newQ = new QB(i,j,q[i][j]);
                            clickQ = newQ;
                            click = 1;
                            update(q)
                        }
                        
                  
                }
                //炮
                if(q[i][j] === 2 || q[i][j] === -2){
                 
                   
                        //console.log(newQ);
                        if(click === 1){
                            var newQ = new QP(i,j,q[i][j]);
                            //console.log(newQ);
                           q = clickQ.setXY(clickQ.x,clickQ.y,newQ.x,newQ.y,q,clickQ.action(clickQ.x,clickQ.y,newQ.x,newQ.y,q));
                           click = 0;
                           
                           update(q)
                           
                        } else if(click === 0){
                            newQ = new QP(i,j,q[i][j]);
                            clickQ = newQ;
                            click = 1;
                            update(q)
                        }
                  
                }
                //车 
                if(q[i][j] === 3 || q[i][j] === -3){
                   
                  
                        if(click === 1){
                            var newQ = new QC(i,j,q[i][j]);
                            //console.log(newQ);
                           q = clickQ.setXY(clickQ.x,clickQ.y,newQ.x,newQ.y,q,clickQ.action(clickQ.x,clickQ.y,newQ.x,newQ.y,q));
                           click = 0;
                           update(q)
                           
                        } else if(click === 0){
                            newQ = new QC(i,j,q[i][j]);
                            clickQ = newQ;
                            click = 1;
                            update(q)
                        }
                        
                   
                }
                //马
                if(q[i][j] === 4 || q[i][j] === -4){
                   
                   
                        if(click === 1){
                            var newQ = new QM(i,j,q[i][j]);
                            //console.log(newQ);
                           q = clickQ.setXY(clickQ.x,clickQ.y,newQ.x,newQ.y,q,clickQ.action(clickQ.x,clickQ.y,newQ.x,newQ.y,q));
                           click = 0;
                          
                           update(q)
                           
                        } else if(click === 0){
                            newQ = new QM(i,j,q[i][j]);
                            clickQ = newQ;
                            click = 1;
                            update(q)
                        }
                  
                }
                //象 
                if(q[i][j] === 5 || q[i][j] === -5){
                   
                   
                        if(click === 1){
                            var newQ = new QX(i,j,q[i][j]);
                            //console.log(newQ);
                           q = clickQ.setXY(clickQ.x,clickQ.y,newQ.x,newQ.y,q,clickQ.action(clickQ.x,clickQ.y,newQ.x,newQ.y,q));
                           click = 0;
                          
                           update(q)
                        } else if(click === 0){
                            newQ = new QX(i,j,q[i][j]);
                            clickQ = newQ;
                            click = 1;
                            update(q)
                        }
                  
                }
                //士 
                if(q[i][j] === 6 || q[i][j] === -6){
                    
                  
                        if(click === 1){
                            var newQ = new QS(i,j,q[i][j]);
                            //console.log(newQ);
                            q = clickQ.setXY(clickQ.x,clickQ.y,newQ.x,newQ.y,q,clickQ.action(clickQ.x,clickQ.y,newQ.x,newQ.y,q));
                           click = 0;
                           
                           update(q)
                        } else if(click === 0){
                            newQ = new QS(i,j,q[i][j]);
                            clickQ = newQ;
                            click = 1;
                            update(q)
                        }
                   
                }
                //将
                if(q[i][j] === 7 || q[i][j] === -7){
                   
                   
                        if(click === 1){
                            var newQ = new QJ(i,j,q[i][j]);
                            //console.log(newQ);
                            q = clickQ.setXY(clickQ.x,clickQ.y,newQ.x,newQ.y,q,clickQ.action(clickQ.x,clickQ.y,newQ.x,newQ.y,q));
                           click = 0;
                           update(q)
                        } else if(click === 0){
                            newQ = new QJ(i,j,q[i][j]);
                            clickQ = newQ;
                            click = 1;
                            update(q)
                        }
                   
                }
                
            
        })
     }
 }
// console.log(QList)

 //更新界面
 function update(q){
    console.log(clickQ);
    for(let i = 0;i<10;i++){
        for(let j = 0;j<9;j++){
            if(q[i][j] === 0){
                QList[i][j].innerText = "";
                QList[i][j].style.border = "2px solid rgb(159, 159, 159)";

            }
            //兵
            if(q[i][j] === 1 || q[i][j] === -1){
                QList[i][j].innerText = "兵";
                QList[i][j].style.border = "2px solid rgb(159, 159, 159)";
            }
            //炮
            if(q[i][j] === 2 || q[i][j] === -2){
                QList[i][j].innerText = "炮"
                QList[i][j].style.border = "2px solid rgb(159, 159, 159)";
            }
            //车 
            if(q[i][j] === 3 || q[i][j] === -3){
                QList[i][j].innerText = "车"
                QList[i][j].style.border = "2px solid rgb(159, 159, 159)";
            }
            //马
            if(q[i][j] === 4 || q[i][j] === -4){
                QList[i][j].innerText = "马"
                QList[i][j].style.border = "2px solid rgb(159, 159, 159)";
            }
            //象 
            if(q[i][j] === 5 || q[i][j] === -5){
                QList[i][j].innerText = "象"
                QList[i][j].style.border = "2px solid rgb(159, 159, 159)";
            }
            //士 
            if(q[i][j] === 6 || q[i][j] === -6){
                QList[i][j].innerText = "士"
                QList[i][j].style.border = "2px solid rgb(159, 159, 159)";
            }
            //将
            if(q[i][j] === 7 || q[i][j] === -7){
                QList[i][j].innerText = "将"
                QList[i][j].style.border = "2px solid rgb(159, 159, 159)";
            }
            if(q[i][j] < 0){
                QList[i][j].style.color = "red"  
            }else {
                QList[i][j].style.color = "black" 
            }

            if(clickQ !== undefined){
                if(i === clickQ.x && j === clickQ.y){
                    QList[i][j].style.border = "2px solid ";

            }
            }
            
        }
    }
}

update(q)


  
 

