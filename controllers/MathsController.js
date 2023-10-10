import CourseModel from '../models/course.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';
import mathsCalculator from '../models/mathsCalculator.js';
import HttpContext from '../httpContext.js';
import fs from "fs";
import path from "path";

export default class MathsController extends Controller {
    
    constructor(xHttpContext) {
        super(xHttpContext)//, new Repository(new CourseModel()));

        this.HttpContext = xHttpContext;
        if(xHttpContext.path.params == null || Object.keys(xHttpContext.path.params).length == 0){
            this.reponduEnHTML = true;
            let pageAide = path.join(process.cwd(), wwwroot, '/mathsHelp.html');
            this.HttpContext.response.HTML(fs.readFileSync(pageAide));
            return;
        }
        this.setup(xHttpContext);
    }
    setup(xHttpContext){
        this.HttpContext = xHttpContext;
        let m = new mathsCalculator(xHttpContext);
        console.log(m);
        this.mc = m;
    }
    get(){
        if(this.reponduEnHTML){return;}
        let m = this.mc;
        let tab = {};
        tab.x = m.x;
        tab.y = m.y;
        tab.n = m.n;
        tab.z = m.z;
        tab.op = m.op;
        if(m.op == " "){
            tab.op = "+";
        }
        m.resultat(); //faire le resultat
        if(m.error == undefined){
            tab.value = m.resultat();
        } else{
            tab.error = m.error;
        }
        this.HttpContext.response.JSON(tab,m.code);
    }
}
