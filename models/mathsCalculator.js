import HttpContext from '../httpContext.js';
import Model from './model.js';


function factorielx(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function ispremier(value) {
    if(parseFloat(value) != parseInt(value)){
        return false;
    }
    for (var i = 2; i < value; i++) {
        if (value % i == 0) {
            return false;
        }
    }
    return value > 1;
}

function premierde(n) {
    let primeNumer = 0;
    for (let i = 0; i < n; i++) {
        primeNumer++;
        while (!ispremier(primeNumer)) {
            primeNumer++;
        }
    }
    return primeNumer;
}
export default class mathsCalculator{// extends Model {
    constructor(HttpContext){//x,y,op){
        //this.x = x;
        //this.y = y;
        //this.op = op;

        let p = HttpContext.path;
        this.x = p.params["x"];
        this.y = p.params["y"];
        this.n = p.params["n"];
        this.op = p.params["op"];
    }
    
    resultat(){
        let xthis = this;
        let checkNan = function(strparam){
            if(strparam in xthis){  
            } else{return false;}
            if(isNaN(parseFloat(xthis[strparam]))){
             return true;
            } else{
             return false;
            }
         }
         let NanError = function(param){
            xthis.error = "'"+param+"' parameter is not a number";
            xthis.code = 422;
         }
        //let checkNan = checkNan;//this.checkNan;
       // let NanError = //this.NanError;
        let r;
        switch (this.op) {
            case ' ' || "+":
                if(checkNan("x")){ NanError("x");return false;}
                if(checkNan("y")){ NanError("y");return false;}
                r = parseFloat(this.x) + parseFloat(this.y);
                break;
            case '-':
                if(checkNan("x")){ NanError("x");return false;}
                if(checkNan("y")){ NanError("y");return false;}
                r = parseFloat(this.x) - parseFloat(this.y);
                break;
            case '*':
                if(checkNan("x")){ NanError("x");return false;}
                if(checkNan("y")){ NanError("y");return false;}
                r = parseFloat(this.x) * parseFloat(this.y);
                break;
            case '/':
                if(checkNan("x")){ NanError("x");return false;}
                if(checkNan("y")){ NanError("y");return false;}
                r = parseFloat(this.x) / parseFloat(this.y);
                if(parseFloat(this.x) == 0 && parseFloat(this.y) == 0){r= "NaN";}
                else if(r == 0 || parseFloat(this.y) == 0){r = "Infinity";}
                break;
            case '%':
                if(checkNan("x")){ NanError("x");return false;}
                if(checkNan("y")){ NanError("y");return false;}
                r = parseFloat(this.x) % parseFloat(this.y);
                break;
            case '!':
                if(checkNan("n")){ NanError("n");return false;}
                if(parseFloat(this.n) <= 0 || parseFloat(this.n) !=  parseInt(this.n)){
                    this.error = "n parameter must be an integer > 0";
                    return false;
                }
                r = factorielx(parseFloat(this.n));
                break;
            case 'p':
                if(checkNan("n")){ NanError("n");return false;}
                if(this.n < 1 || parseInt(this.n) != parseFloat(this.n)){
                    this.error = "n parameter must be an integer > 0";
                    return false;
                }
                r = ispremier(parseFloat(this.n));
                break;
            case 'np':
                if(checkNan("n")){ NanError("n");return false;}
                r = premierde(parseFloat(this.n));
                break;
            default:
                //this.HttpContext.response.badRequest("Invalid operation");
                this.error = "Unkown operator";
                return false;
        }
        this.value = r;
        console.log(this.value);
        if((this.op  == "%" || this.op == "/") && isNaN(this.value)){
            this.value = "NaN";
           // this.value = undefined;
            return this.value;
        }
       // if(this.op == "p"){
           // console.log(r);
       // }
        return r;
    }
}