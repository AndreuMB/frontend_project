import  'mocha/mocha.css';
import mocha from "mocha/mocha-es2018";
import chai from  'chai';

// import {fibonacci} from './main.js';

var expect = chai.expect;

mocha.setup('bdd');
mocha.cleanReferencesAfterRun(false);

function test(){
    describe('Array', function() {
        describe('fibonacci function', function() {
            it('should return 0', () => {
                expect(fibonacci(0)).to.eql([0]);
                
            });
            it('should return 0, 1', () => {
                expect(fibonacci(1)).to.eql([0, 1]);
            });
            it('should return 0, 1, 1', () => {
                expect(fibonacci(2)).to.eql([0, 1, 1]);
            });
            it('should return 0, 1, 1, 2', () => {
                expect(fibonacci(3)).to.eql([0, 1, 1, 2]);
            });
            it('should return 0, 1, 1, 2, 3', () => {
                expect(fibonacci(4)).to.eql([0, 1, 1, 2, 3]);
            });
            it('should return 0, 1, 1, 2, 3, 5', () => {
                expect(fibonacci(5)).to.eql([0, 1, 1, 2, 3, 5]);
            });
            it('should return 0, 1, 1, 2, 3, 5, 8', () => {
                expect(fibonacci(6)).to.eql([0, 1, 1, 2, 3, 5, 8]);
            });
            it('should return 0, 1, 1, 2, 3, 5, 8, 13', () => {
                expect(fibonacci(7)).to.eql([0, 1, 1, 2, 3, 5, 8, 13]);
            });
        });
    });
    
    mocha.run();
}

function fibonacci(n){
    var fibo = [0,1];
  
    if (n==0) {
      fibo=[0];
    }
  
    for(let i=2; i <= n; i++){
      fibo.push(fibo[i-1] + fibo[i-2]);
      // document.write(fibo[i]+"<br/>");	
    }
    return fibo;
  }
  
export function print_test() {
    document.querySelector('#container').innerHTML=`<h1>Tests</h1>
    <div id="fibonacci"></div>
    <div id="mocha"></div>`;
  
    test();
    let succesion = fibonacci(100);
    document.querySelector('#fibonacci').innerHTML = succesion;
  }